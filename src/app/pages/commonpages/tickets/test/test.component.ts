import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TicketService } from '../service/ticket.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    orderForm: FormGroup;
    items: any;
    constructor(private ticketService: TicketService, private formBuilder: FormBuilder) {
        this.orderForm = this.formBuilder.group({
            customerName: '',
            email: '',
            items: this.formBuilder.array([ this.createItem() ])
        });
    }

    ngOnInit() {
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
            name: '',
            description: '',
            price: ''
        });
    }

    addItem(): void {
        this.items = this.orderForm.get('items') as FormArray;
        this.items.push(this.createItem());
    }
}
