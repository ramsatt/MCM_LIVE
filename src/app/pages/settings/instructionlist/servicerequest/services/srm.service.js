"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/Rx");
var global_1 = require("../../../../../global/global");
var SrmService = (function () {
    function SrmService(http) {
        this.http = http;
    }
    /* Service request */
    SrmService.prototype.LoadSR = function () {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_sr';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.LoadSRDetails = function (SrID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_sr_details';
        var response = this.http.post(url, { 'srID': SrID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.createSR = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/create_sr';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.UpdateSR = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/update_sr';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.DeleteSR = function (SrID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/delete_sr';
        var response = this.http.post(url, { 'srID': SrID }).map(function (res) { return res.json(); });
        return response;
    };
    /* Known Issues */
    SrmService.prototype.LoadKI = function (SR_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_ki';
        var response = this.http.post(url, { 'srID': SR_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.LoadKIDetails = function (Ki_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_ki_details';
        var response = this.http.post(url, { 'ki_ID': Ki_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.createKI = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/create_ki';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.UpdateKI = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/update_ki';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.DeleteKI = function (Ki_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/delete_ki';
        var response = this.http.post(url, { 'ki_id': Ki_ID }).map(function (res) { return res.json(); });
        return response;
    };
    /* Solutions */
    SrmService.prototype.LoadSOL = function (KI_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_sol';
        var response = this.http.post(url, { 'kiID': KI_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.LoadSOLDetails = function (sol_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_sol_details';
        var response = this.http.post(url, { 'sol_ID': sol_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.createSOL = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/create_sol';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.UpdateSOL = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/update_sol';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.DeleteSOL = function (sol_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/delete_sol';
        var response = this.http.post(url, { 'sol_ID': sol_ID }).map(function (res) { return res.json(); });
        return response;
    };
    /* Parts */
    SrmService.prototype.LoadParts = function (sol_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_parts';
        var response = this.http.post(url, { 'sol_ID': sol_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.LoadUnassigned_Parts = function (sol_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_unassign_part';
        var response = this.http.post(url, { 'sol_ID': sol_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.LoadPartDetails = function (sol_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_sol_details';
        var response = this.http.post(url, { 'sol_ID': sol_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.AssignPart = function (Sol_ID, partID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/assign_parts';
        return this.http.post(url, { 'sol_ID': Sol_ID, 'part_ID': partID }).map(function (res) { return res.json(); });
    };
    SrmService.prototype.UnassignPart = function (part_ID, sol_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/unassign_part';
        var response = this.http.post(url, { 'part_ID': part_ID, 'sol_ID': sol_ID }).map(function (res) { return res.json(); });
        return response;
    };
    /* Instruction */
    SrmService.prototype.LoadINS = function (SOL_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_ins';
        var response = this.http.post(url, { 'solID': SOL_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.LoadINSDetails = function (ins_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_ins_details';
        var response = this.http.post(url, { 'ins_ID': ins_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.createINS = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/create_ins';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.UpdateINS = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/update_ins';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.DeleteINS = function (ins_id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/delete_ins';
        var response = this.http.post(url, { 'ins_ID': ins_id }).map(function (res) { return res.json(); });
        return response;
    };
    /* Instruction PDF */
    SrmService.prototype.LoadINS_PDF = function (SOL_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_ins_pdf';
        var response = this.http.post(url, { 'solID': SOL_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.LoadINSPDFDetails = function (ins_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_ins_pdf_details';
        var response = this.http.post(url, { 'ins_PDF_ID': ins_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.createINS_PDF = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/create_ins_pdf';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.UpdateINS_PDF = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/update_ins_pdf';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.DeleteINS_PDF = function (ins_Pdf_id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/delete_ins_pdf';
        var response = this.http.post(url, { 'ins_PDF_ID': ins_Pdf_id }).map(function (res) { return res.json(); });
        return response;
    };
    /* General Instruction PDF */
    SrmService.prototype.Load_Gen_Ins_PDF = function (SOL_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_gen_ins_pdf';
        var response = this.http.post(url, { 'solID': SOL_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.Load_gen_INS_PDF_Details = function (ins_ID) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/load_gen_ins_pdf_details';
        var response = this.http.post(url, { 'GEN_INS_PDF_ID': ins_ID }).map(function (res) { return res.json(); });
        return response;
    };
    SrmService.prototype.create_Gen_INS_PDF = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/create_gen_ins_pdf';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.Update_Gen_INS_PDF = function (formData) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/update_gen_ins_pdf';
        return this.http.post(url, formData).map(function (res) { return res.json(); });
    };
    SrmService.prototype.Delete_Gen_INS_PDF = function (pdf_id, sol_id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'srm/delete_gen_ins_pdf';
        var response = this.http.post(url, { 'pdfID': pdf_id, 'solID': sol_id }).map(function (res) { return res.json(); });
        return response;
    };
    return SrmService;
}());
SrmService = __decorate([
    core_1.Injectable()
], SrmService);
exports.SrmService = SrmService;
