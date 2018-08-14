import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AccountsService} from '../../../../services/accounts/accounts.service';
import {CreateuserService} from '../../account/services/accountuser/createuser.service';
import {SiteService} from '../../site/service/site.service';
import {AssetsService} from '../../assets/services/assets.service';
import {BranchService} from '../../branch/services/branch.service';
import {AssignbranchService} from '../../branch/services/assignbranch.service';
import {BranchuserService} from '../../branch/services/branchuser/branchuser.service';
import {AsrmService} from '../../account/accservicerequest/services/asrm.service';
import {TicketService} from '../service/ticket.service';
import {RemoveTicketDetailsService} from '../service/remove-ticket-details.service';
import {GlobalVariable} from '../../../../global/global';
import {EditTicketService} from '../service/edit-ticket.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TicketcontactService} from '../service/ticketcontact.service';
import {TripService} from '../trip/service/trip/trip.service';

declare const $;
declare const swal;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  /*Ticket*/
  AccountRefNumber: any = '';
  TicketID: any = '';
  ProblemDescription: any = '';
  ProblemDescriptionMod: any = '';
  OtherEmailRecipient: any = '';
  /* Account */
  AllAccountsArray: any = [];
  SelectedAccountArray: any = [];
  ScltAccID: any = '';
  /* Account Contacts */
  AllAccountContactsArray: any = [];
  SelectedAccountContactArray: any = [];
  AccUserCategoryArray: any = [];
  /*Sites*/
  SiteArray: any = [];
  ScltSiteID: any = '';
  SelectedSiteArray: any = [];
  SiteContactArray: any = [];
  SelectedSiteContactArray: any = [];
  /*Assets*/
  AllAssetsArray: any = [];
  SelectedAssetArray: any = [];
  ScltAssetID: any = '';
  /*Model*/
  ScltModelID: any = '';
  /*Branch*/
  AllBranchesArray: any = [];
  SelectedBranchArray: any = [];
  ScltBranchID: any = '';
  /*BranchUsers*/
  AllBranchContactArray: any = [];
  AllTechContactArray: any = [];
  SelectedBranchContactArray: any = [];
  /*ServiceRequests*/
  AllServiceRequestArray: any = [];
  SelectedServicerequestAarray: any = [];
  ScltServiceRequestID: any = '';
  AMSRD_ID: any = '';
  /*Agreement*/
  AgreementArray: any = [];
  SelectedAgreementArray: any = [];
  ScltAgreementID: any = '';
  /*parts*/
  Ticket_Req_PartsArray: any[];
  SelectedPartsArray: any = [];
  Ticket_Required_Parts: any = [];
  /*Branch Recipient Array */
  SelectedBranchRecipientArray: any = [];
  /*Edit Table*/
  editRowId: any;
  HeroKiteditRowId: any;
  userID: any = '';
  Ticket_Details_Array: any = [];
  SR_Details_Array: any = [];
  userRoleId: any;
  /* Datatable Satus */
  FileBasePath: any = '';
  /*Loader*/
  AccountLoaderStatus: boolean = false;
  BranchLoaderStatus: boolean = false;
  SiteLoaderStatus: boolean = false;
  AccountContactLoaderStatus: boolean = false;
  SiteContactLoaderStatus: boolean = false;
  BranchContactLoaderStatus: boolean = false;
  AssetLoaderStatus: boolean = false;
  ServiceLoaderStatus: boolean = false;
  TicketSubmitStatus: boolean = false;
  HeroKitPartAvailable: boolean = false;
  NonHeroKitPartAavailable: boolean = false;
  NewPartAvailable: boolean = false;
    BranchModelClicked: boolean = false;
  /*TicketValidation*/
  TicketErrors: any = [];
  EmailStatusList: any = [];
  SiteContactCategoryList: any = [];
  AccConForm: FormGroup;
  AccTicketEmailStatus: any = 'A';
  SiteTicketEmailStatus: any = 'A';
    SiteConForm: FormGroup;
  @ViewChild('AccUserImg') AccUserImage;
  AccUserImageFile: File;
  @ViewChild('SiteUserImg') SiteUserImage;
  SiteUserImageFile: File;
  /*Known issue*/
  KICountChange: number = 0;
  /*Troubleshooting List*/
  SolCountChange: number = 0;
    loaduniqueemail: any = '';
    loaduniqueemaillen: any = '';
    tripID: any;
    ttdID: any;
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    FileBaseUrl: any = '';
    constructor(private accService: AccountsService, private accuserService: CreateuserService, private siteService: SiteService, private assetService: AssetsService, private branchService: BranchService, private assignbranchService: AssignbranchService, private branchUserService: BranchuserService, private aSRM_Service: AsrmService, private ticketService: TicketService, public router: Router, private removeTicketDetails: RemoveTicketDetailsService, private edtService: EditTicketService, private fb: FormBuilder, private ticketContact: TicketcontactService, private tripService: TripService) {
        this.userID = localStorage.getItem('umid');
        this.userRoleId = localStorage.getItem('ucmid');
        const emailRegex = '/^\\b[A-Z0-9._%-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}\\b$/i';
        const altemailRegex = '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*([,]\\s*\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)*';
        const mobiepattern = '^([(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4})$';
        this.AccConForm = this.fb.group({
            /*'AltEmail' : [ '', Validators.pattern('\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*([,]\s*\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*')],*/
            'Category': ['', Validators.required],
            'FirstName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])],
            'LastName': ['', Validators.compose([Validators.minLength(3), Validators.maxLength(1500)])],
            'Email': ['', Validators.compose([Validators.required, Validators.email])],
            'AltEmail': ['', [<any>Validators.pattern(altemailRegex)]],
            'Mobile': ['', Validators.compose([Validators.required, Validators.pattern(mobiepattern), Validators.minLength(14)])],
            'Image': [null]
        });
        this.SiteConForm = this.fb.group({
            'Category': ['', Validators.required],
            'FirstName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])],
            'LastName': ['', Validators.compose([Validators.minLength(3), Validators.maxLength(1500)])],
            'Email': ['', Validators.compose([Validators.required, Validators.email])],
            'AltEmail': ['', [<any>Validators.pattern(altemailRegex)]],
            'Mobile': ['', Validators.compose([Validators.required, Validators.pattern(mobiepattern), Validators.minLength(14)])],
            'Image': [null]
        });
  }

  ngOnInit() {
      if (localStorage.getItem('umid') === null) {
          this.router.navigate(['login']);
      }

    $(function () {
      $('#All_Account_List').DataTable();
      $('#Acc_User_Table').DataTable();
      $('#All_Site_List').DataTable();
      $('#Site_Asset_Table').DataTable();
      $('#All_Branch_Table').DataTable();
      $('#Branch_User_Table').DataTable();
      $('#Service_Request_Table').DataTable();
      $('#All_Agreement_List').DataTable();
      $('#Site_User_Table').DataTable();
      $('#Technician_User_Table').DataTable();
        const drEvent = $('.dropify').dropify();
// called when you click on the "remove" button
        drEvent.on('dropify.beforeClear', function (event, element) {
            // do something
        });
// called after the Dropify is clear
        drEvent.on('dropify.afterClear', function (event, element) {
            // do something
        });
    });
    this.FileBasePath = GlobalVariable.BASE_FILE_API;
  }

    /* Check known issues is empty or not */
    KICountChangeEmit(event) {
        this.KICountChange = event;
    }

    /* Check solution issues is empty or not */
    SolCountChangeEmit(event) {
        this.SolCountChange = event;
    }

  /*Account*/
    public ShowAccountModel() {
    this.LoadAccounts();
    $(function () {
      $('#accountModel').modal();
    });
  }

    checkunique(email, id) {
        this.accuserService.checkunique(email.target.value, id).subscribe(
            data => {
                this.loaduniqueemail = data;
                this.loaduniqueemaillen = this.loaduniqueemail.length;
                if (this.loaduniqueemail.length !== 0) {
                    $('#existmail').show();
                    $('#existmailedit').show();
                    return false;
                } else {
                    $('#existmail').hide();
                    $('#existmailedit').hide();
                    return true;
                }
            }
        );
    }

    public LoadAccounts() {
    const that = this;
    $(function () {
      $('#All_Account_List').dataTable().fnDestroy();
    });
    const formData = new FormData();
    formData.append('userID', this.userID);
    this.accService.LoadAccounts_byUsers(formData).subscribe(
        data => {
            const length = this.AllAccountsArray.length;
            if (length === 0) {
                this.AllAccountsArray = data;
            }
            setTimeout(function () {
                $('#All_Account_List').DataTable(
                    {
                        paging: true,
                        searching: true,
                        order: [[0, 'asc']]
                    }
                );
            }, 1000);
        }
    );
  }

    public assignAccount(accID, accName, accCity) {
    const Acc_Array_Length = this.SelectedAccountArray.length;
    if (Acc_Array_Length === 1) {
      $('#accountModel').modal('hide');
    } else {
      this.AccountLoaderStatus = true;
      this.ScltAccID = accID;
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        formData.append('accID', this.ScltAccID);
      if (this.TicketID !== '') {
          this.ticketService.UpdateAccount(formData).subscribe(
              data => {
                  this.SelectedAccountArray.push({'Acc_ID': accID, 'Acc_Name': accName, 'Acc_City': accCity});
                  this.AccountLoaderStatus = false;
              }
          );
      } else {
          this.SelectedAccountArray.push({'Acc_ID': accID, 'Acc_Name': accName, 'Acc_City': accCity});
          this.AccountLoaderStatus = false;
      }
      $(function () {
        $('#accountModel').modal('hide');
      });
    }
  }

    public RemoveAccount() {
      if (this.TicketID !== '') {
          this.Remove_TIC_Account(this.TicketID);
          this.Remove_TIC_Site(this.TicketID);
          this.Remove_TIC_Branch(this.TicketID);
          this.Remove_TIC_Asset(this.TicketID);
          this.Remove_TIC_Service_Request(this.TicketID);
          this.Remove_TIC_Agreement(this.TicketID);
          this.Remove_TIC_Account_Contact_ALL(this.TicketID);
          this.Remove_TIC_Site_Contact_All(this.TicketID);
          this.Remove_TIC_Branch_Contact_All(this.TicketID);
          this.Remove_TIC_Problem_Description(this.TicketID);
          this.Remove_TIC_Parts_All(this.TicketID);
          this.Remove_TIC_Other_Recipient(this.TicketID);
          this.Remove_TIC_Branch_Recipient_All(this.TicketID);
    } else {
          this.SelectedAccountArray = [];
          this.ScltAccID = '';
    }
  }

    public UpdateAccRefNumber() {
        if (this.TicketID !== '') {
      const formData = new FormData();
      formData.append('ticketID', this.TicketID);
      formData.append('accRefNum', this.AccountRefNumber);
      this.ticketService.UpdateAccountRefNumber(formData).subscribe();
    }
  }

  /*Account Contact*/
    public ShowAccountContactModel() {
      this.LoadTicketAccountContacts();
      $(function () {
          $('#SelectaccountContactModel').modal();
          $('#existmail').hide();
          $('#existmailedit').hide();
      });
  }

    public CreateNewAccContactModal() {
        this.EmailStatusList = [];
        this.AccConForm.reset();
        this.LoadAccUserCategory();
        $(function () {
            $('.dropify-clear').click();
            let drEvent = $('.dropify').dropify();
            drEvent = drEvent.data('dropify');
            drEvent.resetPreview();
            drEvent.clearElement();
            $('#SelectaccountContactModel').modal('hide');
            $('#accountContactModel').modal();
        });
  }

    public LoadAccountUsers(account_ID) {
    if (this.ScltAccID !== '') {
      const formData = new FormData();
      formData.append('accID', account_ID);
        formData.append('siteID', this.ScltSiteID);
      this.ticketContact.LoadAccountContacts(formData).subscribe(
        data => {
          data.forEach(user => {
            this.AssignAccountContact(user);
          });
        }
      );
    }
  }

    public LoadTicketAccountContacts() {
        $(function () {
            $('#All_Account_Contact_List').dataTable().fnDestroy();
        });
        const formData = new FormData();
        formData.append('accID', this.ScltAccID);
        formData.append('siteID', this.ScltSiteID);
        formData.append('ticketID', this.TicketID);
        this.ticketContact.LoadAccountTicketContacts(formData).subscribe(
            data => {
                this.AllAccountContactsArray = [];
                const length = this.AllAccountContactsArray.length;
                if (length === 0) {
                    this.AllAccountContactsArray = data;
                }
                setTimeout(function () {
                    $('#All_Account_Contact_List').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
  }

    public LoadAccUserCategory() {
        this.accuserService.LoadCategory().subscribe(
            data => {
                this.AccUserCategoryArray = data;
            }
        );
  }

    public LoadTicketEmailStatus(URM_ID, UCM_ID) {
        const formData = new FormData();
        formData.append('urmID', URM_ID);
        formData.append('ucmID', UCM_ID);
        formData.append('accountID', this.ScltAccID);
        this.ticketContact.Ticket_Email_Status(formData).subscribe(status => {
            this.EmailStatusList = status;
        });
  }

    public CreateAccContact(value) {
        this.AccountContactLoaderStatus = true;
        const Image = this.AccUserImage.nativeElement;
        if (Image.files && Image.files[0]) {
            this.AccUserImageFile = Image.files[0];
        }
        const ImageFile: File = this.AccUserImageFile;
        const formData = new FormData();
        formData.append('userArray', JSON.stringify(value));
        if (Image.files && Image.files[0]) {
            formData.append('userImage', ImageFile, ImageFile.name);
        }
        formData.append('ticketID', this.TicketID);
        formData.append('ticketEmailStatus', this.AccTicketEmailStatus);
        formData.append('ticketUser', 'Y');
        formData.append('accountID', this.ScltAccID);

        this.ticketContact.Create_Account_Contact(formData).subscribe(data => {
            if (data.result === 'success') {
                this.LoadAssignedAccContcts();
                $('#accountContactModel').modal('hide');
                $.notify({
                        icon: 'icmn-checkmark',
                        title: '<strong>Created!</strong><br>',
                        message: 'Account contact created successfully.'
                    }, {
                        type: 'success',
                        placement: {
                            from: 'bottom'
                        }
                    },
                );
            }
        });
  }

  /*public LoadAccountPrimaryContact(Acc_ID, Site_ID) {
      const formData: FormData = new FormData();
      formData.append('accID', Acc_ID);
      formData.append('siteID', Site_ID);
      this.ticketService.Load_Primary_Account_Site_Contact(formData).subscribe(
          data => {

              if (data !== false) {
                  this.PrimaryAccountSiteContactArray = data;
                  this.AssignAccountContact(data);
              }
          }
      );
  }*/

    public LoadAssignedAccContcts() {
      const formData = new FormData();
      formData.append('ticketID', this.TicketID);
      this.ticketContact.Ticket_Account_Contacts(formData).subscribe(data => {
          this.AccountContactLoaderStatus = false;
          this.SelectedAccountContactArray = data;
      });
  }

  public AssignAccountContact(acc_user) {
      this.AccountContactLoaderStatus = true;
      const formData: FormData = new FormData();
      formData.append('audID', acc_user.AUD_KeyID);
      formData.append('ticketID', this.TicketID);
      this.ticketContact.Assign_ACC_Contact(formData).subscribe(
          data => {
              let result;
              result = data.result;
              if (result === 'exist') {
                  this.AccountContactLoaderStatus = false;
                  $.notify({
                          icon: 'icmn-cross',
                          title: '<strong>Account contact already exist!</strong>',
                          message: 'Account contact already exist.'
                      }, {
                          type: 'danger',
                          placement: {
                              from: 'bottom'
                          }
                      },
                  );
              } else if (result === 'success') {
                  this.LoadAssignedAccContcts();
              }
          }
      );
  }

  public RemoveAccContact(A_C) {

    const index: number = this.SelectedAccountContactArray.indexOf(A_C);
    if (index !== -1) {
      this.SelectedAccountContactArray.splice(index, 1);
    }
    const formData: FormData = new FormData();
    formData.append('ticketID', this.TicketID);
    formData.append('contactID', A_C.AUD_KeyID);
    this.removeTicketDetails.Remove_tic_acc_con_single(formData).subscribe(
        data => {
            if (data.result === 'success') {
            }
        }
    );
  }

  /*Site*/
  public LoadSites(Account_ID) {
    $(function () {
      $('#All_Site_List').dataTable().fnDestroy();
    });
    this.accService.LoadSites(Account_ID).subscribe(
        data => {
            this.SiteArray = data;
            setTimeout(function () {
                $('#All_Site_List').DataTable(
                    {
                        paging: true,
                        searching: true,
                        order: [[0, 'asc']]
                    }
                );
            }, 1000);
        }
    );
  }

  public ShowSiteModalBox() {
    $(function () {
      $('#SiteModalBox').modal();
    });
  }

  public AssignSite(Site) {
    const Site_Array_Length = this.SelectedSiteArray.length;
    if (Site_Array_Length === 1) {
        $(function () {
            $('#SiteModalBox').modal('hide');
        });
    } else {
        this.SiteLoaderStatus = true;
        this.ScltSiteID = Site.SM_KeyID;
      if (this.TicketID === '') {
          const formData: FormData = new FormData();
          formData.append('accID', this.ScltAccID);
          formData.append('siteID', Site.SM_KeyID);
          formData.append('accRefNumber', this.AccountRefNumber);
          formData.append('userRoleId', this.userRoleId);
          formData.append('userKeyId', this.userID);
          this.ticketService.CreateTicket(formData).subscribe(
              data => {
                  this.SiteLoaderStatus = false;
                  this.SelectedSiteArray.push(Site);
                  this.TicketID = data.ticketID;
                  /*this.LoadAccountPrimaryContact(this.ScltAccID, this.ScltSiteID);*/
                  this.LoadAccountUsers(this.ScltAccID);
                  /*this.LoadSitePrimaryContact(this.ScltSiteID);*/
                  this.LoadSiteContacts(this.ScltSiteID);
                  this.LoadPrimaryBranch(this.ScltSiteID);
              }
          );
      } else {
          this.SiteLoaderStatus = false;
          this.SelectedSiteArray.push(Site);
          const formData: FormData = new FormData();
          formData.append('ticketID', this.TicketID);
          formData.append('siteID', Site.SM_KeyID);
          this.ticketService.UpdateSite(formData).subscribe();
          /*this.LoadAccountPrimaryContact(this.ScltAccID, this.ScltSiteID);*/
          this.LoadAccountUsers(this.ScltAccID);
          /*this.LoadSitePrimaryContact(this.ScltSiteID);*/
          this.LoadSiteContacts(this.ScltSiteID);
          this.LoadPrimaryBranch(this.ScltSiteID);
      }
        $(function () {
            $('#SiteModalBox').modal('hide');
        });
    }
  }

  public RemoveSite() {
      if (this.TicketID !== '') {
          this.Remove_TIC_Site(this.TicketID);
          this.Remove_TIC_Branch(this.TicketID);
          this.Remove_TIC_Asset(this.TicketID);
          this.Remove_TIC_Service_Request(this.TicketID);
          this.Remove_TIC_Agreement(this.TicketID);
          this.Remove_TIC_Account_Contact_ALL(this.TicketID);
          this.Remove_TIC_Site_Contact_All(this.TicketID);
          this.Remove_TIC_Branch_Contact_All(this.TicketID);
          this.Remove_TIC_Problem_Description(this.TicketID);
          this.Remove_TIC_Parts_All(this.TicketID);
          this.Remove_TIC_Other_Recipient(this.TicketID);
          this.Remove_TIC_Branch_Recipient_All(this.TicketID);
      }
  }

  /*Site Contact*/
  public ShowSiteConModal() {
      this.LoadSiteTicketContact();
      $(function () {
          $('#SelectSiteContactModel').modal();
          $('#existmail').hide();
          $('#existmailedit').hide();
      });
  }

    public CreateSiteCOntactModal() {
        this.EmailStatusList = [];
        this.SiteConForm.reset();
        this.LoadSiteContactCategory();
        $(function () {
            $('.dropify-clear').click();
            let drEvent = $('.dropify').dropify();
            drEvent = drEvent.data('dropify');
            drEvent.resetPreview();
            drEvent.clearElement();
            $('#SelectSiteContactModel').modal('hide');
            $('#siteContactModal').modal();
        });
  }

  public LoadSiteContacts(SiteID) {
      const formData: FormData = new FormData();
      formData.append('siteID', SiteID);
      this.ticketContact.LoadSiteContacts(formData).subscribe(
          data => {
              data.forEach(user => {
                  this.AssignSiteContact(user);
              });
          }
      );
  }

    public LoadSiteTicketContact() {
        $(function () {
            $('#Site_User_Table').dataTable().fnDestroy();
        });
        const formData: FormData = new FormData();
        formData.append('siteID', this.ScltSiteID);
        formData.append('ticketID', this.TicketID);
        this.ticketContact.LoadSiteTicketContacts(formData).subscribe(
            data => {
                this.SiteContactArray = [];
                const length = this.SiteContactArray.length;
                if (length === 0) {
                    this.SiteContactArray = data;
                }
                setTimeout(function () {
                    $('#Site_User_Table').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
  }

  public LoadSiteContactCategory() {
      this.ticketContact.LoadSiteCategory().subscribe(category => {
          this.SiteContactCategoryList = category;
      });
  }

    public LoadTicketSiteContacts() {
        const formData = new FormData();
        formData.append('ticketID', this.TicketID);
        this.ticketContact.Ticket_Site_Contacts(formData).subscribe(contacts => {
                this.SiteContactLoaderStatus = false;
                this.SelectedSiteContactArray = contacts;
            }
        );
  }

  public CreateSiteContact(value) {
      this.SiteContactLoaderStatus = true;
      const Image = this.SiteUserImage.nativeElement;
      if (Image.files && Image.files[0]) {
          this.SiteUserImageFile = Image.files[0];
          const ImageFile: File = this.SiteUserImageFile;
          const formData = new FormData();
          formData.append('userArray', JSON.stringify(value));
          formData.append('userImage', ImageFile, ImageFile.name);
          formData.append('ticketID', this.TicketID);
          formData.append('ticketEmailStatus', this.SiteTicketEmailStatus);
          formData.append('ticketUser', 'Y');
          formData.append('siteID', this.ScltSiteID);
          this.ticketContact.Create_Site_Contact(formData).subscribe(data => {
              if (data.result === 'success') {
                  this.LoadTicketSiteContacts();
                  $('#siteContactModal').modal('hide');
                  $.notify({
                          icon: 'icmn-checkmark',
                          title: '<strong>Created!</strong><br>',
                          message: 'Site contact created successfully.'
                      }, {
                          type: 'success',
                          placement: {
                              from: 'bottom'
                          }
                      },
                  );
              }
          });
      } else {
          const formData = new FormData();
          formData.append('userArray', JSON.stringify(value));
          formData.append('ticketID', this.TicketID);
          formData.append('ticketEmailStatus', this.SiteTicketEmailStatus);
          formData.append('ticketUser', 'Y');
          formData.append('siteID', this.ScltSiteID);
          this.ticketContact.Create_Site_Contact(formData).subscribe(data => {
              if (data.result === 'success') {
                  this.LoadTicketSiteContacts();
                  $('#siteContactModal').modal('hide');
                  $.notify({
                          icon: 'icmn-cross',
                          title: '<strong>Created!</strong>',
                          message: 'Site contact created successfully.'
                      }, {
                          type: 'success',
                          placement: {
                              from: 'bottom'
                          }
                      },
                  );
              }
          });
      }
  }

  /*public LoadSitePrimaryContact(SiteID) {
      const formData: FormData = new FormData();
      formData.append('siteID', SiteID);
      this.ticketService.Load_Primary_Site_Contact(formData).subscribe(
          data => {
              if (data !== false) {
                  this.PrimarySiteContactArray = data;
                  this.AssignSiteContact(data);
              }
          }
      );
  }*/

  public AssignSiteContact(SiteUser) {
      this.AddSiteContact(SiteUser);
  }

    public AddSiteContact(SiteUser) {
        this.SiteContactLoaderStatus = true;
        const formData: FormData = new FormData();
        formData.append('sudID', SiteUser.SUD_KeyID);
        formData.append('ticketID', this.TicketID);
        this.ticketContact.Assign_Site_Contact(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.LoadTicketSiteContacts();
                } else if (data.result === 'exist') {
                    this.SiteContactLoaderStatus = false;
                    $.notify({
                            icon: 'icmn-cross',
                            title: '<strong>Site contact already exist!</strong>',
                            message: 'Site contact already exist.'
                        }, {
                            type: 'danger',
                            placement: {
                                from: 'bottom'
                            }
                        },
                    );
                }
            }
        );
  }

  public Remove_Site_Contact(SiteUser) {
      const index: number = this.SelectedSiteContactArray.indexOf(SiteUser);
      if (index !== -1) {
          this.SelectedSiteContactArray.splice(index, 1);
      }
      const formData: FormData = new FormData();
      formData.append('ticketID', this.TicketID);
      formData.append('contactID', SiteUser.SUD_KeyID);
      this.removeTicketDetails.Remove_tic_site_con_single(formData).subscribe();
  }

  /*Assets*/
  public LoadAssets(Site_id, Acc_id) {
      const that = this;
    $(function () {
      $('#Site_Asset_Table').dataTable().fnDestroy();
    });
    const formData: FormData = new FormData();
    formData.append('accID', this.ScltAccID);
    formData.append('siteID', this.ScltSiteID);
    this.ticketService.LoadAsset(formData).subscribe(
        data => {
            this.AllAssetsArray = [];
            if (this.AllAssetsArray.length === 0) {
                this.AllAssetsArray = data;
            }
            setTimeout(function () {
                $('#Site_Asset_Table').DataTable(
                    {
                        paging: true,
                        searching: true,
                        order: [[0, 'asc']]
                    }
                );
            }, 1000);
        }
    );
  }

  public ShowAssetModalBox() {
    this.LoadAssets(this.ScltSiteID, this.ScltAccID);
    $(function () {
      $('#AssetModalBox').modal();
    });
  }

    public AssignAsset(Asset) {
        this.AssetLoaderStatus = true;
        this.ScltAssetID = Asset.ASM_KeyID;
        this.ScltModelID = Asset.ASM_MM_KeyID;
        this.ScltAgreementID = Asset.AGM_KeyID;
        const Site_Array_Length = this.SelectedAssetArray.length;
    if (Site_Array_Length === 1) {
        this.AssetLoaderStatus = false;
      $(function () {
        swal({
          title: 'Asset Already Selected',
          text: 'Please remove selected asset for select new one',
          type: 'error',
          confirmButtonClass: 'btn-danger'
        });
      });
    } else {
        this.AssetLoaderStatus = false;
      this.SelectedAssetArray.push(Asset);
      $(function () {
        $('#AssetModalBox').modal('hide');
      });
      this.LoadServiceRequest(this.ScltAccID, this.ScltModelID);
      this.UpdateAsset(this.TicketID, this.ScltAssetID, this.ScltAgreementID);
    }
  }

  public UpdateAsset(TicketID, AssetID, AgreementID) {
      const formDdata: FormData = new FormData();
      formDdata.append('ticketID', TicketID);
      formDdata.append('assetID', AssetID);
      formDdata.append('agreementID', AgreementID);
      this.ticketService.UpdateAsset(formDdata).subscribe();
  }

  public RemoveAsset() {
      if (this.TicketID !== '') {
          this.Remove_TIC_Asset(this.TicketID);
          this.Remove_TIC_Service_Request(this.TicketID);
          this.Remove_TIC_Agreement(this.TicketID);
          this.Remove_TIC_Problem_Description(this.TicketID);
          this.Remove_TIC_Parts_All(this.TicketID);
      }
  }

  /*Branch*/
  public LoadBranches(Site_ID) {
      this.BranchModelClicked = true;
    this.siteService.LoadSiteBranches(Site_ID).subscribe(
        data => {
            this.AllBranchesArray = data;
            this.BranchModelClicked = false;
            setTimeout(function () {
                $('#All_Branch_Table').DataTable(
                    {
                        paging: true,
                        searching: true,
                        order: [[0, 'asc']]
                    }
                );
            }, 1000);
        }
    );
  }

  public LoadPrimaryBranch(Site_ID) {
      this.BranchLoaderStatus = true;
    this.assignbranchService.ViewPrimaryBranch(Site_ID).subscribe(
        data => {
            this.BranchLoaderStatus = false;
            const Site_Array_Length = this.SelectedBranchArray.length;
            if (Site_Array_Length === 1) {
                $(function () {
                        swal({
                            title: 'Branch Already Selected',
                            text: 'Please remove selected branch for select new one',
                            type: 'error',
                            confirmButtonClass: 'btn-danger'
                        });
                    }
                );
            } else if (data[0].BM_IsActive === 'N') {
                swal({
                    title: 'Primary branch is not active',
                    text: 'Primary branch is not active, contact MCM',
                    type: 'error',
                    confirmButtonClass: 'btn-danger'
                });
            } else {
                const brnBranchName = data[0].BM_Branch_Name;
                const brnBranchId = data[0].BM_KeyID;
                const brncity = data[0].BM_City;
                const brnstate = data[0].BM_State;
                this.SelectedBranchArray.push({
                    'Barnch_ID': brnBranchId,
                    'Branch_Name': brnBranchName,
                    'Branch_City': brncity,
                    'Branch_State': brnstate
                });
                this.ScltBranchID = brnBranchId;
                this.UpdateBranch(this.TicketID, this.ScltBranchID);
                this.LoadBranchUsers(this.ScltBranchID);
            }
        }
    );
  }

  public UpdateBranch(ticketID, branchID) {
      const formData: FormData = new FormData;
      formData.append('ticketID', ticketID);
      formData.append('branchID', branchID);
      this.ticketService.UpdateBranch(formData).subscribe();
  }

  public AssignBranch(Barnch_ID, Branch_Name, Branch_City, Branch_State) {
      this.BranchLoaderStatus = true;
    const Site_Array_Length = this.SelectedBranchArray.length;
    if (Site_Array_Length === 1) {
        this.BranchLoaderStatus = false;
      $(function () {
        swal({
          title: 'Branch Already Selected',
          text: 'Please remove selected branch for select new one',
          type: 'error',
          confirmButtonClass: 'btn-danger'
        });
        $('#BranchModalBox').modal('hide');
      });
    } else {
        this.BranchLoaderStatus = false;
        this.ScltBranchID = Barnch_ID;
        this.UpdateBranch(this.TicketID, this.ScltBranchID);
        /*this.LoadBranchPrimaryContact(this.ScltBranchID);*/
        this.LoadBranchUsers(this.ScltBranchID);
        this.SelectedBranchArray.push({
            'Barnch_ID': Barnch_ID,
            'Branch_Name': Branch_Name,
            'Branch_City': Branch_City,
            'Branch_State': Branch_State
        });
      $(function () {
          $('#BranchModalBox').modal('hide');
      });
    }
  }

  public RemoveBranch() {
    this.AllBranchContactArray = [];
      if (this.TicketID !== '') {
          this.SelectedBranchContactArray = [];
          this.Remove_TIC_Branch(this.TicketID);
          this.Remove_TIC_Parts_All(this.TicketID);
          this.Remove_TIC_Other_Recipient(this.TicketID);
          this.Remove_TIC_Branch_Recipient_All(this.TicketID);
          this.Remove_TIC_Branch_Contact_All(this.TicketID);
      }
  }

  public ShowBranchModal() {
    $(function () {
      $('#All_Branch_Table').dataTable().fnDestroy();
    });
    this.LoadBranches(this.ScltSiteID);
    $(function () {
      $('#BranchModalBox').modal();
    });
  }

  /*Branch Users*/
  public LoadBranchUsers(Branch_ID) {
    this.AllBranchContactArray = [];
      $(function () {
          $('#Branch_User_Table').dataTable().fnDestroy();
      });
      const formData = new FormData();
      formData.append('branchID', Branch_ID);
      this.edtService.Load_Branch_Contact(formData).subscribe(
          data => {
              this.AllBranchContactArray = data;
              if (this.AllBranchContactArray.length === 0) {
                  this.LoadTechnicians();
              } else {
                  this.AllBranchContactArray.forEach(user => {
                      this.AssignBranchContact(user);
                  });
              }
              setTimeout(function () {
                  $('#Branch_User_Table').DataTable(
                      {
                          paging: true,
                          searching: true,
                          order: [[0, 'asc']]
                      }
                  );
              }, 1000);
          }
      );
  }

    LoadTechnicians() {
    $(function () {
      $('#Technician_User_Table').dataTable().fnDestroy();
    });
    const formData: FormData = new FormData();
    formData.append('branchID', this.ScltBranchID);
    this.tripService.Get_Technicians(formData).subscribe(
      data => {
        this.AllTechContactArray = data;
        this.AllTechContactArray.forEach(user => {
          this.AssignTechContact(user);
        });
        setTimeout(function () {
          $('#Technician_User_Table').DataTable(
            {
              paging: true,
              searching: true,
                order: [[0, 'asc']]
            }
          );
        }, 1000);
      }
    );
  }

    AssignTechContact(user) {
    const formData = new FormData();
    formData.append('ticketID', this.TicketID);
    formData.append('techID', user.UM_KeyID);
    this.ticketService.Assign_Tech_Contact(formData).subscribe(data => {
        if (data.result === 'success') {
            this.BranchContactLoaderStatus = false;
            this.SelectedBranchContactArray.push(user);
        } else if (data.result === 'exist') {
            this.BranchContactLoaderStatus = false;
            $.notify({
                    icon: 'icmn-cross',
                    title: '<strong>Branch contact already exist!</strong>',
                    message: 'branch contact already exist.'
                }, {
                    type: 'danger',
                    placement: {
                        from: 'bottom'
                    }
                },
            );
        }
      }
    );
  }

  public ShowBranchUserModalBox() {
      $(function () {
          $('#BranchContactModel').modal();
      });
  }

  public AssignBranchContact(BranchUser) {
      this.Add_Branch_Contact(BranchUser);
  }

  public Add_Branch_Contact(BranchUser) {
      this.BranchContactLoaderStatus = true;
      const formData: FormData = new FormData();
      formData.append('budID', BranchUser.BUD_KeyID);
      formData.append('ticketID', this.TicketID);
      this.ticketService.Assign_Branch_Contact(formData).subscribe(
          data => {
              if (data.result === 'success') {
                  this.BranchContactLoaderStatus = false;
                  this.SelectedBranchContactArray.push(BranchUser);
              } else if (data.result === 'exist') {
                  this.BranchContactLoaderStatus = false;
                  $.notify({
                          icon: 'icmn-cross',
                          title: '<strong>Branch contact already exist!</strong>',
                          message: 'branch contact already exist.'
                      }, {
                          type: 'danger',
                          placement: {
                              from: 'bottom'
                          }
                      },
                  );
              }
          }
      );
  }

  public Remove_Branch_Contact(BranchUser) {
      const index: number = this.SelectedBranchContactArray.indexOf(BranchUser);
      if (index !== -1) {
          this.SelectedBranchContactArray.splice(index, 1);
      }
      if (BranchUser.UM_URM_KeyID === '7') {
          this.Remove_TIC_Branch_Contact_Single(this.TicketID, BranchUser.UM_KeyID);
      } else if (BranchUser.UM_URM_KeyID === '4') {
          this.Remove_TIC_Branch_Contact_Single(this.TicketID, BranchUser.BUD_KeyID);
      }
  }

  /*Service Request*/
  public LoadServiceRequest(Acc_ID, Model_ID) {
      $(function () {
          $('#Service_Request_Table').dataTable().fnDestroy();
      });
      this.aSRM_Service.LoadASR(Acc_ID, Model_ID).subscribe(
          data => {
              this.AllServiceRequestArray = data;
              setTimeout(function () {
                  $('#Service_Request_Table').DataTable(
                      {
                          paging: true,
                          searching: true,
                          order: [[0, 'asc']]
                      }
                  );
              }, 1000);
          }
      );
  }

  public ShowServiceRequestModal() {
      $(function () {
          $('#ServiceRequestModal').modal();
      });
  }

  public AssignServiceRequest(SR_ID, SR_Name, SR_Desc, SR_Status, AMSRD_ID) {
      this.ServiceLoaderStatus = true;
      this.AMSRD_ID = AMSRD_ID;
      const SR_Length = this.SelectedServicerequestAarray.length;
      if (SR_Length === 1) {
          this.ServiceLoaderStatus = false;
          $(function () {
              swal({
                  title: 'Service Request Already Selected',
                  text: 'Please remove selected service request for select new one',
                  type: 'error',
                  confirmButtonClass: 'btn-danger'
              });
              $('#ServiceRequestModal').modal('hide');
          });
      } else {
          this.ServiceLoaderStatus = false;
          this.SelectedServicerequestAarray.push({
              'SR_ID': SR_ID,
              'SR_Name': SR_Name,
              'SR_Desc': SR_Desc,
              'SR_Status': SR_Status
          });
          this.Update_TIC_SR(AMSRD_ID, this.TicketID);
          this.Load_TIC_Agreement();
          $('#ServiceRequestModal').modal('hide');
      }
  }

  public Update_TIC_SR(AMSRD_ID, TICKET_ID) {
      const formData: FormData = new FormData();
      formData.append('asrmID', AMSRD_ID);
      formData.append('ticketID', TICKET_ID);
      this.ticketService.Assign_Service_Request(formData).subscribe(
          data => {
              this.ScltServiceRequestID = data.TSRD_ID;
              this.Load_Ticket_Required_Parts(this.TicketID);
              this.Load_Tickets_Parts();
          }
      );
  }

    public Remove_SR() {
        if (this.TicketID !== '') {
            this.Remove_TIC_Service_Request(this.TicketID);
            this.Remove_TIC_Problem_Description(this.TicketID);
            this.Remove_TIC_Parts_All(this.TicketID);
        }
  }

  /*Agreement*/
    public Load_TIC_Agreement() {
        $(function () {
            $('#All_Agreement_List').dataTable().fnDestroy();
        });
        const formData: FormData = new FormData();
        formData.append('accID', this.ScltAccID);
        formData.append('amsrdID', this.AMSRD_ID);
        this.ticketService.Load_Agreements(formData).subscribe(
            data => {
                this.AgreementArray = data;
                setTimeout(function () {
                    $('#All_Agreement_List').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
  }

    public Show_AgreementModel() {
        $(function () {
            $('#AgreementModalBox').modal();
        });
  }

  public AssignAgrement(Agreement_ID, Agreement_Name, Agreement_Response_Time, AGM_EffectiveDate, AGM_EndDate, AGM_WorkingHours_StartTime, AGM_WorkingHours_EndTime) {
      const length = this.SelectedAgreementArray.length;
      if (length === 1) {
          $(function () {
              $('#AgreementModalBox').modal('hide');
              $.notify({
                      icon: 'icmn-warning',
                      title: '<strong>Agreement already selected!</strong>',
                      message: 'Please remove selected agreement for choose new one.'
                  }, {
                      type: 'danger',
                      placement: {
                          from: 'bottom'
                      }
                  },
              );
          });
      } else {
          this.SelectedAgreementArray.push({
              'AGM_ID': Agreement_ID,
              'AGM_Name': Agreement_Name,
              'AGM_Response_Time': Agreement_Response_Time,
              'AGM_EffectiveDate': AGM_EffectiveDate,
              'AGM_EndDate': AGM_EndDate,
              'AGM_WorkingHours_StartTime': AGM_WorkingHours_StartTime,
              'AGM_WorkingHours_EndTime': AGM_WorkingHours_EndTime
          });
          this.Assign_Agreement(Agreement_ID, this.TicketID);
          $('#AgreementModalBox').modal('hide');
      }
  }

    public Assign_Agreement(Agreement_ID, Ticket_ID) {
        const formData: FormData = new FormData();
        formData.append('agmID', Agreement_ID);
        formData.append('ticketID', Ticket_ID);
        this.ticketService.Update_Agreement(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    $.notify({
                            icon: 'icmn-checkbox-checked',
                            title: '<strong>Agreement assigned!</strong>',
                            message: 'Agreement assigned for this ticket successfully.'
                        }, {
                            type: 'success',
                            placement: {
                                from: 'bottom'
                            }
                        },
                    );
                }
            }
        );
  }

  /*Parts*/

  /*public ShowBranchPartModel() {
      this.Load_Tickets_Parts();
      $(function () {
          $('#BranchPartModalBox').modal();
      });
  }

  public HideBranchModal(){
      $(function () {
          $('#BranchPartModalBox').modal('hide');
      });
  }*/

  public Load_Tickets_Parts() {
      this.HeroKitPartAvailable = false;
      this.NonHeroKitPartAavailable = false;
      this.NewPartAvailable = false;
      const formData: FormData = new FormData();
      formData.append('ticketID', this.TicketID);
      this.ticketService.Load_Ticket_Parts(formData).subscribe(
          data => {
              this.Ticket_Req_PartsArray = data;
              this.Ticket_Req_PartsArray.forEach(part => {
                  if (part.HeroKit === 'Y') {
                      this.HeroKitPartAvailable = true;
                  }
                  if (part.HeroKit === 'N') {
                      this.NonHeroKitPartAavailable = true;
                  }
                  if (part.HeroKit === 'NIL') {
                      this.NewPartAvailable = true;
                  }
              });
          }
      );
  }

    public Load_Ticket_Required_Parts(Ticket_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', Ticket_ID);
        this.ticketService.Load_Ticket_Required_Parts(formData).subscribe(
            data => {
                this.Ticket_Required_Parts = data;
            }
        );
  }

  public Problem_Description_Update() {
      const formData: FormData = new FormData();
      this.ProblemDescriptionMod = this.ProblemDescription.replace(/\n/g, '<br>');
      formData.append('desc', this.ProblemDescriptionMod);
      formData.append('ticketID', this.TicketID);
      this.ticketService.Update_Problem_Description(formData).subscribe();
  }

  /*public Ticket_Email_Recipient_Update() {
      const formData: FormData = new FormData();
      formData.append('email', this.OtherEmailRecipient);
      formData.append('ticketID', this.TicketID);
      this.ticketService.Assign_Other_Recipient(formData).subscribe(
          data => {
              if (data.result === 'success') {
              }
          }
      );
  }*/

    public Assign_TIC_Parts() {

  }

  /*public Remove_TIC_Part_Singlle(partArray) {
      const formData: FormData = new FormData();
      formData.append('ticketID', this.TicketID);
      formData.append('partID', partArray.PM_KeyID);
      this.removeTicketDetails.Remove_tic_part_single(formData).subscribe(
          data => {
              if (data.result === 'success'){
                  const index: number = this.SelectedPartsArray.indexOf(partArray);
                  if (index !== -1) {
                      this.SelectedPartsArray.splice(index, 1);
                  }
              }
          }
      );
  }*/

  /* Preview*/
  public PreviewModel() {
      $(function () {
          $('#Preview').modal();
      });
  }

    /* public ShowBranchRecipientModel(){
     $(function () {
     $('#BranchRecipientModel').modal();
     });
     }
     */
  public Assign_TIC_Branch_Recipient(BranchUserArray) {
      this.Save_Barnch_Recipient(BranchUserArray);
  }

  public Save_Barnch_Recipient(BranchUserArray) {
      const formData: FormData = new FormData();
      formData.append('email', BranchUserArray.UM_EmailID);
      formData.append('ticketID', this.TicketID);
      this.ticketService.Assign_Branch_Recipient(formData).subscribe(
          data => {
              if (data.result === 'success') {
                  this.SelectedBranchRecipientArray.push(BranchUserArray);
              } else if (data.result === 'exist') {
                  $.notify({
                      icon: 'icmn-cross',
                      title: '<strong>Already exist!</strong><br>',
                      message: 'Branch Recipient already exist.'
                  }, {
                      type: 'danger',
                      placement: {
                          from: 'bottom'
                      }
                  });
              }
          }
      );
  }

  /*public Remove_TIC_Branch_Recipient(Branch_User){
      const formData: FormData = new FormData();
      formData.append('ticketID', this.TicketID);
      formData.append('email', Branch_User.UM_EmailID);
      this.removeTicketDetails.Remove_branch_recipient_single(formData).subscribe(
          data => {
              if (data.result === 'success'){
                  const index: number = this.SelectedBranchRecipientArray.indexOf(Branch_User);
                  if (index !== -1) {
                      this.SelectedBranchRecipientArray.splice(index, 1);
                  }
                  $.notify({
                          icon: 'icmn-checkbox-checked',
                          title: '<strong>Branch recipient removed!</strong>',
                          message: 'Selected branch recipient removed for this ticket successfully.'
                      }, {
                          type: 'success',
                          placement: {
                              from: 'bottom'
                          }
                      },
                  );
              }
          }
      );
  }*/

  public Preview_Ticket_Info() {
      const formData = new FormData();
      formData.append('ticketID', this.TicketID);
      formData.append('tripID', 0);
      formData.append('userID', this.userID);
      this.ticketService.Preview_Ticket(formData).subscribe(
          data => {
              this.Ticket_Details_Array = data;
              this.SR_Details_Array = this.Ticket_Details_Array['Service_Request']['Known_Issue'];
          }
      );
  }

  public Submit_Ticket() {
      this.TicketErrors = [];
      if (this.ScltAccID === '') {
          this.TicketErrors.push({errorMsg: 'Account Not Selected'});
      }
      if (this.AccountRefNumber === '') {
          this.TicketErrors.push({errorMsg: 'Account Reference Number required'});
      }
      if (this.ScltBranchID === '') {
          this.TicketErrors.push({errorMsg: 'Branch Not Selected'});
      }
      if (this.ScltSiteID === '') {
          this.TicketErrors.push({errorMsg: 'Site Not Selected'});
      }
      if (this.ScltAssetID === '') {
          this.TicketErrors.push({errorMsg: 'Asset Not Selected'});
      }
      if (this.ScltAgreementID === '') {
          this.TicketErrors.push({errorMsg: 'Agreement Not Selected'});
      }
      if (this.ScltServiceRequestID === '') {
          this.TicketErrors.push({errorMsg: 'Service Request Not Selected'});
      }
      if (this.KICountChange === 0) {
          this.TicketErrors.push({errorMsg: 'Known Issues Required'});
      }
      if (this.SolCountChange === 0) {
          this.TicketErrors.push({errorMsg: 'Troubleshooting List Required'});
      }
      if (this.ProblemDescription === '') {
          this.TicketErrors.push({errorMsg: 'Problem Description Required'});
      }
      if (this.SelectedAccountContactArray.length === 0) {
          this.TicketErrors.push({errorMsg: 'Account Contact Not Selected'});
      }
      if (this.SelectedSiteContactArray.length === 0) {
          this.TicketErrors.push({errorMsg: 'Site Contact Not Selected'});
      }
      if (this.SelectedBranchContactArray.length === 0) {
          this.TicketErrors.push({errorMsg: 'Branch Contact Not Selected'});
      }
      /*if (this.OtherEmailRecipient === '') {
       this.TicketErrors.push({errorMsg: 'Email Recipient Required'});
       }*/
      if (this.TicketErrors.length === 0) {
          const partData: FormData = new FormData();
          partData.append('ticketID', this.TicketID);
          partData.append('partData', JSON.stringify(this.Ticket_Req_PartsArray));
          this.ticketService.Assign_parts(partData).subscribe(data => {
          }, (err) => {
          }, () => {
              this.TicketSubmitStatus = true;
              $(() => {
                  $('#Preview').modal('hide');
              });
              this.ticketService.Submit_Ticket(this.TicketID).subscribe(
                  data => {
                      if (data.result === 'success') {
                          this.tripID = data.tripID;
                          this.ttdID = data.ttdID;
                          this.TicketSubmitStatus = false;
                          const partRequestData = new FormData();
                          partRequestData.append('ticketType', 'NEW');
                          partRequestData.append('ticketID', this.TicketID);
                          partRequestData.append('tripID', this.tripID);
                          partRequestData.append('userID', this.userID);
                          partRequestData.append('partData', JSON.stringify(this.Ticket_Req_PartsArray));
                          this.ticketService.Raise_Part_request(partRequestData).subscribe();
                          this.Navication('tickets/overview');
                          $(function () {
                              swal({
                                  title: 'Ticket Submitted',
                                  text: 'This ticket is submitted for further process.',
                                  type: 'success',
                                  confirmButtonClass: 'btn-success'
                              });
                          });
                          const formData = new FormData();
                          formData.append('ticketID', this.TicketID);
                          formData.append('tripID', this.tripID);
                          this.ticketService.Submit_Ticket_Mail(formData).subscribe();
                          this.ticketService.CheckCustomKnownIssues(partData).subscribe();
                      }
                  }
              );
          });
      } else {
          $(() => {
              $('#Preview').modal('hide');
              $('#Ticket_Error').modal();
          });
      }
  }

    RaisePartReq() {
        const partRequestData = new FormData();
        partRequestData.append('ticketType', 'NEW');
        partRequestData.append('ticketID', this.TicketID);
        partRequestData.append('tripID', this.tripID);
        partRequestData.append('userID', this.userID);
        partRequestData.append('partData', JSON.stringify(this.Ticket_Req_PartsArray));
        this.ticketService.Raise_Part_request(partRequestData).subscribe();
    }

  public Navication(link) {
      this.router.navigate([link]);
  }

    public Remove_TIC_Account(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_account(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    /*Clear Account Details*/
                    /*this.AllAccountsArray = [];*/
                    this.SelectedAccountArray = [];
                    this.ScltAccID = '';
                }
            }
        );
  }

    public Remove_TIC_Site(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_site(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.SelectedSiteArray = [];
                    /*this.SiteArray = [];*/
                    this.ScltSiteID = '';
                }
            }
        );
  }

    public Remove_TIC_Branch(TICKET_ID) {
        this.ScltBranchID = '';
        this.SelectedBranchArray = [];
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_branch(formData).subscribe(
            data => {
                if (data.result === 'success') {
                }
            }
        );
  }

    public Remove_TIC_Asset(TICKET_ID) {
        /*clear Model Information*/
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_asset(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    /*Clear Asset Details*/
                    /*this.AllAssetsArray = [];*/
                    this.SelectedAssetArray = [];
                    this.ScltAssetID = '';
                    /*clear Model Information*/
                    this.ScltModelID = '';
                }
            }
        );
  }

    public Remove_TIC_Service_Request(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_Service_Request(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.SelectedServicerequestAarray = [];
                    this.ScltServiceRequestID = '';
                }
            }
        );
  }

    public Remove_TIC_Agreement(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_agreement(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    /*Clear Agreement Details*/
                    /*this.AgreementArray = [];*/
                    this.SelectedAgreementArray = [];
                }
            }
        );
  }

    public Remove_TIC_Account_Contact_ALL(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_acc_con_all(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    /*Clear Account Contact Details*/
                    /*this.AllAccountContactsArray = [];*/
                    this.SelectedAccountContactArray = [];
                }
            }
        );
  }

    public Remove_TIC_Site_Contact_All(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_site_con_all(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    /*Clear Site Contact*/
                    /*this.SiteContactArray = [];*/
                    this.SelectedSiteContactArray = [];
                }
            }
        );
  }

    public Remove_TIC_Branch_Contact_Single(TicketID, BUD_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TicketID);
        formData.append('contactID', BUD_ID);
        this.removeTicketDetails.Remove_tic_branch_con_single(formData).subscribe();
  }

    public Remove_TIC_Branch_Contact_All(TICKET_ID) {
        $(function () {
            $('#Branch_User_Table').dataTable().fnDestroy();
            $('#Technician_User_Table').dataTable().fnDestroy();
        });
        this.AllBranchContactArray = [];
        this.SelectedBranchContactArray = [];
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_branch_con_all(formData).subscribe(
            data => {
                if (data.result === 'success') {
                }
            }
        );
  }

    public Remove_TIC_Problem_Description(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_problem_desc(formData).subscribe();
  }

    public Remove_TIC_Parts_All(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_part_all(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    /*Clear required Parts*/
                    this.Ticket_Required_Parts = [];
                }
            }
        );
  }

    public Remove_TIC_Other_Recipient(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_other_recipient(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.OtherEmailRecipient = '';
                }
            }
        );
  }

    public Remove_TIC_Branch_Recipient_All(TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_branch_recipient_all(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    /*Clear Branch Recipient Details*/
                    /*this.AllBranchRecipientArray = [];*/
                    this.SelectedBranchRecipientArray = [];
                }
            }
        );
  }

  public Close_Preview() {
      $(function () {
          $('#Preview').modal('hide');
      });
  }

    toggle(val) {
        this.editRowId = val;
  }

    Hero_toggle(val) {
        this.HeroKiteditRowId = val;
  }

    Cancel_Ticket(link) {
      const that = this;
      swal({
              title: 'Do you want to cancel this ticket?',
              text: 'You will not recover this ticket information in future!',
              type: 'warning',
              showCancelButton: true,
              cancelButtonClass: 'btn-default',
              confirmButtonClass: 'btn-warning',
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              closeOnConfirm: false
          },
          function () {
              const formData: FormData = new FormData();
              if (this.TicketID === '') {
                  swal({
                      title: 'Cancelled!',
                      text: 'Ticket Cancelled',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
                  that.router.navigate([link]);
              } else if (this.TicketID !== '') {
                  formData.append('ticketID', that.TicketID);
                  that.ticketService.Cancel_Ticket(formData).subscribe(
                      data => {
                          if (data.result === 'success') {
                              that.router.navigate([link]);
                              swal({
                                  title: 'Cancelled!',
                                  text: 'Ticket Cancelled',
                                  type: 'success',
                                  confirmButtonClass: 'btn-success'
                              });
                          }
                      }
                  );
              }
          });
  }

    PartRequestTriger() {
      const formData = new FormData();
      formData.append('partData', JSON.stringify(this.Ticket_Req_PartsArray));
      formData.append('ticketID', this.TicketID);
      this.ticketService.Ticket_Part_Request(formData).subscribe();
  }

    GetReservedStock(RequiredQty, CurrentStock, ReservedStock) {
        console.log('req-' + RequiredQty + ' cun-' + CurrentStock + ' Res-' + ReservedStock);
        if (parseInt(RequiredQty) <= (parseInt(CurrentStock) - parseInt(ReservedStock))){
            let UpdatedCurrentStock;
            UpdatedCurrentStock = (parseInt(CurrentStock) - parseInt(ReservedStock));
            if (UpdatedCurrentStock > 0) {
                if (parseInt(CurrentStock) > parseInt(RequiredQty)) {
                    return RequiredQty;
                } else if (parseInt(CurrentStock) < parseInt(RequiredQty)) {
                    return CurrentStock;
                } else if (parseInt(CurrentStock) === parseInt(RequiredQty)) {
                    return RequiredQty;
                }
            } else if (UpdatedCurrentStock < 0) {
                return 0;
            } else if (UpdatedCurrentStock === 0) {
                return 0;
            }
        } else {
            if((parseInt(CurrentStock) - parseInt(ReservedStock)) > 0){
                const allotted = (parseInt(CurrentStock) - parseInt(ReservedStock));
                return allotted;
            } else {
                return '0';
            }

        }
    }
}
