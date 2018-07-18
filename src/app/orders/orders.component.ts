import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/app.service';
import { Subscription } from 'rxjs/Subscription';
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  firstSubscription: Subscription;
  selectedOrderNumber: any;
  messageSuccess: boolean = false;
  constructor(private appservice: AppService) {

    this.firstSubscription = this.appservice.getAllOrders().subscribe(dbOrders => {
      //Orders DataTable
      var table = null;
      table = $('#orderTable').DataTable({
        "data": dbOrders,
        "order": [[ 4, "asc" ]],
        "columns": [
          { "data": "orderNumber" },
          { "data": "bookingDate" },
          { "data": "custContact" },
          { "data": "custName" },
          { "data": "bookingDueDate" },
          { "data": "totalAmount" },
          { "data": "advanceAmount" },
          { "data": "balanceAmount" },
          { "data": "status" }

        ],
        "columnDefs": [{
          "targets": [1],
          "visible": false,
          "searchable": false
        },
        {
          "targets": [1],
          "visible": false,
          "searchable": false
        },
        {
          "targets": [5],
          "visible": false,
          "searchable": false
        },
        {
          "targets": [6],
          "visible": false,
          "searchable": false
        },
        {
          "targets": [7],
          "visible": false,
          "searchable": false
        }
        ]
      });

      setTimeout(() => {
        $("select").css("color", "black");
        $("[type*='search']").css("color", "black");
      }, 2000);

      $('#orderTable tbody').on('click', 'tr', function () {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $("#orderDetails").modal('show');
        var selectedOrder = table.row(this).data();
        $("#orderNumber").html(selectedOrder.orderNumber);
        $("#bookingDateDiv").html(selectedOrder.bookingDate);
        $("#custContact").html(selectedOrder.custContact);
        $("#custName").html(selectedOrder.custName);
        $("#bookingDueDateDiv").html(selectedOrder.bookingDueDate);
        $("#totalAmount").html(selectedOrder.totalAmount);
        $("#advanceAmount").html(selectedOrder.advanceAmount);
        $("#balanceAmount").html(selectedOrder.balanceAmount);
        $("#status").html(selectedOrder.status);

        var orderItems = [];
        if (selectedOrder.shirtQty) {
          var itemObject: any = {};
          itemObject.type = "Shirt";
          itemObject.qty = selectedOrder.shirtQty;
          orderItems.push(itemObject);
        }
        if (selectedOrder.pantQty) {
          var itemObject: any = {};
          itemObject.type = "Pant";
          itemObject.qty = selectedOrder.pantQty;
          orderItems.push(itemObject);
        }

        if (selectedOrder.coatQty) {
          var itemObject: any = {};
          itemObject.type = "Coat";
          itemObject.qty = selectedOrder.coatQty;
          orderItems.push(itemObject);
        }
        if (selectedOrder.suitQty) {
          var itemObject: any = {};
          itemObject.type = "Suit";
          itemObject.qty = selectedOrder.suitQty;
          orderItems.push(itemObject);
        }
        if (selectedOrder.jacketQty) {
          var itemObject: any = {};
          itemObject.type = "Jacket";
          itemObject.qty = selectedOrder.jacketQty;
          orderItems.push(itemObject);
        }
        if (selectedOrder.kpQty) {
          var itemObject: any = {};
          itemObject.type = "KP";
          itemObject.qty = selectedOrder.kpQty;
          orderItems.push(itemObject);
        }
        if (selectedOrder.safariQty) {
          var itemObject: any = {};
          itemObject.type = "Safari";
          itemObject.qty = selectedOrder.safariQty;
          orderItems.push(itemObject);
        }
        var html = [];
        for (var i = 0; i < orderItems.length; i++) {
          html.push('<li>' + orderItems[i].type + ' : ' + orderItems[i].qty + '</li>');
        }
        $("#orderItems").html(html.join(""));
      });
    });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.firstSubscription.unsubscribe();
  }

  cancelOrder() {
    var orderNumber = $("#orderNumber").html();
    this.selectedOrderNumber = orderNumber;
    var result = confirm("Are you Sure, You want to Cancel this Order?");
    if (result) {
      this.appservice.cancelOrder(this.selectedOrderNumber);
      $("#orderDetails").modal('hide');
      this.messageSuccess = true;

      setTimeout(() => {
        this.messageSuccess = false;
      }, 3000);
    }
  }

  deliverOrder() {
    var orderNumber = $("#orderNumber").html();
    var result = confirm("Are you Sure, You want to Deliver?");
    if (result) {
      this.appservice.deliverOrder(orderNumber);
      $("#orderDetails").modal('hide');
      this.messageSuccess = true;
      setTimeout(() => {
        this.messageSuccess = false;
      }, 3000);
    }




  }




}
