import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountfilterPipe} from './../account/pipes/accountfilter.pipe';
import {SitePipe} from './../site/pipes/site.pipe';
import {ZipbranchPipe} from './zipbranch.pipe';
import {BranchfilterPipe} from './branchfilter.pipe';
import {PartfilterPipe} from './partfilter.pipe';
import {ModelsPipe} from './models.pipe';
import {ServicerequestPipe} from './servicerequest/servicerequest.pipe';
import {KnownissuePipe} from './knownissue/knownissue.pipe';
import {SolutionPipe} from './solution/solution.pipe';
import {LibraryPipe} from './library/library.pipe';
import {HolidayPipe} from './holiday/holiday.pipe';
import {TicketstatusPipe} from './ticketstatus/ticketstatus.pipe';
import {ShipmentcompanyPipe} from './shipmentcompany/shipmentcompany.pipe';
import {ValuelistPipe} from './valuelist/valuelist.pipe';
import {TechexpPipe} from './valuelist/techexp.pipe';
import {TechsecPipe} from './valuelist/techsec.pipe';
import {TechniciancertificationPipe} from './valuelist/techniciancertification.pipe';
import {SafePipe} from './safe/safe.pipe';
import {AccorderbyPipe} from './accounts/accorderby.pipe';
import {AgreementPipe} from './agreement/agreement.pipe';
import {InstructionPipe} from '../../../filter/instruction/instruction.pipe';
import {InspdfPipe} from '../../../filter/inspdf/inspdf.pipe';
import {GeninspdfPipe} from '../../../filter/geninspdf/geninspdf.pipe';
import {ChecklistfilterPipe} from "../tickets/pipes/checklistfilter.pipe";
import {ChecklistCategoryfilterPipe} from "../tickets/pipes/checklistcategoryfilter.pipe";
import {HerokitPipe} from './herokit/herokit.pipe';
import {SupplierPipe} from './supplier/supplier.pipe';
import {AssetsPipe} from './assets/assets.pipe';
import {AsrPipe} from './accounts/serreq/asr.pipe';
import {AkiPipe} from './accounts/serreq/aki.pipe';
import {AsolPipe} from './accounts/serreq/asol.pipe';
import {AinsPipe} from './accounts/serreq/ains.pipe';
import {AipdfPipe} from './accounts/serreq/aipdf.pipe';
import {AgpdfPipe} from './accounts/serreq/agpdf.pipe';
import {TicketsPipe} from './agreement/tickets.pipe';
import {AcccontactPipe} from './contacts/acccontact.pipe';
import {SitecontactPipe} from './contacts/sitecontact.pipe';
import {BranchcontactPipe} from './contacts/branchcontact.pipe';
import {TechnicianPipe} from './technician/technician.pipe';
import {RaisedrequestPipe} from './raisedrequest/raisedrequest.pipe';
import {ShipmentprocessPipe} from './shipmentprocess/shipmentprocess.pipe';
import {TicketlistPipe} from './ticket/ticketlist.pipe';
import {GrPipe} from './accounting/gr.pipe';
import {UsercategoryPipe} from './usercategory/usercategory.pipe';
import {UserPipe} from './user/user.pipe';
import {OrderbyPipe} from './usercategory/orderby.pipe';
import {ContractPipe} from './contract/contract.pipe';
import {BranchcontractPipe} from './contract/branchcontract.pipe';
import {UseroverviewPipe} from './useroverview/useroverview.pipe';
import {DateconvertPipe} from "../dateconvert.pipe";


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AccountfilterPipe,
        SitePipe,
        ZipbranchPipe,
        BranchfilterPipe,
        PartfilterPipe,
        ModelsPipe,
        ServicerequestPipe,
        KnownissuePipe,
        SolutionPipe,
        LibraryPipe,
        HolidayPipe,
        TicketstatusPipe,
        ShipmentcompanyPipe,
        ValuelistPipe,
        TechexpPipe,
        TechsecPipe,
        TechniciancertificationPipe,
        SafePipe,
        AccorderbyPipe,
        HerokitPipe,
        SupplierPipe,
        AgreementPipe,
        AccorderbyPipe,
        InstructionPipe,
        InspdfPipe,
        GeninspdfPipe,
        AssetsPipe,
        AsrPipe,
        AkiPipe,
        AsolPipe,
        AinsPipe,
        AipdfPipe,
        AgpdfPipe,
        TicketsPipe,
        AcccontactPipe,
        SitecontactPipe,
        BranchcontactPipe,
        TechnicianPipe,
        RaisedrequestPipe,
        ShipmentprocessPipe,
        TicketlistPipe,
        GrPipe,
        UsercategoryPipe,
        UserPipe,
        OrderbyPipe,
        ContractPipe,
        BranchcontractPipe,
        UseroverviewPipe,
        BranchcontractPipe,
        DateconvertPipe,
        ChecklistfilterPipe,
        ChecklistCategoryfilterPipe
    ],
    exports: [
        AccountfilterPipe,
        SitePipe,
        ZipbranchPipe,
        BranchfilterPipe,
        PartfilterPipe,
        ModelsPipe,
        ServicerequestPipe,
        KnownissuePipe,
        SolutionPipe,
        LibraryPipe,
        HolidayPipe,
        TicketstatusPipe,
        ShipmentcompanyPipe,
        TechexpPipe,
        TechsecPipe,
        TechniciancertificationPipe,
        SafePipe,
        HerokitPipe,
        SupplierPipe,
        AccorderbyPipe,
        AgreementPipe,
        AccorderbyPipe,
        InstructionPipe,
        InspdfPipe,
        GeninspdfPipe,
        AssetsPipe,
        AsrPipe,
        AkiPipe,
        AsolPipe,
        AinsPipe,
        AipdfPipe,
        AgpdfPipe,
        TicketsPipe,
        AcccontactPipe,
        SitecontactPipe,
        BranchcontactPipe,
        TechnicianPipe,
        RaisedrequestPipe,
        ShipmentprocessPipe,
        TicketlistPipe,
        GrPipe,
        UsercategoryPipe,
        UserPipe,
        ContractPipe,
        BranchcontractPipe,
        UseroverviewPipe,
        BranchcontractPipe,
        DateconvertPipe,
        ChecklistfilterPipe,
        ChecklistCategoryfilterPipe
    ]
})
export class FilterModule {
}
