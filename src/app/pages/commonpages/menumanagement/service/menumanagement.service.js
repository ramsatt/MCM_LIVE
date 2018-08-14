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
var global_1 = require("../../../../global/global");
var MenumanagementService = (function () {
    function MenumanagementService(http) {
        this.http = http;
    }
    MenumanagementService.prototype.Loadmenu = function () {
        var url = global_1.GlobalVariable.BASE_API_URL + 'menuassignment/primarymenu';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    MenumanagementService.prototype.Loadsubmenu = function (ucmid, id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'menuassignment/viewsubmenu&id=' + encodeURIComponent(id) + '&ucmid=' + encodeURIComponent(ucmid);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    MenumanagementService.prototype.Loadcheckmenu = function (ucmid, id) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'menuassignment/viewsubmenu1&id=' + encodeURIComponent(id) + '&ucmid=' + encodeURIComponent(ucmid);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    MenumanagementService.prototype.updatemenu = function (form) {
        console.log(form);
        return this.http.post(global_1.GlobalVariable.BASE_API_URL + 'menuassignment/assignmenu', form)
            .map(function (res) { return res.json(); });
    };
    MenumanagementService.prototype.LoadMainenu = function (pid) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'menuassignment/loadprimarymenu&primaryid=' + encodeURIComponent(pid);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    MenumanagementService.prototype.Loadbutton = function (menuid, submenuid, ucmid) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'menuassignment/viewbutton&menuid=' + encodeURIComponent(menuid) + '&submenuid=' + encodeURIComponent(submenuid) + '&ucmid=' + encodeURIComponent(ucmid);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    MenumanagementService.prototype.Loaduserrorle = function () {
        var url = global_1.GlobalVariable.BASE_API_URL + 'menuassignment/loaduserrole';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    MenumanagementService.prototype.Loadusercategory = function (usercategory) {
        var url = global_1.GlobalVariable.BASE_API_URL + 'menuassignment/loadusercatagory&catid=' + encodeURIComponent(usercategory);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    MenumanagementService.prototype.Loadchildmenu = function (menuid, child) {
        var sessid = localStorage.getItem('ucmid');
        var url = global_1.GlobalVariable.BASE_API_URL + 'menuassignment/loadsubmenu&id=' + encodeURIComponent(menuid) + '&child=' + encodeURIComponent(child) + '&sessionid=' + encodeURIComponent(sessid);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    return MenumanagementService;
}());
MenumanagementService = __decorate([
    core_1.Injectable()
], MenumanagementService);
exports.MenumanagementService = MenumanagementService;
