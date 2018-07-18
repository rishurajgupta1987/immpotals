import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../shared/app.service';
import { Customer } from '../shared/customer.model';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalCustomers: any;
  orderNumber: number;
  dbCustomers: any;
  messageSuccess: boolean = false;
  customerStatus: boolean = false;
  Qty: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private appservice: AppService, private router: Router) {
    this.appservice.getAllCustomers().subscribe(dbCustomers => {
      this.totalCustomers = dbCustomers.length;
      this.dbCustomers = dbCustomers;
    });
  }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    $("#bookingDueDate").datepicker({
      beforeShow: function (inputElem, inst) {
        var zi = Number($(inputElem).closest('.modal').css('z-index'));
        $(inputElem).css('z-index', zi + 1);
      },
      dateFormat: "dd/mm/yy",
      onSelect: function (dateText) {
        $("#dueDate").val(dateText);
      }
    });
  }



  orderRequestForm = new FormGroup({
    orderNumber: new FormControl(),
    bookingDate: new FormControl(),
    custContact: new FormControl('', [Validators.required]),
    custName: new FormControl(),
    bookingDueDate: new FormControl(),
    totalAmount: new FormControl('', [Validators.required]),
    advanceAmount: new FormControl(''),
    balanceAmount: new FormControl(),
    kpQty: new FormControl(''),
    pantQty: new FormControl(''),
    shirtQty: new FormControl(''),
    coatQty: new FormControl(''),
    jacketQty: new FormControl(''),
    suitQty: new FormControl(''),
    safariQty: new FormControl('')
  });

  convertDate() {
    var d = new Date();
    var curr_date = d.getDate();
    var formattedDate = curr_date < 10 ? '0' + curr_date : curr_date;
    var curr_month = d.getMonth() + 1;
    var formattedMonth = curr_month < 10 ? '0' + curr_month : curr_month;
    var curr_year = d.getFullYear();
    var currentDate = formattedDate + "/" + formattedMonth + "/" + curr_year;
    return currentDate;
  }

  showOrdersModal() {
    let options = {
      keyboard: false,
      backdrop: 'static'
    };
    $("#inHouseOrderModal").modal(options);
  }


  applyDefaultValues() {
    this.router.navigateByUrl('/bodyView');
    let options = {
      keyboard: false,
      backdrop: 'static'
    };
    $("#orderModal").modal(options);
    var currentDate = this.convertDate();
    this.orderNumber = Math.floor((Math.random() * 100000) + 1);
    this.orderRequestForm.controls['orderNumber'].setValue(JSON.stringify(this.orderNumber));
    this.orderRequestForm.controls['bookingDate'].setValue(currentDate);

  }


  calcBalance() {
    let total = this.orderRequestForm.get('totalAmount').value;
    let advance = this.orderRequestForm.get('advanceAmount').value;
    let balance = total - advance;
    this.orderRequestForm.controls['balanceAmount'].setValue(balance);
  }

  validateCustomer() {
    let contactNumberEntered = this.orderRequestForm.get('custContact').value;
    let validateFlag = false;
    this.dbCustomers.forEach(element => {
      if (contactNumberEntered == element.custContact) {
        validateFlag = true;
        this.orderRequestForm.controls['custName'].setValue(element.custName);
      }
    });
    return validateFlag;
  }

  createOrder(order) {
    if (this.validateCustomer()) {
      var dueDate = $("#dueDate").val();
      order.bookingDueDate = dueDate;
      order.status = "In-progress";
      this.appservice.createNewOrder(order);
      this.orderRequestForm.reset();
      $("#orderModal").modal("hide");
      this.messageSuccess = true;
      setTimeout(() => {
        this.messageSuccess = false;
      }, 3000);
    }
    else {
      this.customerStatus = true;
    }
  }

  reset() {
    this.orderRequestForm.reset();

  }

  refresh() {
    window.location.reload();
  }


}
