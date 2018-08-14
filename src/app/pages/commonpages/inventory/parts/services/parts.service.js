"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var global_1 = require("../../../../../global/global");
var PartsService = (function () {
    function PartsService(http) {
        this.http = http;
    }
    PartsService.prototype.CreateParts = function (partname, mfgpartnumber, model, internalcost, price, internalnotes, description, img, createdby) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/createparts&partname=' + encodeURIComponent(partname) + '&mfgpartnumber=' + encodeURIComponent(mfgpartnumber) + '&model=' + encodeURIComponent(model) + '&internalcost=' + encodeURIComponent(internalcost) + '&price=' + encodeURIComponent(price) + '&internalnotes=' + encodeURIComponent(internalnotes) + '&description=' + encodeURIComponent(description) + '&img=' + encodeURIComponent(img) + '&createdby=' + encodeURIComponent(createdby);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.LoadParts = function () {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/part';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.EditParts = function (id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/part&id=' + id;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.updateParts = function (partname, mfgpartnumber, model, internalcost, price, internalnotes, description, img, id) {
        var input = new FormData();
        input.append("file", img);
        input.append("partname", partname);
        input.append("mfgpartnumber", mfgpartnumber);
        input.append("model", model);
        input.append("internalcost", internalcost);
        input.append("price", price);
        input.append("internalnotes", internalnotes);
        input.append("description", description);
        input.append("pm_id", id);
        // let url = GlobalVariable.BASE_API_URL+'partsmaster/updateparts&partname='+ encodeURIComponent(partname)+'&mfgpartnumber='+encodeURIComponent(mfgpartnumber)+'&model='+encodeURIComponent(model)+'&internalcost='+encodeURIComponent(internalcost)+'&price='+encodeURIComponent(price)+'&internalnotes='+encodeURIComponent(internalnotes)+'&description='+encodeURIComponent(description)+'&img='+encodeURIComponent(img)+'&pm_id='+encodeURIComponent(id);
        // let response = this.http.get(url).map(res => res.json());
        //return response;
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/updateparts';
        var response = this.http.post(url, input).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.DelParts = function (id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/deleteparts&id=' + id;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.Loadallparts = function (id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/viewallparts&id=' + id;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.Assignpart = function (id, kit, pm_id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/assignpart&id=' + id + '&pm_id=' + pm_id + '&kit=' + kit;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.Assignedparts = function (id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/viewassignedpart&id=' + id;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.viewsupplier = function () {
        var url = global_1.GlobalVariable.BASE_API_URL + 'suppliermaster/supplier';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.Assignedsuppliers = function (id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/viewassignedsupplier&id=' + id;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.Loadallsupplier = function (id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/viewallsuppliers&id=' + id;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    /*Assignsupplier(id,pm_id,qnty)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/assignsupplier&id='+id+'&pm_id='+pm_id+'&qnty='+qnty;
        let response = this.http.get(url).map(res => res.json());
        return response;

    }*/
    PartsService.prototype.Assignsupplier = function (form) {
        return this.http.post(global_1.GlobalVariable.BASE_API_URL + 'partsmaster/assignsupplier', form)
            .map(function (res) { return res.json(); });
    };
    PartsService.prototype.Loadallbncparts = function (id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/viewallbncparts&id=' + id;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.UpdatenonPartrequest = function (form) {
        console.log(form);
        /*return this.http.post(GlobalVariable.BASE_API_URL+'herokit/updatenonpartrequest', form)
            .map(res => res.json());*/
        return this.http.post(global_1.GlobalVariable.BASE_API_URL + 'herokit/createmultipartrequest', form)
            .map(function (res) { return res.json(); });
    };
    PartsService.prototype.UpdatenonheroPartrequest = function (form) {
        console.log(form);
        return this.http.post(global_1.GlobalVariable.BASE_API_URL + 'herokit/updatenonpartrequest', form)
            .map(function (res) { return res.json(); });
        //return this.http.post(GlobalVariable.BASE_API_URL+'herokit/createmultipartrequest', form)
        //  .map(res => res.json());
    };
    PartsService.prototype.Assignbncpart = function (form) {
        //let url = GlobalVariable.BASE_API_URL+'partsmaster/assignbncpart&id='+id+'&pm_id='+pm_id;
        //let response = this.http.get(url).map(res => res.json());
        //return response;
        return this.http.post(global_1.GlobalVariable.BASE_API_URL + 'partsmaster/assignbncpart', form)
            .map(function (res) { return res.json(); });
    };
    PartsService.prototype.Assignedbncparts = function (id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/viewassignedbncpart&id=' + id;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.Assignedbranchpopupparts = function (type, bncid, old) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'herokit/viewassignedbranchpart&bncid=' + bncid + '&type=' + encodeURIComponent(type) + '&oldid=' + encodeURIComponent(old);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.LoadGoogleMapAddress = function (city) {
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.partbncaccsuplist = function (partid, branchid, type) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'herokit/viewnonaccsuppbnc&partid=' + encodeURIComponent(partid) + '&bncid=' + encodeURIComponent(branchid) + '&type=' + encodeURIComponent(type);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    PartsService.prototype.updateRepl = function (qty, rpdid) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'partsmaster/updatesupct&qty=' + qty + '&rpdid=' + rpdid;
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    return PartsService;
}());
PartsService = __decorate([
    core_1.Injectable()
], PartsService);
exports.PartsService = PartsService;
