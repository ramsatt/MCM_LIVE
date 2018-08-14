"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var global_1 = require("../../../../global/global");
var FileValidator_Directive_1 = require("../../../../customDirective/FileValidator.Directive");
var ServicerequestComponent = (function () {
    function ServicerequestComponent(fb, srmService, partService, menu) {
        this.fb = fb;
        this.srmService = srmService;
        this.partService = partService;
        this.menu = menu;
        this.ServiceRequestArray = [];
        this.KnownIssueArray = [];
        this.SolutionsArray = [];
        this.PartsArray = [];
        this.AssignedPartsArray = [];
        this.InstructionPDFAarray = [];
        /* Service Request */
        this.srScltID = '';
        this.srName = '';
        this.srDescription = '';
        this.srStatus = '';
        this.srModelTitle = '';
        this.srModelButtonpri = '';
        this.srModelButtonsec = 'Cancel';
        this.kiScltID = '';
        this.kiName = '';
        this.kiModelTitle = '';
        this.kiModelButtonpri = '';
        /* Solutions */
        this.solModalTitle = '';
        this.solModalBtnPri = '';
        this.solScltID = '';
        this.solName = '';
        this.InstructionArray = [];
        this.InsName = '';
        this.InsDesc = '';
        this.InsModalTitle = '';
        this.InsModalBtnPri = '';
        this.insScltID = '';
        this.InsPdfName = '';
        this.InsPDFStatus = '';
        this.InsPDFModalTitle = '';
        this.InsPDFModalBtn = '';
        this.insPDFScltID = '';
        /* Video */
        this.GeneralInstructionPDFArry = [];
        this.GenPDFName = '';
        this.VideoModalTitle = '';
        this.GenPDFModelBtn = '';
        this.genInsPDFScltID = '';
        /* PDF File Modal */
        this.PDFModalTitle = '';
        this.PDF_PATH = '';
        this.Image_Path = '';
        this.Video_Path = '';
        this.userID = '';
        this.sessid = localStorage.getItem('ucmid');
        this.userID = localStorage.getItem('ucmid');
        this.Loadbuttons();
        this.SR_Form = this.fb.group({
            'srName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
            'srDescription': [null, forms_1.Validators.compose([forms_1.Validators.minLength(10), forms_1.Validators.maxLength(1500)])],
            'srStatus': ['NO', forms_1.Validators.required]
        });
        this.KI_Form = this.fb.group({
            'kiName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(1500)])]
        });
        this.SOL_Form = this.fb.group({
            'solName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(1500)])]
        });
        this.INS_Form = this.fb.group({
            'InsName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
            'InsDesc': [null, forms_1.Validators.compose([forms_1.Validators.minLength(10), forms_1.Validators.maxLength(1500)])],
        });
        this.INS_PDF_Form = this.fb.group({
            'InsPdfName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
            'InsPDFStatus': ['NO', forms_1.Validators.required],
            'InsPDF_File': [null, FileValidator_Directive_1.FileValidatorDirective.validate]
        });
        this.Gen_Ins_PDF_Form = this.fb.group({
            'GenPDFName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
            'GenPDF_File': [null, FileValidator_Directive_1.FileValidatorDirective.validate]
        });
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
    }
    ServicerequestComponent.prototype.ngOnInit = function () {
        this.LoadAllSR();
        $(function () {
            $('.mediatec-cleanvideoplayer').cleanvideoplayer();
            $('.mediatec-cleanaudioplayer').cleanaudioplayer();
            $('#example1').DataTable({
                paging: true,
                searching: true,
            });
        });
        $(function () {
            $('.dropify-clear').click(function () {
                var drEvent = $('.dropify').dropify();
                drEvent = drEvent.data('dropify');
                drEvent.resetPreview();
                drEvent.clearElement();
            });
        });
    };
    ServicerequestComponent.prototype.LoadAllSR = function () {
        var _this = this;
        this.srmService.LoadSR().subscribe(function (data) {
            _this.ServiceRequestArray = data;
        });
    };
    ServicerequestComponent.prototype.showCreateSrModel = function () {
        /* Service Request Form */
        this.srModelButtonpri = 'Create';
        this.srModelTitle = 'Create Service Request';
        $(function () {
            $('#CreateSR').modal();
        });
    };
    ServicerequestComponent.prototype.saveSR = function (value) {
        var _this = this;
        if (this.srModelButtonpri === 'Create') {
            var Desc = void 0;
            if (value.srDescription === null) {
                Desc = '';
            }
            else {
                Desc = value.srDescription;
            }
            var formData = new FormData();
            formData.append('srName', value.srName);
            formData.append('srDesc', Desc);
            formData.append('srStatus', value.srStatus);
            formData.append('userID', this.userID);
            this.srmService.createSR(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    _this.hideSrModel();
                    _this.LoadAllSR();
                    swal({
                        title: 'Created!',
                        text: 'Service Request Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
        else if (this.srModelButtonpri === 'Update') {
            var formData = new FormData();
            formData.append('srName', value.srName);
            formData.append('srDesc', value.srDescription);
            formData.append('srStatus', value.srStatus);
            formData.append('srID', this.srScltID);
            this.srmService.UpdateSR(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    _this.hideSrModel();
                    _this.LoadAllSR();
                    swal({
                        title: 'Updated!',
                        text: 'Service Request Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
    };
    ServicerequestComponent.prototype.showEditSrModel = function (SrID) {
        var _this = this;
        this.srScltID = SrID;
        this.srmService.LoadSRDetails(SrID).subscribe(function (data) {
            _this.srName = data.SRM_Name;
            _this.srDescription = data.SRM_Description;
            _this.srStatus = data.SRM_Disable;
            if (_this.srStatus === 'N') {
                _this.srStatus = 'NO';
            }
            else if (_this.srStatus === 'Y') {
                _this.srStatus = 'YES';
            }
            _this.srModelButtonpri = 'Update';
            _this.srModelTitle = 'Update Service Request';
            _this.SR_Form = _this.fb.group({
                'srName': [_this.srName, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
                'srDescription': [_this.srDescription, forms_1.Validators.compose([forms_1.Validators.minLength(10), forms_1.Validators.maxLength(1500)])],
                'srStatus': [_this.srStatus, forms_1.Validators.required]
            });
            $(function () {
                $('#CreateSR').modal();
            });
        });
    };
    ServicerequestComponent.prototype.hideSrModel = function () {
        $(function () {
            $('#CreateSR').modal('hide');
            $('#SRForm').trigger('reset');
        });
    };
    ServicerequestComponent.prototype.DeleteSR = function (SrID) {
        var that = this;
        swal({
            title: 'Are you sure?',
            text: 'This service request will not be able to recover this future!',
            type: 'warning',
            showCancelButton: true,
            cancelButtonClass: 'btn-default',
            confirmButtonClass: 'btn-warning',
            confirmButtonText: 'Delete',
            closeOnConfirm: false
        }, function () {
            that.srmService.DeleteSR(SrID).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    that.LoadAllSR();
                    swal({
                        title: 'Deleted!',
                        text: 'Service Requested Deleted Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
            that.KnownIssueArray = [];
            that.SolutionsArray = [];
            that.AssignedPartsArray = [];
            that.InstructionArray = [];
            that.InstructionPDFAarray = [];
            that.GeneralInstructionPDFArry = [];
            that.srScltID = '';
            that.kiScltID = '';
            that.solScltID = '';
        });
    };
    ServicerequestComponent.prototype.SelectedSR = function (SR_ID) {
        this.srScltID = SR_ID;
        this.LoadAllKI(this.srScltID);
    };
    ServicerequestComponent.prototype.showKICreateModel = function () {
        if (this.srScltID === '') {
            $.notify({
                title: '<strong>Service Request Not Selected.</strong><br>',
                message: 'Please select Service Request.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        }
        else {
            this.kiModelTitle = 'Create Known Issue';
            this.kiModelButtonpri = 'Create';
            $(function () {
                $('#KnownIssue').modal();
            });
        }
    };
    ServicerequestComponent.prototype.hideKIModel = function () {
        $(function () {
            $('#KnownIssue').modal('hide');
            $('#KIForm').trigger('reset');
        });
    };
    ServicerequestComponent.prototype.LoadAllKI = function (SR_ID) {
        var _this = this;
        this.srmService.LoadKI(SR_ID).subscribe(function (data) {
            _this.KnownIssueArray = data;
            _this.SolutionsArray = [];
            _this.AssignedPartsArray = [];
            _this.InstructionArray = [];
            _this.InstructionPDFAarray = [];
            _this.GeneralInstructionPDFArry = [];
            _this.kiScltID = '';
            _this.solScltID = '';
        });
    };
    ServicerequestComponent.prototype.saveKI = function (value) {
        var _this = this;
        if (this.kiModelButtonpri === 'Create') {
            var formData = new FormData();
            formData.append('srID', this.srScltID);
            formData.append('issue', value.kiName);
            formData.append('userID', this.userID);
            this.srmService.createKI(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    _this.hideKIModel();
                    _this.LoadAllKI(_this.srScltID);
                    swal({
                        title: 'Created!',
                        text: 'Known Issue Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
        else if (this.kiModelButtonpri === 'Update') {
            var formData = new FormData();
            formData.append('kiID', this.kiScltID);
            formData.append('issue', value.kiName);
            this.srmService.UpdateKI(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    _this.hideKIModel();
                    _this.LoadAllKI(_this.srScltID);
                    swal({
                        title: 'Updated!',
                        text: 'Known Issue Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
    };
    ServicerequestComponent.prototype.showKIEditModel = function (ki_id) {
        var _this = this;
        this.kiScltID = ki_id;
        this.kiModelTitle = 'Update Known Issue';
        this.kiModelButtonpri = 'Update';
        this.srmService.LoadKIDetails(ki_id).subscribe(function (data) {
            _this.kiName = data.KIM_Known_Issue;
            _this.KI_Form = _this.fb.group({
                'kiName': [_this.kiName, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(1500)])]
            });
            $(function () {
                $('#KnownIssue').modal();
            });
        });
    };
    ServicerequestComponent.prototype.LoadSolutions = function (KI_ID) {
        var _this = this;
        this.kiScltID = KI_ID;
        this.srmService.LoadSOL(KI_ID).subscribe(function (data) {
            _this.SolutionsArray = data;
            _this.AssignedPartsArray = [];
            _this.InstructionArray = [];
            _this.InstructionPDFAarray = [];
            _this.GeneralInstructionPDFArry = [];
            _this.solScltID = '';
        });
    };
    ServicerequestComponent.prototype.DeleteKI = function (ki_id) {
        var that = this;
        swal({
            title: 'Are you sure?',
            text: 'This Known issue will not be able to recover this future!',
            type: 'warning',
            showCancelButton: true,
            cancelButtonClass: 'btn-default',
            confirmButtonClass: 'btn-warning',
            confirmButtonText: 'Delete',
            closeOnConfirm: false
        }, function () {
            that.srmService.DeleteKI(ki_id).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    that.LoadAllKI(that.srScltID);
                    swal({
                        title: 'Deleted!',
                        text: 'Known Issue Deleted Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
            that.SolutionsArray = [];
            that.AssignedPartsArray = [];
            that.InstructionArray = [];
            that.InstructionPDFAarray = [];
            that.GeneralInstructionPDFArry = [];
            that.kiScltID = '';
            that.solScltID = '';
        });
    };
    ServicerequestComponent.prototype.showSolCreateModal = function () {
        this.solModalTitle = 'Create Solution';
        this.solModalBtnPri = 'Create';
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
        }
        else {
            $(function () {
                $('#Solutions').modal();
            });
        }
    };
    ServicerequestComponent.prototype.hideSolModal = function () {
        $(function () {
            $('#Solutions').modal('hide');
            $('#SOLForm').trigger('reset');
        });
    };
    ServicerequestComponent.prototype.SaveSolution = function (value) {
        var _this = this;
        if (this.solModalBtnPri === 'Create') {
            var formData = new FormData();
            formData.append('kiID', this.kiScltID);
            formData.append('sol', value.solName);
            formData.append('sol', value.solName);
            formData.append('userID', this.userID);
            console.log(value);
            this.srmService.createSOL(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    _this.LoadSolutions(_this.kiScltID);
                    _this.hideSolModal();
                    swal({
                        title: 'Created!',
                        text: 'Solution Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
        else if (this.solModalBtnPri === 'Update') {
            var formData = new FormData();
            formData.append('solID', this.solScltID);
            formData.append('solName', value.solName);
            this.srmService.UpdateSOL(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    _this.hideSolModal();
                    _this.LoadSolutions(_this.kiScltID);
                    swal({
                        title: 'Updated!',
                        text: 'Solution Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
    };
    ServicerequestComponent.prototype.showEditSolModel = function (sol_ID) {
        var _this = this;
        this.solModalBtnPri = 'Update';
        this.solModalTitle = 'Update Solution';
        this.srmService.LoadSOLDetails(sol_ID).subscribe(function (data) {
            _this.solScltID = data.SOM_KeyID;
            _this.srName = data.SOM_Solution;
            _this.SOL_Form = _this.fb.group({
                'solName': [_this.srName, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])]
            });
            $(function () {
                $('#Solutions').modal();
            });
        });
    };
    ServicerequestComponent.prototype.DeleteSol = function (sol_id) {
        var that = this;
        swal({
            title: 'Are you sure?',
            text: 'This Solution will not be able to recover this future!',
            type: 'warning',
            showCancelButton: true,
            cancelButtonClass: 'btn-default',
            confirmButtonClass: 'btn-warning',
            confirmButtonText: 'Delete',
            closeOnConfirm: false
        }, function () {
            that.srmService.DeleteSOL(sol_id).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    that.LoadSolutions(that.kiScltID);
                    swal({
                        title: 'Deleted!',
                        text: 'Solution Deleted Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
            that.AssignedPartsArray = [];
            that.InstructionArray = [];
            that.InstructionPDFAarray = [];
            that.GeneralInstructionPDFArry = [];
            that.solScltID = '';
        });
    };
    /* Parts */
    ServicerequestComponent.prototype.LoadParts = function (sol_ID) {
        var _this = this;
        this.solScltID = sol_ID;
        this.srmService.LoadParts(this.solScltID).subscribe(function (data) {
            _this.AssignedPartsArray = data;
        });
    };
    ServicerequestComponent.prototype.showPartModal = function () {
        if (this.solScltID === '') {
            $.notify({
                title: '<strong>Solution Not Selected.</strong><br>',
                message: 'Please select a solution.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        }
        else {
            this.loadUnAssignedParts(this.solScltID);
            $('#Parts').modal();
        }
    };
    ServicerequestComponent.prototype.loadUnAssignedParts = function (sol_id) {
        var _this = this;
        $(function () {
            $('#example1').dataTable().fnDestroy();
        });
        this.srmService.LoadUnassigned_Parts(sol_id).subscribe(function (data) {
            _this.PartsArray = data;
            setTimeout(function () {
                $(function () {
                    $('#example1').DataTable({
                        paging: true,
                        searching: true,
                        order: [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc'], [4, 'asc']],
                        columnDefs: [
                            { 'orderable': false, 'targets': 5 }
                        ]
                    });
                });
            }, 1000);
        });
    };
    ServicerequestComponent.prototype.hidePartModel = function () {
        $(function () {
            $('#Parts').modal('hide');
        });
    };
    ServicerequestComponent.prototype.assignPart = function (partID) {
        var _this = this;
        this.srmService.AssignPart(this.solScltID, partID).subscribe(function (data) {
            var response;
            response = data;
            if (response[0].result === 'success') {
                _this.LoadParts(_this.solScltID);
                _this.loadUnAssignedParts(_this.solScltID);
                swal({
                    title: 'Assigned!',
                    text: 'Part Assigned Successfully',
                    type: 'success',
                    confirmButtonClass: 'btn-success'
                });
            }
        });
    };
    ServicerequestComponent.prototype.unassignPart = function (partID) {
        var that = this;
        swal({
            title: 'Are you sure?',
            text: 'This Part will be Un-assign for this solution!',
            type: 'warning',
            showCancelButton: true,
            cancelButtonClass: 'btn-default',
            confirmButtonClass: 'btn-warning',
            confirmButtonText: 'Un-assign',
            closeOnConfirm: false
        }, function () {
            that.srmService.UnassignPart(partID, that.solScltID).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    that.LoadParts(that.solScltID);
                    swal({
                        title: 'Unassigned!',
                        text: 'Part Unassigned Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        });
    };
    /* Instructions */
    ServicerequestComponent.prototype.LoadIns = function (sol_ID) {
        var _this = this;
        this.srmService.LoadINS(sol_ID).subscribe(function (data) {
            _this.InstructionArray = data;
        });
    };
    ServicerequestComponent.prototype.showInsCreateModal = function () {
        if (this.solScltID === '') {
            $.notify({
                title: '<strong>Solution Not Selected.</strong><br>',
                message: 'Please select a solution.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        }
        else {
            this.InsModalTitle = 'Create Instruction';
            this.InsModalBtnPri = 'Create';
            $(function () {
                $('#InstructionModal').modal();
            });
        }
    };
    ServicerequestComponent.prototype.hideInsModal = function () {
        $(function () {
            $('#InstructionModal').modal('hide');
            $('#INSForm').trigger('reset');
        });
    };
    ServicerequestComponent.prototype.saveInsrtuction = function (value) {
        var _this = this;
        if (this.InsModalBtnPri === 'Create') {
            var Desc = void 0;
            if (value.InsDesc === null) {
                Desc = '';
            }
            else {
                Desc = value.InsDesc;
            }
            var formData = new FormData();
            formData.append('Ins_Name', value.InsName);
            formData.append('Ins_Desc', Desc);
            formData.append('sol_ID', this.solScltID);
            formData.append('userID', this.userID);
            this.srmService.createINS(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    _this.LoadIns(_this.solScltID);
                    _this.hideInsModal();
                    swal({
                        title: 'Created!',
                        text: 'Instruction Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
        else if (this.InsModalBtnPri === 'Update') {
            var formData = new FormData();
            formData.append('Ins_Name', value.InsName);
            formData.append('Ins_Desc', value.InsDesc);
            formData.append('Ins_ID', this.insScltID);
            this.srmService.UpdateINS(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    _this.LoadIns(_this.solScltID);
                    _this.hideInsModal();
                    swal({
                        title: 'Updated!',
                        text: 'Instruction Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
    };
    ServicerequestComponent.prototype.showEditInsModal = function (INS_ID) {
        var _this = this;
        this.insScltID = INS_ID;
        this.InsModalBtnPri = 'Update';
        this.InsModalTitle = 'Update Instruction';
        this.srmService.LoadINSDetails(INS_ID).subscribe(function (data) {
            _this.InsName = data['ILM_Name'];
            _this.InsDesc = data['ILM_Description'];
            _this.INS_Form = _this.fb.group({
                'InsName': [_this.InsName, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
                'InsDesc': [_this.InsDesc, forms_1.Validators.compose([forms_1.Validators.minLength(10), forms_1.Validators.maxLength(1500)])],
            });
            $(function () {
                $('#InstructionModal').modal();
            });
        });
    };
    ServicerequestComponent.prototype.deleteInstruction = function (INS_ID) {
        var that = this;
        swal({
            title: 'Are you sure?',
            text: 'This Instruction will not be able to recover this future!',
            type: 'warning',
            showCancelButton: true,
            cancelButtonClass: 'btn-default',
            confirmButtonClass: 'btn-warning',
            confirmButtonText: 'Delete',
            closeOnConfirm: false
        }, function () {
            that.srmService.DeleteINS(INS_ID).subscribe(function (data) {
                var response;
                response = data;
                if (response[0].result === 'success') {
                    that.LoadIns(that.solScltID);
                    swal({
                        title: 'Deleted!',
                        text: 'Instruction Deleted Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        });
    };
    /* InstructionPDF */
    ServicerequestComponent.prototype.LoadInsPDF = function (SolID) {
        var _this = this;
        this.srmService.LoadINS_PDF(SolID).subscribe(function (data) {
            _this.InstructionPDFAarray = data;
        });
    };
    ServicerequestComponent.prototype.showInsPDFCreateModal = function () {
        if (this.solScltID === '') {
            $.notify({
                title: '<strong>Solution Not Selected.</strong><br>',
                message: 'Please select a solution.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        }
        else {
            this.INS_PDF_Form = this.fb.group({
                'InsPdfName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
                'InsPDFStatus': ['NO', forms_1.Validators.required],
                'InsPDF_File': [null, FileValidator_Directive_1.FileValidatorDirective.validate]
            });
            this.InsPDFModalTitle = 'Create Image';
            this.InsPDFModalBtn = 'Create';
            $(function () {
                $('#InstructionPDF').modal();
                $('.dropify').dropify();
            });
        }
    };
    ServicerequestComponent.prototype.hideInsPDFModal = function () {
        $(function () {
            $('#InstructionPDF').modal('hide');
            $('#INSPDFForm').trigger('reset');
            $('.dropify-clear').click();
            var drEvent = $('.dropify').dropify();
            drEvent.data('dropify');
            drEvent.clearElement();
            drEvent.resetPreview();
        });
    };
    ServicerequestComponent.prototype.saveInstructionPDF = function (value) {
        var _this = this;
        console.log(value);
        if (this.InsPDFModalBtn === 'Create') {
            var PDF = this.Ins_Pdf.nativeElement;
            if (PDF.files && PDF.files[0]) {
                this.InsPDF_File = PDF.files[0];
            }
            var pdfFile = this.InsPDF_File;
            var formData = new FormData();
            formData.append('sol_ID', this.solScltID);
            formData.append('Ins_PDF_Name', value.InsPdfName);
            formData.append('Ins_PDF_Status', value.InsPDFStatus);
            formData.append('ins_PDF_File', pdfFile, pdfFile.name);
            formData.append('userID', this.userID);
            this.srmService.createINS_PDF(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response.result === 'success') {
                    _this.hideInsPDFModal();
                    _this.LoadInsPDF(_this.solScltID);
                    swal({
                        title: 'Created!',
                        text: 'Image Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
        else if (this.InsPDFModalBtn === 'Update') {
            console.log(value);
            var PDF = this.Ins_Pdf.nativeElement;
            if (PDF.files && PDF.files[0]) {
                this.InsPDF_File = PDF.files[0];
            }
            var pdfFile = this.InsPDF_File;
            console.log(value.InsPDF_File);
            if (value.InsPDF_File === null) {
                var formData = new FormData();
                formData.append('sol_ID', this.solScltID);
                formData.append('Ins_PDF_ID', this.insPDFScltID);
                formData.append('Ins_PDF_Name', value.InsPdfName);
                formData.append('Ins_PDF_Status', value.InsPDFStatus);
                this.srmService.UpdateINS_PDF(formData).subscribe(function (data) {
                    var response;
                    response = data;
                    if (response.result === 'success') {
                        _this.hideInsPDFModal();
                        _this.LoadInsPDF(_this.solScltID);
                        swal({
                            title: 'Updated!',
                            text: 'Image Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                });
            }
            else {
                var formData = new FormData();
                formData.append('sol_ID', this.solScltID);
                formData.append('Ins_PDF_ID', this.insPDFScltID);
                formData.append('Ins_PDF_Name', value.InsPdfName);
                formData.append('Ins_PDF_Status', value.InsPDFStatus);
                formData.append('ins_PDF_File', pdfFile, pdfFile.name);
                this.srmService.UpdateINS_PDF(formData).subscribe(function (data) {
                    var response;
                    response = data;
                    if (response.result === 'success') {
                        _this.hideInsPDFModal();
                        _this.LoadInsPDF(_this.solScltID);
                        swal({
                            title: 'Updated!',
                            text: 'Image Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                });
            }
        }
    };
    ServicerequestComponent.prototype.showInsPDFEditModal = function (InsPDF_ID) {
        var _this = this;
        this.insPDFScltID = InsPDF_ID;
        this.InsPDFModalTitle = 'Update Image';
        this.InsPDFModalBtn = 'Update';
        this.srmService.LoadINSPDFDetails(InsPDF_ID).subscribe(function (data) {
            _this.InsPdfName = data.IPDFM_Name;
            _this.InsPDFStatus = data.IPDFM_Primary;
            if (_this.InsPDFStatus === 'Y') {
                _this.InsPDFStatus = 'YES';
            }
            else if (_this.InsPDFStatus === 'N') {
                _this.InsPDFStatus = 'NO';
            }
            _this.INS_PDF_Form = _this.fb.group({
                'InsPdfName': [_this.InsPdfName, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
                'InsPDFStatus': [_this.InsPDFStatus, forms_1.Validators.required],
                'InsPDF_File': [null]
            });
            $(function () {
                $('#InstructionPDF').modal();
                $('.dropify').dropify();
            });
        });
    };
    ServicerequestComponent.prototype.deleteINS_PDF = function (InsPDF_ID) {
        var that = this;
        swal({
            title: 'Are you sure?',
            text: 'This Image will not be able to recover this future!',
            type: 'warning',
            showCancelButton: true,
            cancelButtonClass: 'btn-default',
            confirmButtonClass: 'btn-warning',
            confirmButtonText: 'Delete',
            closeOnConfirm: false
        }, function () {
            that.srmService.DeleteINS_PDF(InsPDF_ID).subscribe(function (data) {
                var response;
                response = data;
                if (response.result === 'success') {
                    that.LoadInsPDF(that.solScltID);
                    swal({
                        title: 'Deleted!',
                        text: 'Image Deleted Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        });
    };
    /* Genera lInstruction PDF */
    ServicerequestComponent.prototype.LoadGenInsPDF = function (sol_id) {
        var _this = this;
        this.srmService.Load_Gen_Ins_PDF(sol_id).subscribe(function (data) {
            _this.GeneralInstructionPDFArry = data;
        });
    };
    ServicerequestComponent.prototype.showGenInsPDFCreateModal = function () {
        if (this.solScltID === '') {
            $.notify({
                title: '<strong>Solution Not Selected.</strong><br>',
                message: 'Please select a solution.'
            }, {
                type: 'danger',
                placement: {
                    from: 'bottom'
                }
            });
        }
        else {
            this.Gen_Ins_PDF_Form = this.fb.group({
                'GenPDFName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
                'GenPDF_File': [null, FileValidator_Directive_1.FileValidatorDirective.validate]
            });
            this.VideoModalTitle = 'Create Video';
            this.GenPDFModelBtn = 'Create';
            $(function () {
                $('#GenInsPDF').modal();
                $('.dropify').dropify();
            });
        }
    };
    ServicerequestComponent.prototype.hideGenInsModal = function () {
        $(function () {
            $('#GenInsPDF').modal('hide');
            $('#GenInsPDFForm').trigger('reset');
            $('.dropify-clear').click();
            var drEvent = $('.dropify').dropify();
            drEvent = drEvent.data('dropify');
            drEvent.resetPreview();
            drEvent.clearElement();
        });
    };
    ServicerequestComponent.prototype.showEditGenInsPDFModal = function (gen_ins_pdf_id) {
        var _this = this;
        this.genInsPDFScltID = gen_ins_pdf_id;
        this.VideoModalTitle = 'Update Video';
        this.GenPDFModelBtn = 'Update';
        this.srmService.Load_gen_INS_PDF_Details(gen_ins_pdf_id).subscribe(function (data) {
            _this.GenPDFName = data.GGIPDF_Name;
            _this.Gen_Ins_PDF_Form = _this.fb.group({
                'GenPDFName': [_this.GenPDFName, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(1500)])],
                'GenPDF_File': [null]
            });
            $(function () {
                $('#GenInsPDF').modal();
                $('.dropify').dropify();
            });
        });
    };
    ServicerequestComponent.prototype.saveGeneralInstructionPDF = function (value) {
        var _this = this;
        if (this.GenPDFModelBtn === 'Create') {
            var PDF = this.Gen_Ins_Pdf.nativeElement;
            if (PDF.files && PDF.files[0]) {
                this.GenPDF_File = PDF.files[0];
            }
            var genPDFFile = this.GenPDF_File;
            var formData = new FormData();
            formData.append('sol_ID', this.solScltID);
            formData.append('name', value.GenPDFName);
            formData.append('gen_ins_PDF_File', genPDFFile, genPDFFile.name);
            formData.append('userID', this.userID);
            this.srmService.create_Gen_INS_PDF(formData).subscribe(function (data) {
                var response;
                response = data;
                if (response.result === 'success') {
                    _this.hideGenInsModal();
                    _this.LoadGenInsPDF(_this.solScltID);
                    swal({
                        title: 'Created!',
                        text: 'Video Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        }
        else if (this.GenPDFModelBtn === 'Update') {
            if (value.GenPDF_File === null) {
                var formData = new FormData();
                formData.append('sol_ID', this.solScltID);
                formData.append('gen_pdf_id', this.genInsPDFScltID);
                formData.append('name', value.GenPDFName);
                this.srmService.Update_Gen_INS_PDF(formData).subscribe(function (data) {
                    var response;
                    response = data;
                    if (response.result === 'success') {
                        _this.hideGenInsModal();
                        _this.LoadGenInsPDF(_this.solScltID);
                        swal({
                            title: 'Updated!',
                            text: 'Video Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                });
            }
            else {
                var PDF = this.Gen_Ins_Pdf.nativeElement;
                if (PDF.files && PDF.files[0]) {
                    this.GenPDF_File = PDF.files[0];
                }
                var genPDFFile = this.GenPDF_File;
                var formData = new FormData();
                formData.append('sol_ID', this.solScltID);
                formData.append('gen_pdf_id', this.genInsPDFScltID);
                formData.append('name', value.GenPDFName);
                formData.append('gen_ins_PDF_File', genPDFFile, genPDFFile.name);
                this.srmService.Update_Gen_INS_PDF(formData).subscribe(function (data) {
                    var response;
                    response = data;
                    if (response.result === 'success') {
                        _this.hideGenInsModal();
                        _this.LoadGenInsPDF(_this.solScltID);
                        swal({
                            title: 'Updated!',
                            text: 'Video Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                });
            }
        }
    };
    ServicerequestComponent.prototype.DeleteGenINSPDF = function (pdf_id) {
        var that = this;
        swal({
            title: 'Are you sure?',
            text: 'This video will not be able to recover this future!',
            type: 'warning',
            showCancelButton: true,
            cancelButtonClass: 'btn-default',
            confirmButtonClass: 'btn-warning',
            confirmButtonText: 'Delete',
            closeOnConfirm: false
        }, function () {
            that.srmService.Delete_Gen_INS_PDF(pdf_id, that.solScltID).subscribe(function (data) {
                var response;
                response = data;
                if (response.result === 'success') {
                    that.LoadGenInsPDF(that.solScltID);
                    swal({
                        title: 'Deleted!',
                        text: 'Video Deleted Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            });
        });
    };
    ServicerequestComponent.prototype.showImage = function (ImageName) {
        this.Image_Path = global_1.GlobalVariable.BASE_FILE_API + 'uploads/service_request/ins_list/' + this.solScltID + '/pdf/' + ImageName;
        $(function () {
            $('#ImageModel').modal();
        });
    };
    ServicerequestComponent.prototype.showVideo = function (pdfName) {
        this.Video_Path = global_1.GlobalVariable.BASE_FILE_API + 'uploads/service_request/Gen_ins/' + this.solScltID + '/pdf/' + pdfName;
        $(function () {
            $('#VideoModel').modal();
        });
    };
    ServicerequestComponent.prototype.Loadbuttons = function () {
        var _this = this;
        this.menu.Loadbutton(12, 83, this.sessid).subscribe(function (data) {
            _this.Asssubbutton = data;
            _this.add = _this.Asssubbutton[0].MA_Add;
            _this.edit = _this.Asssubbutton[0].MA_Edit;
            _this.delete = _this.Asssubbutton[0].MA_Delete;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('site loaded'); });
    };
    return ServicerequestComponent;
}());
__decorate([
    core_1.ViewChild('INS_PDF')
], ServicerequestComponent.prototype, "Ins_Pdf", void 0);
__decorate([
    core_1.ViewChild('GEN_INS_PDF')
], ServicerequestComponent.prototype, "Gen_Ins_Pdf", void 0);
ServicerequestComponent = __decorate([
    core_1.Component({
        selector: 'app-servicerequest',
        templateUrl: './servicerequest.component.html',
        styleUrls: ['./servicerequest.component.scss']
    })
], ServicerequestComponent);
exports.ServicerequestComponent = ServicerequestComponent;
