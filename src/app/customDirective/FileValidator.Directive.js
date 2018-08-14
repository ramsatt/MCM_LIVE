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
var FileValidatorDirective = FileValidatorDirective_1 = (function () {
    function FileValidatorDirective() {
    }
    FileValidatorDirective.validate = function (c) {
        return c.value == null || c.value.length === 0 ? { 'required': true } : null;
    };
    FileValidatorDirective.prototype.validate = function (c) {
        return FileValidatorDirective_1.validate(c);
    };
    return FileValidatorDirective;
}());
FileValidatorDirective = FileValidatorDirective_1 = __decorate([
    core_1.Directive({
        selector: '[required-file]',
        providers: [
            { provide: forms_1.NG_VALIDATORS, useExisting: FileValidatorDirective_1, multi: true },
        ]
    })
], FileValidatorDirective);
exports.FileValidatorDirective = FileValidatorDirective;
var FileValidatorDirective_1;
