import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BranchuserService} from '../../branch/services/branchuser/branchuser.service';
import {AssetsService} from '../../assets/services/assets.service';
import {BranchService} from '../../branch/services/branch.service';
import {AsrmService} from '../../account/accservicerequest/services/asrm.service';
import {RemoveTicketDetailsService} from '../service/remove-ticket-details.service';
import {CreateuserService} from '../../account/services/accountuser/createuser.service';
import {AssignbranchService} from '../../branch/services/assignbranch.service';
import {TicketService} from '../service/ticket.service';
import {SiteService} from '../../site/service/site.service';
import {AccountsService} from '../../../../services/accounts/accounts.service';
import {EditTicketService} from '../service/edit-ticket.service';
import {GlobalVariable} from '../../../../global/global';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TicketcontactService} from '../service/ticketcontact.service';
import {TripService} from '../trip/service/trip/trip.service';
declare const $;
declare const swal;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.components.scss']
})
export class EditComponent implements OnInit {
    /*Ticket*/
    AccountRefNumber: any = '';
    TicketID: any = '';
    TicketType: any;
    New_Ticket_ID: any = '';
    ProblemDescription: any = '';
    ProblemDescriptionMod: any = '';
    OtherEmailRecipient: any = '';
    ticketPreviewData: any = '';
    /* Account */
    AllAccountsArray: any = [];
    SelectedAccountArray: any = [];
    ScltAccID: any = '';
    /* Account Contacts */
    AllAccountContactsArray: any = [];
    SelectedAccountContactArray: any = [];
    PrimaryAccountSiteContactArray: any = [];
    /*Sites*/
    SiteArray: any = [];
    ScltSiteID: any = '';
    SelectedSiteArray: any = [];
    SiteContactArray: any = [];
    PrimarySiteContactArray: any = [];
    SelectedSiteContactArray: any = [];
    /*Assets*/
    AllAssetsArray: any = [];
    SelectedAssetArray: any = [];
    ScltAssetID: any = '';
    ScltSerialNumber: any = '';
    /*Model*/
    ScltModelID: any = '';
    /*Branch*/
    AllBranchesArray: any = [];
    SelectedBranchArray: any = [];
    ScltBranchID: any = '';
    /*BranchUsers*/
    AllBranchContactArray: any = [];
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
    HeroKitPartsArray: any = [];
    NonHeroKitPartsArray: any = [];
    SelectedPartsArray: any = [];
    Ticket_Required_Parts: any = [];

    /*Branch Recipient Array */
    AllBranchRecipientArray: any = [];
    SelectedBranchRecipientArray: any = [];
    encapsulation: ViewEncapsulation.None;
  AllTechContactArray: any = [];

    /*Edit Table*/
    showEditable: boolean = false;
    editRowId: any;
    HeroKiteditRowId: any;
    userID: any = '';

    Ticket_Details_Array: any = [];
    Account_Array: any = [];
    Site_Array: any = [];
    Branch_Array: any = [];
    AccountContactArray: any = [];
    P_SiteContactArray: any = [];
    BranchContactArray: any = [];
    S_Asset: any = [];
    ServiceRequestArray: any = [];
    SR_Details_Array: any = [];
    TripDetailsArray: any = [];
    Assigned_Part_Details_Aarray: any = [];
    SelectedTTD_ID: any = '';
    userRoleId: any;
    TicketDetailsArray: any[];
    TripID: any;
    Ticket_Req_PartsArray: any[];
    TTD_ID: any = '';
    FileBaseUrl: any = '';
    /* Datatable Satus */
    AccountTableLoaded: boolean = false;
    /*Loader*/
    AccountLoaderStatus: boolean = false;
    BranchLoaderStatus: boolean = false;
    SiteLoaderStatus: boolean = false;
    AccountContactLoaderStatus: boolean = false;
    SiteContactLoaderStatus: boolean = false;
    BranchContactLoaderStatus: boolean = false;
    AssetLoaderStatus: boolean = false;
    ServiceLoaderStatus: boolean = false;
    PartsLoaderStatus: boolean = false;
    TicketSubmitStatus: boolean = false;
    HeroKitPartAvailable: boolean = false;
    NonHeroKitPartAavailable: boolean = false;
    NewPartAvailable: boolean = false;

    /*TicketValidation*/
    TicketErrors: any = [];
    FileBasePath: any = '';
    EmailStatusList: any = [];
    SiteContactCategoryList: any = [];
    URM_ID: any = '';
    UCM_ID: any = '';
    AccConForm: FormGroup;
    AccTicketEmailStatus: any = 'A';
    SiteTicketEmailStatus: any = 'A';
    SiteConForm: FormGroup;
    AccUserCategoryArray: any = [];
    @ViewChild('AccUserImg') AccUserImage;
    AccUserImageFile: File;
    @ViewChild('SiteUserImg') SiteUserImage;
    SiteUserImageFile: File;
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    /*Known issue*/
    KICountChange: number = 0;
    /*Troubleshooting List*/
    SolCountChange: number = 0;
    loaduniqueemail: any = '';
    loaduniqueemaillen: any = '';

    constructor(private accService: AccountsService, private accuserService: CreateuserService, private siteService: SiteService, private assignbranchService: AssignbranchService, private aSRM_Service: AsrmService, private ticketService: TicketService, public router: Router, private removeTicketDetails: RemoveTicketDetailsService, private aRoute: ActivatedRoute, private edtService: EditTicketService, private fb: FormBuilder, private ticketContact: TicketcontactService, private tripService: TripService) {
      this.userID = localStorage.getItem('umid');
      this.userRoleId = localStorage.getItem('ucmid');
      this.TicketID = this.aRoute.snapshot.params['ticketID'];
      this.TripID = this.aRoute.snapshot.params['tripID'];
      if (this.aRoute.snapshot.params['type']) {
          this.TicketType = this.aRoute.snapshot.params['type'];
      } else {
          this.TicketType = 'NEW';
      }

      this.FileBaseUrl = GlobalVariable.BASE_FILE_API;
      this.FileBasePath = GlobalVariable.BASE_FILE_API;

      let altemailRegex = '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*([,]\\s*\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)*';
      let mobiepattern='^([(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4})$';
      this.AccConForm = this.fb.group({
          'Category': ['', Validators.required],
          'FirstName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])],
          'LastName': ['', Validators.compose([Validators.minLength(3), Validators.maxLength(1500)])],
          'Email': ['', Validators.compose([Validators.required, Validators.email])],
          'AltEmail': ['',[<any>Validators.pattern(altemailRegex) ]],
          'Mobile': ['', Validators.compose([Validators.required, Validators.pattern(mobiepattern), Validators.minLength(14)])],
          'Image': [null]
      });
      this.SiteConForm = this.fb.group({
          'Category': ['', Validators.required],
          'FirstName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])],
          'LastName': ['', Validators.compose([Validators.minLength(3), Validators.maxLength(1500)])],
          'Email': ['', Validators.compose([Validators.required, Validators.email])],
          'AltEmail': ['',[<any>Validators.pattern(altemailRegex) ]],
          'Mobile': ['', Validators.compose([Validators.required,Validators.pattern(mobiepattern), Validators.minLength(14)])],
          'Image': [null]
      });
  }

  ngOnInit() {
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
      });
      this.LoadTicketDetails();
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
  LoadTicketDetails() {
      const formData = new FormData();
      formData.append('ticketID', this.TicketID);
      formData.append('tripID', this.TripID);
    this.New_Ticket_ID = this.TicketID + '';
      while (this.New_Ticket_ID .length < 5){
        this.New_Ticket_ID  = '0' + this.New_Ticket_ID ;
      }

      this.ticketService.Preview_Ticket_Edit_Trip(formData).subscribe(
          ticketDatas => {
              this.TicketDetailsArray = ticketDatas;
              this.TripDetailsArray = this.TicketDetailsArray['Trip_Details'];
              this.TTD_ID = this.TripDetailsArray['TTD_KeyID'];
              this.AccountRefNumber = this.TripDetailsArray['TTD_Account_Ref_Number'];
              this.Account_Array = this.TicketDetailsArray['Account_details'];
              this.SelectedAccountArray.push({'Acc_ID': this.Account_Array['AM_KeyID'], 'Acc_Name': this.Account_Array['AM_Name'], 'Acc_City': this.Account_Array['AM_City']});
              this.ScltAccID = this.Account_Array['AM_KeyID'];
              this.Site_Array = this.TicketDetailsArray['Site_details'];
              this.ScltSiteID = this.Site_Array['SM_KeyID'];
              this.SelectedSiteArray.push(this.Site_Array);
              this.Branch_Array = this.TicketDetailsArray['Branch_details'];
              this.ScltBranchID = this.Branch_Array['BM_KeyID'];
              this.SelectedBranchArray.push({'Barnch_ID': this.Branch_Array['BM_KeyID'], 'Branch_Name': this.Branch_Array['BM_Branch_Name'], 'Branch_City': this.Branch_Array['BM_City'], 'Branch_State': this.Branch_Array['BM_State']});
              this.S_Asset = this.TicketDetailsArray['Asset_details'];
              this.ScltAssetID = this.S_Asset.ASM_KeyID;
              this.ScltModelID = this.S_Asset.ASM_MM_KeyID;
              this.ScltAgreementID = this.S_Asset.AGM_KeyID;
              this.SelectedAssetArray.push(this.S_Asset);
              this.AccountContactArray = this.TicketDetailsArray['Account_contacts'];
              this.AccountContactArray.forEach(ac => {
                  this.SelectedAccountContactArray.push(ac);
              });
              this.P_SiteContactArray = this.TicketDetailsArray['Site_contacts'];
              this.P_SiteContactArray.forEach(data => {
                  this.SelectedSiteContactArray.push(data);
              });
              this.BranchContactArray = this.TicketDetailsArray['Branch_contacts'];
              this.BranchContactArray.forEach(bc => {
                  this.SelectedBranchContactArray.push(bc);
              });
              this.ServiceRequestArray = this.TicketDetailsArray['Service_Request_Details'];
              this.AMSRD_ID = this.ServiceRequestArray.TTD_AMSRD_KeyID;
              this.ScltServiceRequestID = this.ServiceRequestArray.TSRD_KeyID;
              this.SelectedServicerequestAarray.push({'SR_ID': this.ServiceRequestArray.TSRM_KeyID, 'SR_Name': this.ServiceRequestArray.TSRM_Name, 'SR_Desc': this.ServiceRequestArray.TSRM_Description, 'SR_Status': this.ServiceRequestArray.TSRM_Disable});
              this.ProblemDescription = this.TripDetailsArray.TTD_Problem_Description.replace(/<br>/g, '\n');
              /*this.ProblemDescriptionMod = this.TripDetailsArray.TTD_Problem_Description + '<br>';*/
              this.ProblemDescriptionMod = this.ProblemDescription.replace(/\n/g, "<br>");
              console.log(this.ProblemDescriptionMod);
            this.Load_Tickets_Parts();
             /* this.SelectedPartsArray = this.TicketDetailsArray['Assigned_Part_Details'];*/
          }
      );
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
   /* public ShowAccountModel() {
        this.LoadAccounts();
        $(function () {
            $('#accountModel').modal();
        });
    }*/

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
                if (length === 0){
                    this.AllAccountsArray = data;
                }
                setTimeout(function () {
                    $('#All_Account_List').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[ 0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
    }

    public assignAccount(accID, accName, accCity) {
        this.AccountLoaderStatus = true;
        const Acc_Array_Length = this.SelectedAccountArray.length;
        if (Acc_Array_Length === 1) {
            this.AccountLoaderStatus = false;
            $('#accountModel').modal('hide');
        } else {
            this.ScltAccID = accID;
            const formData: FormData = new FormData();
            formData.append('ticketID', this.TicketID);
            formData.append('accID', this.ScltAccID);
            if (this.TicketID !== '') {
                this.AccountLoaderStatus = false;
                this.SelectedAccountArray.push({'Acc_ID': accID, 'Acc_Name': accName, 'Acc_City': accCity});
                this.ticketService.UpdateAccount(formData).subscribe();
            }
            $(function () {
                $('#accountModel').modal('hide');
            });
        }
    }

    public RemoveAccount() {
        if (this.TicketID !== ''){
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

    /*Account Contact*/
    public ShowAccountContactModel() {
        this.LoadAccountUsers(this.ScltAccID);
        $(function () {
            $('#SelectaccountContactModel').modal();
            $('#existmail').hide();
            $('#existmailedit').hide();
        });

        /*this.EmailStatusList = [];
        */
    }

    public CreateNewAccContactModal(){
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

    public LoadTicketEmailStatus(URM_ID, UCM_ID){
        const formData = new FormData();
        formData.append('urmID', URM_ID);
        formData.append('ucmID', UCM_ID);
        formData.append('accountID', this.ScltAccID);
        this.ticketContact.Ticket_Email_Status(formData).subscribe(status => {
            this.EmailStatusList = status;
        });
    }

    public LoadAssignedAccContcts() {
        const formData = new FormData();
        formData.append('ticketID', this.TicketID);
        this.ticketContact.Ticket_Account_Contacts(formData).subscribe(data => {
            this.AccountContactLoaderStatus = false;
            this.SelectedAccountContactArray = data;
        });
    }

    public LoadAccUserCategory(){
        this.accuserService.LoadCategory().subscribe(
            data => {
                this.AccUserCategoryArray = data;
            }
        );
    }

    public LoadAccountUsers(account_ID) {
        if (this.ScltAccID === '') {
        } else {
            $(function () {
                $('#Acc_User_Table').dataTable().fnDestroy();
            });
            const formData = new FormData();
            formData.append('accID', account_ID);
            formData.append('ticketID', this.TicketID);
            formData.append('siteID', this.ScltSiteID);
            this.ticketContact.LoadAccountTicketContacts(formData).subscribe(
                data => {
                    this.AllAccountContactsArray = [];
                    const length = this.AllAccountContactsArray.length;
                    if (length === 0){
                        this.AllAccountContactsArray = data;
                    }
                    setTimeout(function () {
                        $('#Acc_User_Table').DataTable(
                            {
                                paging: true,
                                searching: true,
                                order: [[ 0, 'asc']]
                            }
                        );
                    }, 1000);
                }
            );
        }
    }

    public CreateAccContact(value){
        this.AccountContactLoaderStatus = true;
        const Image = this.AccUserImage.nativeElement;
        if (Image.files && Image.files[0]) {
            this.AccUserImageFile = Image.files[0];
        }
        const ImageFile: File = this.AccUserImageFile;
        const formData = new FormData();
        formData.append('userArray', JSON.stringify(value));
        if (Image.files && Image.files[0]){
            formData.append('userImage', ImageFile, ImageFile.name);
        }
        formData.append('ticketID', this.TicketID);
        formData.append('ticketEmailStatus', this.AccTicketEmailStatus);
        formData.append('ticketUser', 'Y');
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        formData.append('accountID', this.ScltAccID);
        this.ticketContact.Create_Account_Contact(formData).subscribe(data => {
            if (data.result === 'success') {
                this.LoadAssignedAccContcts();
                $('#accountContactModel').modal('hide');
                $('.dropify-clear').click();
                let drEvent = $('.dropify').dropify();
                drEvent = drEvent.data('dropify');
                drEvent.resetPreview();
                drEvent.clearElement();
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

    public LoadAccountPrimaryContact(Acc_ID, Site_ID) {
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
    }

    public AssignAccountContact(acc_user) {
        this.AccountContactLoaderStatus = true;
        const formData: FormData = new FormData();
        formData.append('audID', acc_user.AUD_KeyID);
        formData.append('ticketID', this.TicketID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        this.edtService.Assign_Account_Contact(formData).subscribe(
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
                    this.AccountContactLoaderStatus = false;
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
        formData.append('tripID', this.TripID);
        formData.append('audID', A_C.AUD_KeyID);
        this.edtService.Remove_Account_Contact(formData).subscribe(
            data => {
                if (data.result === 'success'){
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
                            order: [[ 0, 'asc']]
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

    public AssignSite(Site_ID, Site_Name, Site_City) {
        const Site_Array_Length = this.SelectedSiteArray.length;
        if (Site_Array_Length === 1) {
            $(function () {
                $('#SiteModalBox').modal('hide');
            });
        } else {
            this.SiteLoaderStatus = true;
            this.ScltSiteID = Site_ID;
            if (this.TicketID === '') {
                const formData: FormData = new FormData();
                formData.append('accID', this.ScltAccID);
                formData.append('siteID', Site_ID);
                formData.append('accRefNumber', this.AccountRefNumber);
                formData.append('userRoleId', this.userRoleId);
                formData.append('userKeyId', this.userID);
                this.ticketService.CreateTicket(formData).subscribe(
                    data => {
                        this.SiteLoaderStatus = false;
                        this.SelectedSiteArray.push({'Site_ID': Site_ID, 'Site_Name': Site_Name, 'Site_city': Site_City});
                        this.TicketID = data.ticketID;
                        this.LoadAccountPrimaryContact(this.ScltAccID, this.ScltSiteID);
                        this.LoadSitePrimaryContact(this.ScltSiteID);
                        this.LoadPrimaryBranch(this.ScltSiteID);
                    }
                );
                $('#SiteModalBox').modal('hide');
            } else {
                this.SiteLoaderStatus = false;
                this.SelectedSiteArray.push({'Site_ID': Site_ID, 'Site_Name': Site_Name, 'Site_city': Site_City});
                const formData: FormData = new FormData();
                formData.append('ticketID', this.TicketID);
                formData.append('siteID', Site_ID);
                this.ticketService.UpdateSite(formData).subscribe();
                this.LoadAccountPrimaryContact(this.ScltAccID, this.ScltSiteID);
                this.LoadSitePrimaryContact(this.ScltSiteID);
                this.LoadPrimaryBranch(this.ScltSiteID);
            }

            $(function () {
                $('#SiteModalBox').modal('hide');
            });
        }
    }

    public RemoveSite() {
        if (this.TicketID !== ''){
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
        this.LoadSiteContacts(this.ScltSiteID);
        $(function () {
            $('#SelectSiteContactModel').modal();
            $('#existmail').hide();
            $('#existmailedit').hide();
        });

    }

    public CreateSiteCOntactModal(){
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
            $('#siteContactModel').modal();
        });
    }
    public LoadSiteContactCategory() {
        this.ticketContact.LoadSiteCategory().subscribe(category => {
            this.SiteContactCategoryList = category;
        });
    }

    public LoadTicketSiteContacts(){
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
            formData.append('tripID', this.TripID);
            formData.append('ttdID', this.TTD_ID);
            formData.append('ticketEmailStatus', this.SiteTicketEmailStatus);
            formData.append('ticketUser', 'Y');
            formData.append('siteID', this.ScltSiteID);
            this.ticketContact.Create_Site_Contact(formData).subscribe(data => {
                if (data.result === 'success') {
                    this.LoadTicketSiteContacts();
                    $('#siteContactModel').modal('hide');
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
            formData.append('ticketEmailStatus', this.AccTicketEmailStatus);
            formData.append('ticketUser', 'Y');
            formData.append('siteID', this.ScltSiteID);
            formData.append('tripID', this.TripID);
            formData.append('ttdID', this.TTD_ID);
            this.ticketContact.Create_Site_Contact(formData).subscribe(data => {
                if (data.result === 'success') {
                    this.LoadTicketSiteContacts();
                    $('#siteContactModel').modal('hide');
                    $.notify({
                            icon: 'icmn-checkmark',
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

    public LoadSiteContacts(SiteID) {
        $(function () {
            $('#Site_User_Table').dataTable().fnDestroy();
        });
        const formData: FormData = new FormData();
        formData.append('siteID', SiteID);
        formData.append('ticketID', this.TicketID);
        this.ticketContact.LoadSiteTicketContacts(formData).subscribe(
            data => {
                this.SiteContactArray = [];
                const length = this.SiteContactArray.length;
                if (length === 0){
                    this.SiteContactArray = data;
                }
                setTimeout(function () {
                    $('#Site_User_Table').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[ 0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
    }

    public LoadSitePrimaryContact(SiteID) {
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
    }

    public AssignSiteContact(SiteUser) {
        this.AddSiteContact(SiteUser);
    }

    public AddSiteContact(SiteUser){
        this.SiteContactLoaderStatus = true;
        const formData: FormData = new FormData();
        formData.append('sudID', SiteUser.SUD_KeyID);
        formData.append('ticketID', this.TicketID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        this.edtService.Assign_Site_Contact(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.SiteContactLoaderStatus = false;
                    this.SelectedSiteContactArray.push(SiteUser);
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
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        formData.append('sudID', SiteUser.SUD_KeyID);
        this.edtService.Remove_Site_Contact(formData).subscribe(
            data => {
                if (data.result === 'success'){

                }
            }
        );
    }

    /*Assets*/
    public LoadAssets(Site_id, Acc_id) {
        $(function () {
            $('#Site_Asset_Table').dataTable().fnDestroy();
        });
        const formData: FormData = new FormData();
        formData.append('accID', this.ScltAccID);
        formData.append('siteID', this.ScltSiteID);
        this.ticketService.LoadAsset(formData).subscribe(
            data => {
                this.AllAssetsArray = data;
                setTimeout(function () {
                    $('#Site_Asset_Table').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[ 0, 'asc']]
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

    public AssignAsset(Asset){
        this.ScltAssetID = Asset.ASM_KeyID;
        this.ScltModelID = Asset.ASM_MM_KeyID;
        this.ScltAgreementID = Asset.AGM_KeyID;

        const Site_Array_Length = this.SelectedAssetArray.length;
        if (Site_Array_Length === 1) {
            $(function () {
                swal({
                    title: 'Asset Already Selected',
                    text: 'Please remove selected asset for select new one',
                    type: 'error',
                    confirmButtonClass: 'btn-danger'
                });
            });
        } else {
            this.SelectedAssetArray.push(Asset);
            $(function () {
                $('#AssetModalBox').modal('hide');
            });
            this.UpdateAsset(this.TicketID, this.ScltAssetID, this.ScltAgreementID);
        }
    }

    public UpdateAsset(TicketID, AssetID, AgreementID) {
        const formDdata: FormData = new FormData();
        formDdata.append('ticketID', TicketID);
        formDdata.append('assetID', AssetID);
        formDdata.append('agreementID', AgreementID);
        this.ticketService.UpdateAsset(formDdata).subscribe(
            data => {
                if (data.result === 'success') {
                }
            }
        );
    }

    public RemoveAsset() {
        if (this.TicketID !== ''){
            this.Remove_TIC_Asset(this.TicketID);
            this.Remove_TIC_Service_Request(this.TicketID);
            this.Remove_TIC_Agreement(this.TicketID);
            this.Remove_TIC_Problem_Description(this.TicketID);
            this.Remove_TIC_Parts_All(this.TicketID);
        }
    }

    /*Branch*/
    public LoadBranches(Site_ID) {
        $(function () {
            $('#All_Branch_Table').dataTable().fnDestroy();
        });
        this.siteService.LoadSiteBranches(Site_ID).subscribe(
            data => {
                this.AllBranchesArray = data;
                setTimeout(function () {
                    $('#All_Branch_Table').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[ 0, 'asc']]
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
                const brnBranchName = data[0].BM_Branch_Name;
                const brnBranchId = data[0].BM_KeyID;
                this.ScltBranchID = brnBranchId;
                const brnaddress = data[0].BM_Address;
                const brnzip = data[0].BM_Zip;
                const brncity = data[0].BM_City;
                const brnstate = data[0].BM_State;
                const brncountry = data[0].BM_Country;
                const brnfax = data[0].BM_Fax;
                const brnphone = data[0].BM_Phone;
                const brnconfrom = data[0].BM_Contract_FirstName;
                const brnconto = data[0].BM_Contract_SecondName;
                const brndescription = data[0].BM_Description;
                const brnlat = data[0].BM_Latitude;
                const brnlong = data[0].BM_Longitude;
                const Site_Array_Length = this.SelectedBranchArray.length;
                if (Site_Array_Length === 1) {
                    $(function () {
                            swal({
                                title: 'Branch Already Selected',
                                text: 'Please remove selected branch for select new one',
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                            $('#BranchModalBox').modal('hide');
                        }
                    );
                } else {
                    this.SelectedBranchArray.push({'Barnch_ID': brnBranchId, 'Branch_Name': brnBranchName, 'Branch_City': brncity, 'Branch_State': brnstate});
                }
                this.UpdateBranch(this.TicketID, this.ScltBranchID);
                this.LoadBranchUsers(this.ScltBranchID);
                this.LoadBranchPrimaryContact(this.ScltBranchID);
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
            this.LoadBranchPrimaryContact(this.ScltBranchID);
            this.SelectedBranchArray.push({'Barnch_ID': Barnch_ID, 'Branch_Name': Branch_Name, 'Branch_City': Branch_City, 'Branch_State': Branch_State});
            $(function () {
                $('#BranchModalBox').modal('hide');
            });
            this.LoadBranchUsers(this.ScltBranchID);
        }
    }

    public RemoveBranch() {
        if (this.TicketID !== ''){
            this.SelectedBranchContactArray = [];
            this.Remove_TIC_Branch(this.TicketID);
            this.Remove_TIC_Parts_All(this.TicketID);
            this.Remove_TIC_Other_Recipient(this.TicketID);
            this.Remove_TIC_Branch_Recipient_All(this.TicketID);
            this.Remove_TIC_Branch_Contact_All(this.TicketID);
        }
    }

    public ShowBranchModal() {
        this.LoadBranches(this.ScltSiteID);
        $(function () {
            $('#BranchModalBox').modal();
        });
    }

    /*Branch Users*/
    public LoadBranchUsers(Branch_ID) {
        $(function () {
            $('#Branch_User_Table').dataTable().fnDestroy();
        });
        const formData = new FormData();
        formData.append('branchID', Branch_ID);
        this.edtService.Load_Branch_Contact(formData).subscribe(
            data => {
                const length = this.AllBranchContactArray.length;
                if (length === 0){
                    this.AllBranchContactArray = data;
                }
                setTimeout(function () {
                    $('#Branch_User_Table').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[ 0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
    }

    public ShowBranchUserModalBox() {
        this.LoadBranchUsers(this.ScltBranchID);
        this.LoadTechnicians();
        $(function () {
            $('#BranchContactModel').modal();
        });
    }

  LoadTechnicians(){
    $(function () {
      $('#Technician_User_Table').dataTable().fnDestroy();
    });
    const formData: FormData = new FormData();
    formData.append('branchID', this.ScltBranchID);
    this.tripService.Get_Technicians(formData).subscribe(
      data => {
        this.AllTechContactArray = data;
        setTimeout(function () {
          $('#Technician_User_Table').DataTable(
            {
              paging: true,
              searching: true,
              order: [[ 0, 'asc']]
            }
          );
        }, 1000);
      }
    );
  }

  AssignTechContact(user){
    const formData = new FormData();
    formData.append('ticketID', this.TicketID);
    formData.append('techID', user.UM_KeyID);
    formData.append('ttdID', this.TTD_ID);
    formData.append('tripID', this.TripID);
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

  public Update_Account_Ref() {
      const formData = new FormData();
      formData.append('ticketID', this.TicketID);
      formData.append('tripID', this.TripID);
      formData.append('ttdID', this.TTD_ID);
      formData.append('accRefID', this.AccountRefNumber);
      formData.append('userID', this.userID);
      this.ticketService.Update_Acc_Ref(formData).subscribe();
  }

    public LoadBranchPrimaryContact(Branch_ID) {
        const formData: FormData = new FormData();
        formData.append('branchID', Branch_ID);
        this.ticketService.Load_Primary_Branch_Contact(formData).subscribe(
            data => {
                if (data !== false) {
                    this.PrimarySiteContactArray = data;
                    this.AssignBranchContact(data);
                }
            }
        );
    }

    public AssignBranchContact(BranchUser) {
        this.Add_Branch_Contact(BranchUser);
    }

    public Add_Branch_Contact(BranchUser) {
        this.BranchContactLoaderStatus = true;
        const formData: FormData = new FormData();
        formData.append('budID', BranchUser.BUD_KeyID);
        formData.append('ticketID', this.TicketID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        this.edtService.Assign_Branch_Contact(formData).subscribe(
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
        if (BranchUser.UM_URM_KeyID === '4'){
          this.Remove_TIC_Branch_Contact_Single(this.TicketID, BranchUser.BUD_KeyID);
        } else if (BranchUser.UM_URM_KeyID === '7') {
          this.Remove_TIC_Branch_Contact_Single(this.TicketID, BranchUser.UM_KeyID);
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
                            order: [[ 0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
    }

    public ShowServiceRequestModal() {
        this.LoadServiceRequest(this.ScltAccID, this.ScltModelID);
        $(function () {
            $('#ServiceRequestModal').modal();
        });
    }

    public AssignServiceRequest(SR_ID, SR_Name, SR_Desc, SR_Status, AMSRD_ID) {
        this.AMSRD_ID = AMSRD_ID;
        const SR_Length = this.SelectedServicerequestAarray.length;
        if (SR_Length === 1) {
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
            this.SelectedServicerequestAarray.push({'SR_ID': SR_ID, 'SR_Name': SR_Name, 'SR_Desc': SR_Desc, 'SR_Status': SR_Status});
            this.Update_TIC_SR(AMSRD_ID, this.TicketID);
            this.Load_TIC_Agreement();
            $('#ServiceRequestModal').modal('hide');
        }
    }

    public Update_TIC_SR(AMSRD_ID, TICKET_ID) {
        const formData: FormData = new FormData();
        formData.append('asrmID', AMSRD_ID);
        formData.append('ticketID', TICKET_ID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        this.edtService.Assign_Service_Request(formData).subscribe(
            data => {
                this.ScltServiceRequestID = data.TSRD_ID;
                this.Load_Ticket_Required_Parts(this.TicketID);
                this.Load_Tickets_Parts();
            }
        );
    }

    public Remove_SR(){
        if (this.TicketID !== ''){
          this.ProblemDescriptionMod = '';
          this.Remove_TIC_Service_Request(this.TicketID);
          this.Remove_TIC_Problem_Description(this.TicketID);
          this.Remove_TIC_Parts_All(this.TicketID);
        }
    }

    /*Agreement*/
    public Load_TIC_Agreement(){
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
                            order: [[ 0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
    }

    public Show_AgreementModel(){
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
            this.SelectedAgreementArray.push({'AGM_ID': Agreement_ID, 'AGM_Name': Agreement_Name, 'AGM_Response_Time': Agreement_Response_Time, 'AGM_EffectiveDate': AGM_EffectiveDate, 'AGM_EndDate': AGM_EndDate, 'AGM_WorkingHours_StartTime': AGM_WorkingHours_StartTime, 'AGM_WorkingHours_EndTime': AGM_WorkingHours_EndTime});
            this.Assign_Agreement(Agreement_ID, this.TicketID);
            $('#AgreementModalBox').modal('hide');
        }
    }

    public Assign_Agreement(Agreement_ID, Ticket_ID){
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

    public ShowBranchPartModel() {
        this.Load_Tickets_Parts();
        $(function () {
            $('#BranchPartModalBox').modal();
        });
    }

    public Load_Herokit_Parts() {
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        formData.append('branchID', this.ScltBranchID);
        this.ticketService.Load_Branch_Hero_Kit_Parts(formData).subscribe(
            data => {
                this.HeroKitPartsArray = data;
            }
        );
    }

    public Load_Tickets_Parts() {
        this.HeroKitPartAvailable = false;
        this.NonHeroKitPartAavailable = false;
        this.NewPartAvailable = false;
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        formData.append('tripID', this.TripID);
        this.ticketService.Load_Ticket_Parts_Edit(formData).subscribe(
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

    public Load_Ticket_Required_Parts(Ticket_ID){
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
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        this.edtService.Update_Problem_Descrption(formData).subscribe(
            data => {
                if (data.result === 'success') {
                }
            }
        );
    }

    public Ticket_Email_Recipient_Update() {
        const formData: FormData = new FormData();
        formData.append('email', this.OtherEmailRecipient);
        formData.append('ticketID', this.TicketID);
        this.ticketService.Assign_Other_Recipient(formData).subscribe(
            data => {
                if (data.result === 'success') {
                }
            }
        );
    }

    public Assign_TIC_Parts(){
        this.SelectedPartsArray = [];
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        formData.append('userID', this.userID);
        formData.append('partData', JSON.stringify(this.Ticket_Req_PartsArray));
        this.edtService.Assign_Parts(formData).subscribe(
            data => {
                this.SelectedPartsArray = data;
            }
        );
    }

    public Remove_TIC_Part_Singlle(partArray) {
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
    }
    /* Preview*/
    public PreviewModel() {
        $(function () {
            $('#Preview').modal();
        });
    }

    public ShowBranchRecipientModel(){
        $(function () {
            $('#BranchRecipientModel').modal();
        });
    }

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

    public Remove_TIC_Branch_Recipient(Branch_User){
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
    }

    public Preview_Ticket_Info() {
        const formData = new FormData();
        formData.append('ticketID', this.TicketID);
        formData.append('tripID', this.TripID);
        formData.append('userID', this.userID);
        this.ticketService.Preview_Ticket_Edit(formData).subscribe(
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
        if (this.TicketErrors.length === 0){
            const formData = new FormData();
            formData.append('ticketID', this.TicketID);
            formData.append('tripID', this.TripID);
            if (this.TicketType === 'NEW') {
                this.ticketService.CheckCustomKnownIssues(formData).subscribe();
            } else if (this.TicketType === 'EDIT') {
                this.ticketService.CheckCustomKnownIssuesEdit(formData).subscribe();
            }
            $('#Preview').modal('hide');
            $(function () {
                swal({
                    title: 'Ticket Submitted',
                    text: 'This ticket is submitted for further process.',
                    type: 'success',
                    confirmButtonClass: 'btn-success'
                });
            });
            this.Navication('tickets/overview');
        } else {
            $(() => {
                $('#Preview').modal('hide');
                $('#Ticket_Error').modal();
            });
        }

    }

    public Navication(link) {
        this.router.navigate([link]);
    }

    public Remove_TIC_Account(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_account(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    /*Clear Account Details*/
                    /*this.AllAccountsArray = [];*/
                    this.SelectedAccountArray = [];
                    this.ScltAccID = '';
                }
            }
        );
    }

    public Remove_TIC_Site(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_site(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    /*Clear Site Details*/
                    if ( this.ScltSiteID !== '') {
                    }
                    this.SelectedSiteArray = [];
                    /*this.SiteArray = [];*/
                    this.ScltSiteID = '';
                }
            }
        );
    }

    public Remove_TIC_Branch(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_branch(formData).subscribe(
            data => {
                this.SelectedBranchArray = [];
                if (data.result === 'success'){
                    if (this.ScltBranchID !== '') {

                    }
                    /*Clear Branch Details*/
                    /*this.AllBranchesArray = [];*/
                    this.SelectedBranchArray = [];
                    this.ScltBranchID = '';
                }
            }
        );
    }

    public Remove_TIC_Asset(TICKET_ID){
        /*clear Model Information*/
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_asset(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    /*Clear Asset Details*/
                    /*this.AllAssetsArray = [];*/
                    if (this.ScltAssetID !== '') {
                    }
                    this.SelectedAssetArray = [];
                    this.ScltAssetID = '';
                    /*clear Model Information*/
                    this.ScltModelID = '';
                }
            }
        );
    }

    public Remove_TIC_Service_Request(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        this.removeTicketDetails.Remove_Service_Request(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    if (this.ScltServiceRequestID !== '') {
                    }
                    this.SelectedServicerequestAarray = [];
                    this.ScltServiceRequestID = '';
                }
            }
        );
    }

    public Remove_TIC_Agreement(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        this.edtService.Remove_Agreement(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    /*Clear Agreement Details*/
                    /*this.AgreementArray = [];*/
                    if (this.SelectedAgreementArray.length !== 0) {

                    }
                    this.SelectedAgreementArray = [];
                }
            }
        );
    }

    public Remove_TIC_Account_Contact_ALL(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_acc_con_all(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    /*Clear Account Contact Details*/
                    /*this.AllAccountContactsArray = [];*/
                    if (this.SelectedAccountContactArray.length !== 0) {

                    }
                    this.SelectedAccountContactArray = [];
                }
            }
        );
    }

    public Remove_TIC_Site_Contact_All(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_site_con_all(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    /*Clear Site Contact*/
                    /*this.SiteContactArray = [];*/
                    if (this.SelectedSiteContactArray.length !== 0) {

                    }
                    this.SelectedSiteContactArray = [];
                }
            }
        );
    }

    public Remove_TIC_Branch_Contact_Single(TicketID, BUD_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TicketID);
        formData.append('tripID', this.TripID);
        formData.append('budID', BUD_ID);
        formData.append('ttdID', this.TTD_ID);
        this.edtService.Remove_Branch_Contact(formData).subscribe(
            data => {
                if (data.result === 'success'){

                }
            }
        );
    }

    public Remove_TIC_Branch_Contact_All(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_tic_branch_con_all(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    /*Clear Branch Contact Details*/
                    /* this.AllBranchContactArray = [];*/
                    if (this.SelectedBranchContactArray.length !== 0) {
                    }
                    this.SelectedBranchContactArray = [];
                }
            }
        );
    }

    public Remove_TIC_Problem_Description(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        this.edtService.Remove_Problem_Description(formData).subscribe(
            data => {
                if (data.result === 'success') {
                  this.ProblemDescription = '';
                }
            }
        );
    }

    public Remove_TIC_Parts_All(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.TTD_ID);
        this.edtService.Remove_Parts(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    /*Clear required Parts*/
                    if (this.Ticket_Required_Parts.length !== 0) {
                    }
                    this.Ticket_Required_Parts = [];
                }
            }
        );
    }

    public Remove_TIC_Other_Recipient(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_other_recipient(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    if (this.OtherEmailRecipient !== '') {
                    }
                    this.OtherEmailRecipient = '';
                }
            }
        );
    }

    public Remove_TIC_Branch_Recipient_All(TICKET_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.removeTicketDetails.Remove_branch_recipient_all(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    /*Clear Branch Recipient Details*/
                    /*this.AllBranchRecipientArray = [];*/
                    if (this.SelectedBranchRecipientArray.length !== 0) {
                    }
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

    toggle(val){
        this.editRowId = val;
    }

    Hero_toggle(val){
        this.HeroKiteditRowId = val;
    }

    Cancel_Ticket(link) {
        this.router.navigate([link]);
    }

    PartRequestTriger() {
        const formData = new FormData();
        formData.append('partData', JSON.stringify(this.Ticket_Req_PartsArray));
        formData.append('ticketID', this.TicketID);
        formData.append('tripID', this.TripID);
        formData.append('userID', this.userID);
        formData.append('ticketType', this.TicketType);
        if (this.TicketType === 'EDIT') {
            this.ticketService.Raise_Part_request_edit(formData).subscribe();
        } else {
            this.ticketService.Raise_Part_request(formData).subscribe();
        }
    }

    GetReservedStockEDIT(RequiredQty, CurrentStock, ReservedStock) {
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
