import {Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {ModelsService} from "../../../settings/models/services/models.service";
import {GlobalVariable} from "../../../../global/global";
import {FileValidatorDirective} from "../../../../customDirective/FileValidator.Directive";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {TickservicereqService} from "./services/tickservicereq.service";

declare var $;
declare var swal;


@Component({
    selector: 'app-tickservicereq',
    templateUrl: './tickservicereq.component.html',
    styleUrls: ['./tickservicereq.component.scss']
})
export class TickservicereqComponent implements OnInit,OnChanges
{    serReqselectedRow: Number;
    serReqsetClickedRow: Function;
    KIMselectedRow: Number;
    KIMClickedRow: Function;
    SOMselectedRow: Number;
    SOMClickedRow: Function;
    @Input() AccScltID;
    @Input() menuchange;
    ModelScltID: any = '';

    /* Service Request */
    SR_Form: FormGroup;
    AccountSRArray: any = [];
    UnassignSRArray: any = [];
    UnnassignSRStatus: boolean;
    asrModelTitle: any = '';
    asrModelButtonPri: any = '';
    srName: any = '';
    srDescription: any = '';
    srStatus: any = '';
    scltASRM_id: any = '';
    scltSrm_id: any = '';
    unAssignSRForm: FormGroup;
    SelectedSRList = [];

    /* Models */
    ModelArray: any = [];
    Image_Path: any = '';
    Video_Path: any = '';

    /* Known Issue */
    UnassignKIStaus: boolean;
    ASR_KI_Modal_Title: any = '';
    ASR_KI_Modal_Btn: any = '';
    KI_Form: FormGroup;
    kiScltID: any = '';
    KIM_ID: any = '';
    kiName: any = '';
    KnownIssueArray: any = [];
    UnassignKnownIssueArray: any = [];
    unassignKIForm: FormGroup;
    SelectedKIList = [];

    /* Solutions */
    ASR_SOL_Modal_Title: any = '';
    ASR_SOL_Modal_Btn: any = '';
    SOL_Form: FormGroup;
    solScltID: any = '';
    SOM_Sclt_ID: any = '';
    solName: any = '';
    SolutionArray: any = [];
    UnassignSolutionArray: any = [];
    UnassignSOLStaus: boolean;
    unassignSOLForm: FormGroup;
    SelectedSOLList = [];

    /* Parts */
    PartsArray: any = [];
    UnassignPartsArray: any = [];
    unassignPartForm: FormGroup;
    SelectedPartList = [];
    SelectedPartArray: any = [];

    /* Instruction */
    INS_Form: FormGroup;
    InstructionArray: any = [];
    UnassignInstructionAarray: any = [];
    InsName: any = '';
    InsDesc: any = '';
    ASR_INS_Modal_Title: any = '';
    ASR_INS_Modal_Btn: any = '';
    ASR_INS_Sclt_ID: any = '';
    INS_Sclt_ID: any = '';
    UnassignINSStaus: boolean;
    InstructionFile: File;
    @ViewChild('Instruction_PDF') Instruction_Pdf;
    instructionFile_URL: any = '';
    unassignINSForm: FormGroup;
    SelectedINSList = [];

    /* InstructionPDF */
    InstructionPDFArray: any = [];
    UnassignInstructionPDFArray: any = [];
    INS_PDF_Form: FormGroup;
    InsPdfName: any = '';
    InsPDFStatus: any = '';
    InsPDF_File: File;
    ASR_INS_PDF_Modal_Title: any = '';
    ASR_INS_PDF_Modal_Btn: any = '';
    ASR_INS_PDF_Assign_Status: boolean;
    ASR_INS_PDF_Sclt_ID: any = '';
    INS_PDF_Sclt_ID: any = '';
    @ViewChild('INS_PDF') Ins_Pdf;
    unassignImageForm: FormGroup;
    SelectedImageList = [];

    /* GenInsPDF */
    GeneralInstructionPDFArry: any = [];
    UnassignGenPDF: any = [];
    Gen_Ins_PDF_Form: FormGroup;
    GenPDFName: any = '';
    GenPDF_File: File;
    ASR_GEN_INS_PDF_Modal_Title: any = '';
    ASR_GEN_INS_PDF_Modal_Btn: any = '';
    ASR_GEN_INS_PDF_Assign_Status: boolean;
    ASR_GEN_INS_PDF_Sclt_ID: any = '';
    GEN_INS_PDF_Sclt_ID: any = '';
    @ViewChild('GEN_INS_PDF') Gen_Ins_Pdf;
    unassignVideoForm: FormGroup;
    SelectedVideoList = [];

    /* PDF File Modal */
    PDFModalTitle: any = '';
    PDF_PATH: any = '';
    Asssubmenu: any;
    Asssubbutton: any;
    add: any;
    edit: any;
    delete: any;
    sessid: any;
    viewbtn: any;
    FileBaseUrl: any = '';


    constructor(private domSanitizer: DomSanitizer, private fb: FormBuilder, public modelService: ModelsService, public asrmService: TickservicereqService, public menu: MenumanagementService) {

        this.sessid = localStorage.getItem('ucmid');
        this.FileBaseUrl = GlobalVariable.BASE_FILE_API;
        this.Loadbuttons();
        this.serReqsetClickedRow = function (index) {
            this.serReqselectedRow = index;
        };
        /* KnownIssue */
        this.KIMClickedRow = function (index) {
            this.KIMselectedRow = index;
        };
        /* Solutions */
        this.SOMClickedRow = function (index) {
            this.SOMselectedRow = index;
        };
        this.SR_Form = this.fb.group({
            'srName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
            'srDescription': [null, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
            'srStatus': ['NO']
        });
        const unassignSR_Array = [];
        this.unAssignSRForm = this.fb.group({
            usrList: this.fb.array(unassignSR_Array)
        });

        this.KI_Form = this.fb.group({
            'kiName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
        });

        const unassignKI_Array = [];
        this.unassignKIForm = this.fb.group({
            uKIList: this.fb.array(unassignKI_Array)
        });

        this.SOL_Form = this.fb.group({
            'solName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
        });
        const unassignSOL_Array = [];
        this.unassignSOLForm = this.fb.group({
            uSOLList: this.fb.array(unassignSOL_Array)
        });

        const unassignPart_Array = [];
        this.unassignPartForm = this.fb.group({
            uPartList: this.fb.array(unassignPart_Array)
        });

        this.INS_Form = this.fb.group({
            'InsName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
            'InsDesc': [null, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
            'instruction_File': [null, FileValidatorDirective.validate]
        });
        const unassignINS_Array = [];
        this.unassignINSForm = this.fb.group({
            uINSList: this.fb.array(unassignINS_Array)
        });
        this.INS_PDF_Form = this.fb.group({
            'InsPdfName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
            'InsPDFStatus': ['NO', Validators.required],
            'InsPDF_File': [null, FileValidatorDirective.validate]
        });
        const unassignImage_Array = [];
        this.unassignImageForm = this.fb.group({
            uimageList: this.fb.array(unassignImage_Array)
        });
        this.Gen_Ins_PDF_Form = this.fb.group({
            'GenPDFName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
            'GenPDF_File': [null, FileValidatorDirective.validate]
        });
        const unassignVideo_Array = [];
        this.unassignVideoForm = this.fb.group({
            uvideoList: this.fb.array(unassignVideo_Array)
        });
    }

    ngOnInit() {
        $(() => {
            $('.mediatec-cleanvideoplayer').cleanvideoplayer();
            $('.mediatec-cleanaudioplayer').cleanaudioplayer();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.LoadModels(this.AccScltID);
        if (this.menuchange === 1) {
            this.LoadModels(this.AccScltID);
        } else {
        }
    }

    public LoadModels(Account_ID) {
        this.modelService.LoadAccModels(Account_ID).subscribe(
            data => {
                this.ModelArray = data;
                this.AccountSRArray = [];
                this.scltASRM_id = '';
                this.KnownIssueArray = [];
                this.kiScltID = '';
                this.SolutionArray = [];
                this.solScltID = '';
                this.PartsArray = [];
                this.InstructionArray = [];
                this.InstructionPDFArray = [];
                this.GeneralInstructionPDFArry = [];
            }
        );
    }

    public SelectedModel(Model_ID) {
        this.ModelScltID = Model_ID;
        this.LoadAllASR(this.AccScltID, this.ModelScltID);
        this.scltASRM_id = '';
        this.KnownIssueArray = [];
        this.kiScltID = '';
        this.SolutionArray = [];
        this.solScltID = '';
        this.PartsArray = [];
        this.InstructionArray = [];
        this.InstructionPDFArray = [];
        this.GeneralInstructionPDFArry = [];
    }

    public LoadAllASR(AccID, ModelID) {
        this.asrmService.LoadASR(AccID, ModelID).subscribe(
            data => {
                this.AccountSRArray = data;
            }
        );
    }

    get usrList(): FormArray {
        return this.unAssignSRForm.get('usrList') as FormArray;
    };

    public LoadUnassignSR(accID, modelID) {
        this.asrmService.LoadUnAssignedASR(accID, modelID).subscribe(
            data => {
                this.UnassignSRArray = data;
                const unassignSR_Array = [];
                for (const usr of this.UnassignSRArray) {
                    unassignSR_Array.push(this.fb.group({
                        isChosen: false,
                        SRM_Name: usr.SRM_Name,
                        SRM_KeyID: usr.SRM_KeyID
                    }));
                }
                this.unAssignSRForm = this.fb.group({
                    usrList: this.fb.array(unassignSR_Array)
                });
            }
        );
    }


    public showASRCreateModel() {
        if (this.ModelScltID === '') {
            $.notify({
                title: '<strong>Model Not Selected.</strong><br>',
                message: 'Please select a model.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        } else {
            this.asrModelTitle = 'Create Service Request';
            this.asrModelButtonPri = 'Create';
            this.UnnassignSRStatus = true;
            this.LoadUnassignSR(this.AccScltID, this.ModelScltID);
            $(function () {
                $('#CreateSR').modal();
            });
        }
    }

    public hideASRModal() {
        $(function () {
            $('#CreateSR').modal('hide');
            $('#SRForm').trigger('reset');
        });
    }

    public SaveASR(value) {
        if (this.asrModelButtonPri === 'Create') {
            let Desc;
            if (value.srDescription === null) {
                Desc = '';
            } else {
                Desc = value.srDescription;
            }
            const formData: FormData = new FormData();
            formData.append('srName', value.srName);
            formData.append('srDesc', Desc);
            formData.append('srStatus', value.srStatus);
            formData.append('accID', this.AccScltID);
            formData.append('modelID', this.ModelScltID);
            this.asrmService.createASR(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response[0].result === 'success') {
                        this.hideASRModal();
                        this.LoadAllASR(this.AccScltID, this.ModelScltID);
                        swal({
                            title: 'Created!',
                            text: 'Service Request Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        } else if (this.asrModelButtonPri === 'Update') {
            const formData: FormData = new FormData();
            formData.append('srName', value.srName);
            formData.append('srDesc', value.srDescription);
            formData.append('srStatus', value.srStatus);
            formData.append('srmID', this.scltSrm_id);
            formData.append('asrmID', this.scltASRM_id);
            this.asrmService.updateASR(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response[0].result === 'success') {
                        this.hideASRModal();
                        this.LoadAllASR(this.AccScltID, this.ModelScltID);
                        swal({
                            title: 'Updated!',
                            text: 'Service Request Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );

        }
    }

    public AssignASR(): void {
        const items = this.unAssignSRForm.value;
        this.SelectedSRList = items.usrList.filter(x => x.isChosen).map(x => {
            return {name: x.SRM_Name, id: x.SRM_KeyID};
        });
        this.SelectedSRList.forEach(
            data => {
                const formData: FormData = new FormData();
                formData.append('srID', data.id);
                formData.append('accID', this.AccScltID);
                formData.append('modelID', this.ModelScltID);
                this.asrmService.assignASR(formData).subscribe(
                    resultData => {
                        let response: any;
                        response = resultData;
                        if (response[0].result === 'success') {
                            this.LoadAllASR(this.AccScltID, this.ModelScltID);
                            this.LoadUnassignSR(this.AccScltID, this.ModelScltID);
                        }
                    }
                );
            }
        );
        $(function () {
            $('#CreateSR').modal('hide');
        });
        swal({
            title: 'Assigned!',
            text: 'Service Request(s) Assigned Successfully',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });

    }

    public showASREditModel(asrmID) {
        this.asrModelTitle = 'Update Service Request';
        this.asrModelButtonPri = 'Update';
        this.UnnassignSRStatus = false;
        this.scltASRM_id = asrmID;
        this.asrmService.LoadASRDetails(this.scltASRM_id).subscribe(
            data => {
                this.scltSrm_id = data[0].ASRM_SRM_KeyID;
                this.srName = data[0].ASRM_Name;
                this.srDescription = data[0].ASRM_Description;
                this.srStatus = data[0].ASRM_Disable;
                if (this.srStatus === 'Y') {
                    this.srStatus = 'YES';
                } else if (this.srStatus === 'N') {
                    this.srStatus = 'NO';
                }
                this.SR_Form = this.fb.group({
                    'srName': [this.srName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                    'srDescription': [this.srDescription, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
                    'srStatus': [this.srStatus]
                });
                $(function () {
                    $('#CreateSR').modal();
                });
            }
        );
    }

    public DeleteASR(asrmID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Service request will not recover in future. If any Agreement link with this Service request, it can’t be delete.',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function () {
                that.asrmService.DeleteASR(asrmID).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response[0].result === 'success') {
                            that.scltASRM_id = '';
                            that.KnownIssueArray = [];
                            that.kiScltID = '';
                            that.SolutionArray = [];
                            that.solScltID = '';
                            that.PartsArray = [];
                            that.InstructionArray = [];
                            that.InstructionPDFArray = [];
                            that.GeneralInstructionPDFArry = [];
                            that.LoadAllASR(that.AccScltID, that.ModelScltID);
                            swal({
                                title: 'Deleted!',
                                text: 'Service Request Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }else if(response[0].result === 'error'){
                            swal({
                                title: 'Not able to delete Checklist',
                                text: response[0].message,
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                        }
                    }
                );
            });
    }
public KI_Activate(id)
{
    const formData = new FormData();
    formData.append('akim_ID', id);
    formData.append('amsrdID', this.scltASRM_id);
    const that = this;
    swal({
            title: 'Are you sure?',
            text: 'Want to Confirm this Known Issue!',
            type: 'warning',
            showCancelButton: true,
            cancelButtonClass: 'btn-default',
            confirmButtonClass: 'btn-warning',
            confirmButtonText: 'Confirm',
            closeOnConfirm: false
        },
        function () {
            that.asrmService.ActivateKI(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        that.Load_ACC_KI(that.scltASRM_id);
                        that.kiScltID = '';
                        that.SolutionArray = [];
                        that.solScltID = '';
                        that.PartsArray = [];
                        that.InstructionArray = [];
                        that.InstructionPDFArray = [];
                        that.GeneralInstructionPDFArry = [];
                        swal({
                            title: 'Confirmed!',
                            text: 'Known Issue Confirmed Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        });


}
    /* Account Known Issue */
    public Load_ACC_KI(ASR_ID) {
        this.scltASRM_id = ASR_ID;
        this.asrmService.Load_ASR_KI(ASR_ID).subscribe(
            data => {
                this.KnownIssueArray = data;
                this.kiScltID = '';
                this.SolutionArray = [];
                this.solScltID = '';
                this.PartsArray = [];
                this.InstructionArray = [];
                this.InstructionPDFArray = [];
                this.GeneralInstructionPDFArry = [];
            }
        );
    }

    public Show_ACC_KI_Create_Modal() {
        this.Load_Unassign_KI_List();
        this.ASR_KI_Modal_Title = 'Create Known Issue';
        this.ASR_KI_Modal_Btn = 'Create';
        this.UnassignKIStaus = true;
        if (this.scltASRM_id === '') {
            $.notify({
                title: '<strong>Service Request Not Selected.</strong><br>',
                message: 'Please select a service request.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        } else {
            $(function () {
                $('#KnownIssue').modal();
            });
        }
    }

    public TickShow_ACC_KI_Edit_Modal(KI_ID) {
        this.ASR_KI_Modal_Title = 'Update Known Issue';
        this.ASR_KI_Modal_Btn = 'Update';
        this.UnassignKIStaus = false;
        this.asrmService.Load_ASR_KI_Details(KI_ID).subscribe(
            data => {
                this.KIM_ID = data.AKIM_KIM_KeyID;
                this.kiScltID = data.AKIM_KeyID;
                this.kiName = data.AKIM_Known_Issue;
                this.KI_Form = this.fb.group({
                    'kiName': [this.kiName, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
                });
                $(function () {
                    $('#TicKnownIssue').modal();
                });
            }
        );
    }

    public TickHide_Acc_KI_Modal_Hide() {
        $(function () {
            $('#TicKnownIssue').modal('hide');
            $('#KIForm').trigger('reset');
        });
    }

    public Save_Acc_KI(value) {
        if (this.ASR_KI_Modal_Btn === 'Create') {

            const formData: FormData = new FormData();
            formData.append('issue', value.kiName);
            formData.append('AMSR_ID', this.scltASRM_id);
            this.asrmService.create_ASR_KI(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.TickHide_Acc_KI_Modal_Hide();
                        this.Load_ACC_KI(this.scltASRM_id);
                        swal({
                            title: 'Created!',
                            text: 'Known Issue Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        } else if (this.ASR_KI_Modal_Btn === 'Update') {

            const formData: FormData = new FormData();
            formData.append('ki_Name', value.kiName);
            formData.append('kim_ID', this.KIM_ID);
            formData.append('akim_ID', this.kiScltID);

            this.asrmService.update_ASR_KI(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response[0].result === 'success') {
                        this.TickHide_Acc_KI_Modal_Hide();
                        this.Load_ACC_KI(this.scltASRM_id);
                        swal({
                            title: 'Updated!',
                            text: 'Known Issue Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        }
    }

    get uKIList(): FormArray {
        return this.unassignKIForm.get('uKIList') as FormArray;
    };

    public Load_Unassign_KI_List() {
        const Params = new FormData();
        Params.append('accID', this.AccScltID);
        Params.append('MODEL_ID', this.ModelScltID);
        Params.append('ASRM_ID', this.scltASRM_id);
        this.asrmService.Load_UnAssigned_ASR_KI(Params).subscribe(
            data => {
                this.UnassignKnownIssueArray = data;
                const unassignKI_Array = [];
                for (const uki of this.UnassignKnownIssueArray) {
                    unassignKI_Array.push(this.fb.group({
                        isChosen: false,
                        AKIM_Name: uki.AKIM_Known_Issue,
                        AKIM_KeyID: uki.AKIM_KeyID
                    }));
                }
                this.unassignKIForm = this.fb.group({
                    uKIList: this.fb.array(unassignKI_Array)
                });
            }
        );
    }

    public Assign_KI(): void {
        const items = this.unassignKIForm.value;
        this.SelectedKIList = items.uKIList.filter(x => x.isChosen).map(x => {
            return {name: x.AKIM_Name, id: x.AKIM_KeyID};
        });
        this.SelectedKIList.forEach(
            data => {
                const Params = new FormData();
                Params.append('akimID', data.id);
                Params.append('amsrdID', this.scltASRM_id);
                this.asrmService.assign_ASR_KI(Params).subscribe(
                    resultData => {
                        let response: any;
                        response = resultData;
                        if (response.result === 'success') {
                            this.Load_ACC_KI(this.scltASRM_id);
                        }
                    }
                );
            }
        );
        this.Load_Unassign_KI_List();
        $(function () {
            $('#KnownIssue').modal('hide');
        });
        swal({
            title: 'Assigned!',
            text: 'Known Issue Assigned Successfully',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });
    }

    public TickDelete_Acc_KI(KI_ID) {
        const formData = new FormData();
        formData.append('akim_ID', KI_ID);
        formData.append('amsrdID', this.scltASRM_id);
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This known issue will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function () {
                that.asrmService.Delete_ASR_KI(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response[0].result === 'success') {
                            that.Load_ACC_KI(that.scltASRM_id);
                            that.kiScltID = '';
                            that.SolutionArray = [];
                            that.solScltID = '';
                            that.PartsArray = [];
                            that.InstructionArray = [];
                            that.InstructionPDFArray = [];
                            that.GeneralInstructionPDFArry = [];
                            swal({
                                title: 'Deleted!',
                                text: 'Known Issue Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }

    /* Solutions */
    public Load_ASR_Sol(KI_ID) {
        this.kiScltID = KI_ID;
        this.asrmService.Load_ASR_SOL(KI_ID).subscribe(
            data => {
                this.SolutionArray = data;
                this.solScltID = '';
                this.PartsArray = [];
                this.InstructionArray = [];
                this.InstructionPDFArray = [];
                this.GeneralInstructionPDFArry = [];
            }
        );
    }

    public TickShow_Acc_SOM_Create_Modal() {
        if (this.kiScltID === '') {
            $.notify({
                title: '<strong>Known Issue Not Selected.</strong><br>',
                message: 'Please select a known issue.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        } else {
            this.Load_ACC_Sol_Unassign_List();
            this.ASR_SOL_Modal_Title = 'Create Troubleshooting List';
            this.ASR_SOL_Modal_Btn = 'Create';
            this.UnassignSOLStaus = true;
            $(function () {
                $('#TickSolutions').modal();
                $('#SOLutionForm').trigger('reset');
            });
        }

    }

    public TickHide_Acc_Sol_Modal() {
        $(function () {
            $('#SOLForm').trigger('reset');
            $('#TickSolutions').modal('hide');

        });
    }

    get uSOLList(): FormArray {
        return this.unassignSOLForm.get('uSOLList') as FormArray;
    };

    public Load_ACC_Sol_Unassign_List() {
        const postParams = new FormData();
        postParams.append('akimID', this.kiScltID);
        postParams.append('accID', this.AccScltID);
        postParams.append('modelID', this.ModelScltID);
        postParams.append('asrmID', this.scltASRM_id);

        this.asrmService.Load_UnAssigned_ASR_SOL(postParams).subscribe(
            data => {
                this.UnassignSolutionArray = data;
                const unassignSOL_Array = [];
                for (const usol of this.UnassignSolutionArray) {
                    unassignSOL_Array.push(this.fb.group({
                        isChosen: false,
                        ASOM_Name: usol.ASOM_Solution,
                        ASOM_KeyID: usol.ASOM_KeyID
                    }));
                }
                this.unassignSOLForm = this.fb.group({
                    uSOLList: this.fb.array(unassignSOL_Array)
                });
            }
        );
    }

    public TickShow_Acc_Sol_Edit_Modal(SOL_ID) {
        this.solScltID = SOL_ID;
        this.ASR_SOL_Modal_Title = 'Update Troubleshooting List:';
        this.ASR_SOL_Modal_Btn = 'Update';
        this.UnassignSOLStaus = false;
        this.asrmService.Load_ASR_SOL_Details(SOL_ID).subscribe(
            data => {
                this.solName = data.ASOM_Solution;
                this.SOL_Form = this.fb.group({
                    'solName': [this.solName, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
                });
                $(function () {
                    $('#TickSolutions').modal();
                });
            }
        );

    }

    public Assign_Acc_Sol(): void {
        const items = this.unassignSOLForm.value;
        this.SelectedSOLList = items.uSOLList.filter(x => x.isChosen).map(x => {
            return {name: x.ASOM_Name, id: x.ASOM_KeyID};
        });
        this.SelectedSOLList.forEach(
            data => {
                const postParams = new FormData();
                postParams.append('akimID', this.kiScltID);
                postParams.append('asomID', data.id);
                this.asrmService.assign_ASR_SOL(postParams).subscribe(
                    resultData => {
                        let response: any;
                        response = resultData;
                        if (response.result === 'success') {
                        }
                    }
                );
            }
        );
        this.Load_ASR_Sol(this.kiScltID);
        this.Load_ACC_Sol_Unassign_List();
        $(function () {
            $('#TickSolutions').modal('hide');
        });
        swal({
            title: 'Assigned!',
            text: 'Troubleshoot Assigned Successfully',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });
    }

    public Save_Acc_SOL(value) {
        if (this.ASR_SOL_Modal_Btn === 'Create') {
            const formData = new FormData();
            formData.append('AKIM_ID', this.kiScltID);
            formData.append('Sol', value.solName);

            this.asrmService.create_ASR_SOL(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.TickHide_Acc_Sol_Modal();
                        this.Load_ASR_Sol(this.kiScltID);
                        swal({
                            title: 'Created!',
                            text: 'Troubleshoot Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );

        } else if (this.ASR_SOL_Modal_Btn === 'Update') {
            const formData = new FormData();
            formData.append('SOL_ID', this.solScltID);
            formData.append('Sol', value.solName);
            this.asrmService.update_ASR_SOL(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.TickHide_Acc_Sol_Modal();
                        this.Load_ASR_Sol(this.kiScltID);
                        swal({
                            title: 'Updated!',
                            text: 'Troubleshoot Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );

        }
    }

    public Delete_Acc_SOL(SOL_ID) {
        const formData = new FormData();
        formData.append('asomID', SOL_ID);
        formData.append('akimID', this.kiScltID);
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Troubleshoot will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function () {
                that.asrmService.Delete_ASR_SOL(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_ASR_Sol(that.kiScltID);
                            that.PartsArray = [];
                            that.InstructionArray = [];
                            that.InstructionPDFArray = [];
                            that.GeneralInstructionPDFArry = [];

                            swal({
                                title: 'Deleted!',
                                text: 'Troubleshoot Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }

    /* Parts */
    public Load_ASR_Part(SOL_ID, SOM_KeyID) {
        this.solScltID = SOL_ID;
        this.SOM_Sclt_ID = SOM_KeyID;
        this.asrmService.Load_ASR_Part(SOL_ID).subscribe(
            data => {
                this.PartsArray = data;
            });
    }

    public TickShow_ASR_Assign_Part_Modal() {
        if (this.solScltID === '') {
            $.notify({
                title: '<strong>Troubleshoot Not Selected.</strong><br>',
                message: 'Please select a Troubleshoot.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        } else {
            this.SelectedPartArray = [];
            this.Load_ASR_Parts_Unassign_List(this.AccScltID, this.solScltID);
            $(function () {
                $('#TickParts_Modal').modal();
            });
        }
    }

    public Hide_ASR_Parts_Modal() {
        $(function () {
            $('#TickParts_Modal').modal('hide');
        });
    }

    public Delete_Acc_Part(Part_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This part will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Un-assign',
                closeOnConfirm: false
            },
            function () {
                that.asrmService.Delete_ASR_Part(Part_ID).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_ASR_Part(that.solScltID, that.SOM_Sclt_ID);
                            swal({
                                title: 'Deleted!',
                                text: 'Part Unassigned Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }

    public Load_ASR_Parts_Unassign_List(ACC_ID, ASOM_ID) {
        $(function () {
            $('#Part_Unassign_List_Table').dataTable().fnDestroy();
        });
        this.asrmService.Load_UnAssigned_ASR_Part(ACC_ID, ASOM_ID).subscribe(
            data => {
                this.UnassignPartsArray = data;
                setTimeout(function () {
                    $(function () {
                        $('#Part_Unassign_List_Table').DataTable(
                            {
                                paging: true,
                                searching: true,
                                order: [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc'], [4, 'asc']],
                                columnDefs: [
                                    {'orderable': false, 'targets': 5}
                                ]
                            }
                        );
                    });
                }, 1000);
            }
        );
    }

    public Assign_ASR_Part() {
        this.SelectedPartArray.forEach(
            part => {
                this.asrmService.assign_ASR_Part(this.solScltID, part.partID).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            this.Load_ASR_Part(this.solScltID, this.SOM_Sclt_ID);
                        }
                    }
                );
            }
        );
        this.Hide_ASR_Parts_Modal();
        this.SelectedPartArray = [];
        swal({
            title: 'Assigned!',
            text: 'Parts Assigned Successfully',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });
    }

    /* Instruction */
    public Load_ASR_INS(SOL_ID) {
        this.asrmService.Load_ASR_INS(SOL_ID).subscribe(
            data => {
                this.InstructionArray = data;
            });
    }

    public Load_ASR_INS_Details(Ins_ID) {
    }

    public TickShow_ASR_INS_Create_Modal() {
        if (this.solScltID === '') {
            $.notify({
                title: '<strong>Troubleshoot Not Selected.</strong><br>',
                message: 'Please select a Troubleshoot.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        } else {
            this.Load_ASR_INS_Unassign_List(this.solScltID);
            this.ASR_INS_Modal_Title = 'Create Documents';
            this.ASR_INS_Modal_Btn = 'Create';
            this.UnassignINSStaus = true;
            this.INS_Form = this.fb.group({
                'InsName': [this.InsName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                'InsDesc': [this.InsDesc, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
                'instruction_File': [null, FileValidatorDirective.validate]
            });
            $(function () {
                $('#TickInstruction_Modal').modal();
                $('#INSForm').trigger('reset');
            });
        }
    }

    public Hide_ASR_INS_Modal() {
        $(function () {
            $('#TickInstruction_Modal').modal('hide');
            $('#INSForm').trigger('reset');
            $('.dropify-clear').click();
            const drEvent = $('.dropify').dropify();
            drEvent.data('dropify');
            drEvent.clearElement();
            drEvent.resetPreview();
        });
    }

    public TickShow_ASR_INS_Edit_Modal(ins_ID) {

        this.ASR_INS_Modal_Title = 'Update Document';
        this.ASR_INS_Modal_Btn = 'Update';
        this.UnassignINSStaus = false;
        this.asrmService.Load_ASR_INS_Details(ins_ID).subscribe(
            data => {
                this.ASR_INS_Sclt_ID = data.AIM_KeyID;
                this.INS_Sclt_ID = data.AIM_IM_KeyID;
                this.InsName = data.AIM_Name;
                this.InsDesc = data.AIM_Description;

                this.INS_Form = this.fb.group({
                    'InsName': [this.InsName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                    'InsDesc': [this.InsDesc, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
                    'instruction_File': [null]
                });
                $(function () {
                    $('#TickInstruction_Modal').modal();
                });
            }
        );

    }

    get uINSList(): FormArray {
        return this.unassignINSForm.get('uINSList') as FormArray;
    };

    public Load_ASR_INS_Unassign_List(Sol_ID) {
        const formData = new FormData();
        formData.append('asomID', Sol_ID);
        formData.append('accID', this.AccScltID);
        formData.append('modelID', this.ModelScltID);
        this.asrmService.Load_UnAssigned_INS_Part(formData).subscribe(
            data => {
                this.UnassignInstructionAarray = data;
                const unassignINS_Array = [];
                for (const uins of this.UnassignInstructionAarray) {
                    unassignINS_Array.push(this.fb.group({
                        isChosen: false,
                        INS_Name: uins.AIM_Name,
                        INS_KeyID: uins.AIM_KeyID
                    }));
                }
                this.unassignINSForm = this.fb.group({
                    uINSList: this.fb.array(unassignINS_Array)
                });
            }
        );
    }

    public Assign_ASR_INS(): void {
        const items = this.unassignINSForm.value;
        this.SelectedINSList = items.uINSList.filter(x => x.isChosen).map(x => {
            return {name: x.INS_Name, id: x.INS_KeyID};
        });
        this.SelectedINSList.forEach(
            data => {
                const formData = new FormData();
                formData.append('aimID', data.id);
                formData.append('asomID', this.solScltID);
                this.asrmService.assign_ASR_INS(formData).subscribe(
                    resultData => {
                        let response: any;
                        response = resultData;
                        if (response.result === 'success') {
                            this.Load_ASR_INS(this.solScltID);
                            this.Load_ASR_INS_Unassign_List(this.solScltID);
                            swal({
                                title: 'Assigned!',
                                text: 'Document Assigned Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            }
        );
        $(function () {
            $('#TickInstruction_Modal').modal('hide');
        });

    }

    public Save_ASR_INS(value) {
        if (this.ASR_INS_Modal_Btn === 'Create') {
            let Desc;
            if (value.InsDesc === null) {
                Desc = '';
            } else {
                Desc = value.InsDesc;
            }
            const PDF = this.Instruction_Pdf.nativeElement;
            if (PDF.files && PDF.files[0]) {
                this.InstructionFile = PDF.files[0];
            }
            const pdfFile: File = this.InstructionFile;
            const formData = new FormData();
            formData.append('INS_Name', value.InsName);
            formData.append('INS_Desc', Desc);
            formData.append('ASOM_ID', this.solScltID);
            formData.append('instructionFIle', pdfFile, pdfFile.name);
            this.asrmService.create_ASR_INS(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Hide_ASR_INS_Modal();
                        this.Load_ASR_INS(this.solScltID);
                        swal({
                            title: 'Created!',
                            text: 'Document Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        } else if (this.ASR_INS_Modal_Btn === 'Update') {
            if (value.instruction_File !== null) {
                const PDF = this.Instruction_Pdf.nativeElement;
                if (PDF.files && PDF.files[0]) {
                    this.InstructionFile = PDF.files[0];
                }
                const pdfFile: File = this.InstructionFile;
                const formData = new FormData();
                formData.append('INS_NAME', value.InsName);
                formData.append('INS_DESC', value.InsDesc);
                formData.append('AINS_ID', this.ASR_INS_Sclt_ID);
                formData.append('ASOM_ID', this.solScltID);
                formData.append('instructionFIle', pdfFile, pdfFile.name);
                this.asrmService.update_ASR_INS(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            this.Hide_ASR_INS_Modal();
                            this.Load_ASR_INS(this.solScltID);
                            swal({
                                title: 'Updated!',
                                text: 'Document Updated Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            } else {
                const formData = new FormData();
                formData.append('INS_NAME', value.InsName);
                formData.append('INS_DESC', value.InsDesc);
                formData.append('AINS_ID', this.ASR_INS_Sclt_ID);
                formData.append('ASOM_ID', this.solScltID);
                this.asrmService.update_ASR_INS(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            this.Hide_ASR_INS_Modal();
                            this.Load_ASR_INS(this.solScltID);
                            swal({
                                title: 'Updated!',
                                text: 'Document Updated Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            }

        }
    }

    public TickDelete_Acc_INS(INS_ID) {
        const formData = new FormData();
        formData.append('asomID', this.solScltID);
        formData.append('aimID', INS_ID);
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This document will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function () {
                that.asrmService.Delete_ASR_INS(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_ASR_INS(that.solScltID);
                            swal({
                                title: 'Deleted!',
                                text: 'Document Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }

    public TickviewInstructionPDF(PDF_Name) {
        this.instructionFile_URL = 'https://drive.google.com/viewerng/viewer?url=' + this.FileBaseUrl + 'uploads/service_request/instructions/' + PDF_Name + '?pid=explorer&efh=false&a=v&chrome=false&embedded=true';
        $(function () {
            $('#TickInstructionPDFViewModal').modal();
        });
    }

    /* Instruction PDF */
    public Load_ASR_INS_PDF(SOL_ID) {
        this.asrmService.Load_ASR_INS_PDF(SOL_ID).subscribe(
            data => {
                this.InstructionPDFArray = data;
            });
    }

    public TickShow_ASR_INS_PDF_Create_Modal() {
        if (this.solScltID === '') {
            $.notify({
                title: '<strong>Troubleshoot Not Selected.</strong><br>',
                message: 'Please select a Troubleshoot.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        } else {
            this.INS_PDF_Form = this.fb.group({
                'InsPdfName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                'InsPDFStatus': ['NO', Validators.required],
                'InsPDF_File': [null, FileValidatorDirective.validate]
            });
            this.Load_ASR_INS_PDF_Unassign_List(this.solScltID);
            this.ASR_INS_PDF_Modal_Title = 'Create Image';
            this.ASR_INS_PDF_Modal_Btn = 'Create';
            this.ASR_INS_PDF_Assign_Status = true;
            $(function () {
                $('#TickIns_PDF_Modal').modal();
                $('.dropify').dropify();
            });
        }
    }

    public Tick_Hide_ASR_INS_PDF_Modal() {
        $(function () {
            $('#TickIns_PDF_Modal').modal('hide');
            $('#INSPDFForm').trigger('reset');
            $('.dropify-clear').click();
            let drEvent = $('.dropify').dropify();
            drEvent = drEvent.data('dropify');
            drEvent.resetPreview();
            drEvent.clearElement();
        });
    }

    public TickShow_ASR_INS_PDF_Edit_Modal(insPDF_ID) {
        this.ASR_INS_PDF_Modal_Title = 'Update Image';
        this.ASR_INS_PDF_Modal_Btn = 'Update';
        this.asrmService.Load_ASR_INS_PDF_Details(insPDF_ID).subscribe(
            data => {
                this.ASR_INS_PDF_Sclt_ID = data.AIPDFM_KeyID;
                this.INS_PDF_Sclt_ID = data.AIPDFM_IPDFM_KeyID;
                this.InsPdfName = data.AIPDFM_Name;
                this.InsPDFStatus = data.AIPDFM_Primary;
                if (this.InsPDFStatus === 'Y') {
                    this.InsPDFStatus = 'YES';
                } else if (this.InsPDFStatus === 'N') {
                    this.InsPDFStatus = 'NO';
                }

                this.INS_PDF_Form = this.fb.group({
                    'InsPdfName': [this.InsPdfName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                    'InsPDFStatus': [this.InsPDFStatus, Validators.required],
                    'InsPDF_File': [null]
                });
                $(function () {
                    $('#TickIns_PDF_Modal').modal();
                    $('.dropify').dropify();
                });
            }
        );
    }

    public ASR_INS_PDF_Save(value) {
        const PDF = this.Ins_Pdf.nativeElement;
        if (PDF.files && PDF.files[0]) {
            this.InsPDF_File = PDF.files[0];
        }
        const pdfFile: File = this.InsPDF_File;
        if (this.ASR_INS_PDF_Modal_Btn === 'Create') {
            const formData: FormData = new FormData();
            formData.append('ASOM_ID', this.solScltID);
            formData.append('Ins_PDF_Name', value.InsPdfName);
            formData.append('Ins_PDF_Status', value.InsPDFStatus);
            formData.append('ins_PDF_File', pdfFile, pdfFile.name);
            this.asrmService.create_ASR_INS_PDF(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Load_ASR_INS_PDF(this.solScltID);
                        this.Tick_Hide_ASR_INS_PDF_Modal();
                        swal({
                            title: 'Created!',
                            text: 'Image Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );

        } else if (this.ASR_INS_PDF_Modal_Btn === 'Update') {
            const formData: FormData = new FormData();
            if (value.InsPDF_File === null) {
                formData.append('ASOM_ID', this.solScltID);
                formData.append('AINS_PDF_ID', this.ASR_INS_PDF_Sclt_ID);
                formData.append('INS_PDF_ID', this.INS_PDF_Sclt_ID);
                formData.append('Ins_PDF_Name', value.InsPdfName);
                formData.append('Ins_PDF_Status', value.InsPDFStatus);
            } else {
                formData.append('ASOM_ID', this.solScltID);
                formData.append('AINS_PDF_ID', this.ASR_INS_PDF_Sclt_ID);
                formData.append('INS_PDF_ID', this.INS_PDF_Sclt_ID);
                formData.append('Ins_PDF_Name', value.InsPdfName);
                formData.append('Ins_PDF_Status', value.InsPDFStatus);
                formData.append('ins_PDF_File', pdfFile, pdfFile.name);
            }
            this.asrmService.update_ASR_INS_PDF(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Load_ASR_INS_PDF(this.solScltID);
                        this.Tick_Hide_ASR_INS_PDF_Modal();
                        swal({
                            title: 'Updated!',
                            text: 'Image Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        }
    }

    public TickDelete_Acc_INS_PDF(IPDF_ID) {
        const formData = new FormData();
        formData.append('asomID', this.solScltID);
        formData.append('aipdfmID', IPDF_ID);
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This image will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function () {
                that.asrmService.Delete_ASR_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_ASR_INS_PDF(that.solScltID);
                            swal({
                                title: 'Deleted!',
                                text: 'Image Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }

    get uimageList(): FormArray {
        return this.unassignImageForm.get('uimageList') as FormArray;
    };

    public Load_ASR_INS_PDF_Unassign_List(ASOM_ID) {
        const formData = new FormData();
        formData.append('asomID', ASOM_ID);
        formData.append('accID', this.AccScltID);
        formData.append('modelID', this.ModelScltID);
        this.asrmService.Load_UnAssigned_INS_PDF_Part(formData).subscribe(
            data => {
                this.UnassignInstructionPDFArray = data;
                const unassignImage_Array = [];
                for (const uimage of this.UnassignInstructionPDFArray) {
                    unassignImage_Array.push(this.fb.group({
                        isChosen: false,
                        Image_Name: uimage.AIPDFM_Name,
                        Image_KeyID: uimage.AIPDFM_KeyID
                    }));
                }
                this.unassignImageForm = this.fb.group({
                    uimageList: this.fb.array(unassignImage_Array)
                });
            }
        );
    }

    public Assign_ASR_INS_PDF(): void {
        const items = this.unassignImageForm.value;
        this.SelectedImageList = items.uimageList.filter(x => x.isChosen).map(x => {
            return {name: x.Image_Name, id: x.Image_KeyID};
        });
        this.SelectedImageList.forEach(
            data => {
                const formData = new FormData();
                formData.append('ainpdfmID', data.id);
                formData.append('asomID', this.solScltID);
                this.asrmService.assign_ASR_INS_PDF(formData).subscribe(
                    resultData => {
                        let response: any;
                        response = resultData;
                        if (response.result === 'success') {
                            this.Load_ASR_INS_PDF(this.solScltID);
                            this.Load_ASR_INS_PDF_Unassign_List(this.solScltID);
                        }
                    }
                );
            }
        );
        $(function () {
            $('#TickIns_PDF_Modal').modal('hide');
        });
        swal({
            title: 'Assigned!',
            text: 'Image Assigned Successfully',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });
    }

    /* General Instruction PDF */
    public Load_ASR_GEN_INS_PDF(SOL_ID) {
        this.asrmService.Load_ASR_GEN_INS_PDF(SOL_ID).subscribe(
            data => {
                this.GeneralInstructionPDFArry = data;
            });
    }

    public TickShow_ASR_GEN_INS_PDF_Create_Modal() {
        if (this.solScltID === '') {
            $.notify({
                title: '<strong>Troubleshoot Not Selected.</strong><br>',
                message: 'Please select a Troubleshoot.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        } else {
            this.Gen_Ins_PDF_Form = this.fb.group({
                'GenPDFName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                'GenPDF_File': [null, FileValidatorDirective.validate]
            });
            this.Load_ASR_GEN_INS_PDF_Unassign_List(this.solScltID);
            this.ASR_GEN_INS_PDF_Modal_Title = 'Create Video';
            this.ASR_GEN_INS_PDF_Modal_Btn = 'Create';
            this.ASR_GEN_INS_PDF_Assign_Status = true;
            $(function () {
                $('#TickGen_INS_PDF_Modal').modal();
                $('.dropify').dropify();
            });
        }
    }

    public Hide_ASR_GEN_INS_PDF_Modal() {
        $(function () {
            $('#TickGen_INS_PDF_Modal').modal('hide');
            $('#GenInsPDFForm').trigger('reset');
            $('.dropify-clear').click();
            let drEvent = $('.dropify').dropify();
            drEvent = drEvent.data('dropify');
            drEvent.resetPreview();
            drEvent.clearElement();
        });
    }

    get uvideoList(): FormArray {
        return this.unassignVideoForm.get('uvideoList') as FormArray;
    };

    public Load_ASR_GEN_INS_PDF_Unassign_List(ASOM_ID) {
        const formData = new FormData();
        formData.append('accID', this.AccScltID);
        formData.append('modelID', this.ModelScltID);
        formData.append('asomID', ASOM_ID);
        this.asrmService.Load_UnAssigned_GEN_INS_PDF_Part(formData).subscribe(
            data => {
                this.UnassignGenPDF = data;
                const unassignVideo_Array = [];
                for (const uvideo of this.UnassignGenPDF) {
                    unassignVideo_Array.push(this.fb.group({
                        isChosen: false,
                        Video_Name: uvideo.AGGIPDF_Name,
                        Video_KeyID: uvideo.AGIPDF_KeyID
                    }));
                }
                this.unassignVideoForm = this.fb.group({
                    uvideoList: this.fb.array(unassignVideo_Array)
                });
            }
        );
    }

    public Assign_ASR_GEN_INS_PDF(): void {
        const items = this.unassignVideoForm.value;
        this.SelectedVideoList = items.uvideoList.filter(x => x.isChosen).map(x => {
            return {name: x.Video_Name, id: x.Video_KeyID};
        });
        this.SelectedVideoList.forEach(
            data => {
                const formData = new FormData();
                formData.append('agipdfmID', data.id);
                formData.append('asomID', this.solScltID);
                this.asrmService.assign_ASR_GEN_INS_PDF(formData).subscribe(
                    resultData => {
                        let response: any;
                        response = resultData;
                        if (response.result === 'success') {
                            this.Load_ASR_GEN_INS_PDF(this.solScltID);
                            this.Load_ASR_GEN_INS_PDF_Unassign_List(this.solScltID);
                        }
                    }
                );
            }
        );
        $(function () {
            $('#TickGen_INS_PDF_Modal').modal('hide');
        });
        swal({
            title: 'Assigned!',
            text: 'Video Assigned Successfully',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });
    }

    public TickShow_ASR_GEN_INS_PDF_Edit_modal(GPDF_ID) {
        this.asrmService.Load_ASR_GEN_INS_PDF_Details(GPDF_ID).subscribe(
            data => {
                this.ASR_GEN_INS_PDF_Sclt_ID = data.AGIPDF_KeyID;
                this.GEN_INS_PDF_Sclt_ID = data.AGIPDF_GIPDF_KeyID;
                this.GenPDFName = data.AGGIPDF_Name;
                this.Gen_Ins_PDF_Form = this.fb.group({
                    'GenPDFName': [this.GenPDFName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                    'GenPDF_File': [null]
                });
                this.ASR_GEN_INS_PDF_Modal_Title = 'Update Video';
                this.ASR_GEN_INS_PDF_Modal_Btn = 'Update';
                this.ASR_GEN_INS_PDF_Assign_Status = false;
                $(function () {
                    $('#TickGen_INS_PDF_Modal').modal();
                    $('.dropify').dropify();
                });
            }
        );
    }

    public Save_ASR_GEN_INS_PDF(value) {
        if (this.ASR_GEN_INS_PDF_Modal_Btn === 'Create') {
            const PDF = this.Gen_Ins_Pdf.nativeElement;
            if (PDF.files && PDF.files[0]) {
                this.GenPDF_File = PDF.files[0];
            }
            const genPDFFile: File = this.GenPDF_File;
            const formData: FormData = new FormData();
            formData.append('ASOM_ID', this.solScltID);
            formData.append('name', value.GenPDFName);
            formData.append('gen_ins_PDF_File', genPDFFile, genPDFFile.name);
            this.asrmService.create_ASR_GEN_INS_PDF(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Load_ASR_GEN_INS_PDF(this.solScltID);
                        this.Hide_ASR_GEN_INS_PDF_Modal();
                        swal({
                            title: 'Created!',
                            text: 'Video Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        } else if (this.ASR_GEN_INS_PDF_Modal_Btn === 'Update') {
            const formData: FormData = new FormData();
            if (value.GenPDF_File === null) {
                formData.append('ASOM_ID', this.solScltID);
                formData.append('AGPDF_ID', this.ASR_GEN_INS_PDF_Sclt_ID);
                formData.append('gen_pdf_id', this.GEN_INS_PDF_Sclt_ID);
                formData.append('name', value.GenPDFName);
                this.asrmService.update_ASR_GEN_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            this.Load_ASR_GEN_INS_PDF(this.solScltID);
                            this.Hide_ASR_GEN_INS_PDF_Modal();
                            swal({
                                title: 'Updated!',
                                text: 'Video Updated Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            } else {
                const PDF = this.Gen_Ins_Pdf.nativeElement;
                if (PDF.files && PDF.files[0]) {
                    this.GenPDF_File = PDF.files[0];
                }
                const genPDFFile: File = this.GenPDF_File;
                formData.append('ASOM_ID', this.solScltID);
                formData.append('AGPDF_ID', this.ASR_GEN_INS_PDF_Sclt_ID);
                formData.append('gen_pdf_id', this.GEN_INS_PDF_Sclt_ID);
                formData.append('name', value.GenPDFName);
                formData.append('gen_ins_PDF_File', genPDFFile, genPDFFile.name);
                this.asrmService.update_ASR_GEN_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            this.Load_ASR_GEN_INS_PDF(this.solScltID);
                            this.Hide_ASR_GEN_INS_PDF_Modal();
                            swal({
                                title: 'Updated!',
                                text: 'Video Updated Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            }
        }
    }

    public TickDelete_Acc_GEN_INS_PDF(GPDF_ID) {
        const formData = new FormData();
        formData.append('asomID', this.solScltID);
        formData.append('agipdfmID', GPDF_ID);
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This video will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function () {
                that.asrmService.Delete_ASR_GEN_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_ASR_GEN_INS_PDF(that.solScltID);
                            swal({
                                title: 'Deleted!',
                                text: 'Video Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }

    public TickshowImage(ImageName) {
        this.Image_Path = GlobalVariable.BASE_FILE_API + 'uploads/service_request/ins_list/' + ImageName;
        $(function () {
            $('#TickImageModel').modal();
        });
    }

    public TickshowVideo(pdfName) {
        this.Video_Path = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API + 'uploads/service_request/Gen_ins/' + pdfName);
        $(function () {
            $('#TickVideoModel').modal();
        });
    }

    Loadbuttons() {
        this.menu.Loadbutton(2, 7, this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add = this.Asssubbutton[0].MA_Add;
                this.edit = this.Asssubbutton[0].MA_Edit;
                this.delete = this.Asssubbutton[0].MA_Delete;
                this.viewbtn = this.Asssubbutton[0].MA_View;
            }
        );

    }

    public SelectedPart(PartID) {
        this.SelectedPartArray.push({'partID': PartID});
    }
}

