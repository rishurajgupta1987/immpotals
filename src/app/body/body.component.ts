import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../shared/app.service';
import { HeaderComponent } from '../header/header.component';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Customer } from '../shared/customer.model';

declare var $: any;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers: [HeaderComponent]
})
export class BodyComponent implements OnInit {
  showExistingSection: boolean = false;
  showFeatureDiv: boolean = false;
  messageSuccess: boolean = false;
  messageError: boolean = false;
  customerNotFound: boolean = false;

  customers: Customer[];
  selectedCustomer: any = "";


  constructor(private appservice: AppService) {
    this.appservice.getAllCustomers().subscribe(dbCustomers => {
      this.customers = dbCustomers;
      //console.log(this.customers);
    });
  }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }



  //GLOBAL FORMS ---START
  newCustomerRequestForm = new FormGroup({
    custName: new FormControl('', [Validators.pattern('^[A-Z a-z]*$'), Validators.required, Validators.maxLength(30)]),
    custContact: new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.required, Validators.maxLength(10)]),
    custAddress: new FormControl('', [Validators.pattern('^[A-Z a-z0-9. ]*$'), Validators.maxLength(100)])
  });

  existingCustomerRequestForm = new FormGroup({
    seachNumber: new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.required, Validators.maxLength(10)]),
  });

  shirtRequestForm = new FormGroup({
    L: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    C: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    W: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    S: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    A: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    N: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    LU: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    LL: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    fit: new FormControl('select'),
    design: new FormControl('select'),
    pipingColor: new FormControl(''),
    stitch: new FormControl('select'),
    button: new FormControl('select')
  });


  kudtaRequestForm = new FormGroup({
    L: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    C: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    W: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    S: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    A: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    N: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    kera: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    kamar: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    collar: new FormControl('select'),
    ban: new FormControl('select'),
    pocket: new FormControl('select')
  });


  pajamaRequestForm = new FormGroup({
    L: new FormControl('', [Validators.pattern('^[0-9.]*$')]),
    B: new FormControl('', [Validators.pattern('^[0-9.]*$')]),
    W: new FormControl('', [Validators.pattern('^[0-9.]*$')]),
    H: new FormControl('', [Validators.pattern('^[0-9.]*$')]),
    IL: new FormControl('', [Validators.pattern('^[0-9.]*$')]),
    pocket: new FormControl('select'),
    type: new FormControl('select')
  });

  jacketRequestForm = new FormGroup({
    type: new FormControl('select'),
    pattern: new FormControl('select')
  });



  pantRequestForm = new FormGroup({
    L: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    W: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    H: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    IL: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    B: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    fit: new FormControl('select'),
    pocketType: new FormControl('select'),
    plateType: new FormControl('select'),
    backPocket: new FormControl('select')
  });


  coatRequestForm = new FormGroup({
    L: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    C: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    W: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    S: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    A: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    N: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    B: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    LB: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    type: new FormControl('select'),
    design: new FormControl('select'),
    collar: new FormControl('select'),
    basket: new FormControl('select'),
    button: new FormControl('select'),
    cut: new FormControl('select')
  });

  safariRequestForm = new FormGroup({
    L: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    C: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    W: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    S: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    A: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    N: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    B: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    LB: new FormControl('', [Validators.pattern('^[0-9.]*$'), Validators.required]),
    type: new FormControl('select'),
    design: new FormControl('select'),
    collar: new FormControl('select'),
    basket: new FormControl('select'),
    button: new FormControl('select'),
    cut: new FormControl('select')
  });


  //GLOBAL FORMS ---END

  showNewCustModal() {
    $("#addNewCust").modal("show");
  }

  showAllFeatures(search) {
    this.appservice.getCustomerById(search.seachNumber).subscribe(dbCustomer => {
      if (!dbCustomer) {
        this.customerNotFound = true;
        setTimeout(() => {
          this.customerNotFound = false;
        }, 3000);
      } else {
        this.selectedCustomer = dbCustomer;
        this.showFeatureDiv = true;
        this.setValuestoAllForms();
        setTimeout(() => {
          this.customerNotFound = false;
        }, 3000);
      }
    });
  }

  setValuestoAllForms() {
    this.existingCustomerRequestForm.reset();
    //Set Shirt Measurement
    this.shirtRequestForm.controls['L'].setValue(this.selectedCustomer.custSubscriptions.shirt.L);
    this.shirtRequestForm.controls['C'].setValue(this.selectedCustomer.custSubscriptions.shirt.C);
    this.shirtRequestForm.controls['W'].setValue(this.selectedCustomer.custSubscriptions.shirt.W);
    this.shirtRequestForm.controls['S'].setValue(this.selectedCustomer.custSubscriptions.shirt.S);
    this.shirtRequestForm.controls['A'].setValue(this.selectedCustomer.custSubscriptions.shirt.A);
    this.shirtRequestForm.controls['N'].setValue(this.selectedCustomer.custSubscriptions.shirt.N);
    this.shirtRequestForm.controls['LU'].setValue(this.selectedCustomer.custSubscriptions.shirt.LU);
    this.shirtRequestForm.controls['LL'].setValue(this.selectedCustomer.custSubscriptions.shirt.LL);
    this.shirtRequestForm.controls['fit'].setValue(this.selectedCustomer.custSubscriptions.shirt.fit);
    this.shirtRequestForm.controls['design'].setValue(this.selectedCustomer.custSubscriptions.shirt.design);
    this.shirtRequestForm.controls['pipingColor'].setValue(this.selectedCustomer.custSubscriptions.shirt.pipingColor);
    this.shirtRequestForm.controls['stitch'].setValue(this.selectedCustomer.custSubscriptions.shirt.stitch);
    this.shirtRequestForm.controls['button'].setValue(this.selectedCustomer.custSubscriptions.shirt.button);

    //Set Pant Measurement
    this.pantRequestForm.controls['L'].setValue(this.selectedCustomer.custSubscriptions.pant.L);
    this.pantRequestForm.controls['W'].setValue(this.selectedCustomer.custSubscriptions.pant.W);
    this.pantRequestForm.controls['H'].setValue(this.selectedCustomer.custSubscriptions.pant.H);
    this.pantRequestForm.controls['IL'].setValue(this.selectedCustomer.custSubscriptions.pant.IL);
    this.pantRequestForm.controls['B'].setValue(this.selectedCustomer.custSubscriptions.pant.B);
    this.pantRequestForm.controls['fit'].setValue(this.selectedCustomer.custSubscriptions.pant.fit);
    this.pantRequestForm.controls['plateType'].setValue(this.selectedCustomer.custSubscriptions.pant.plateType);
    this.pantRequestForm.controls['pocketType'].setValue(this.selectedCustomer.custSubscriptions.pant.pocketType);
    this.pantRequestForm.controls['backPocket'].setValue(this.selectedCustomer.custSubscriptions.pant.backPocket);

    
    //Set Kudta Measurement
    this.kudtaRequestForm.controls['L'].setValue(this.selectedCustomer.custSubscriptions.kudta.L);
    this.kudtaRequestForm.controls['C'].setValue(this.selectedCustomer.custSubscriptions.kudta.C);
    this.kudtaRequestForm.controls['W'].setValue(this.selectedCustomer.custSubscriptions.kudta.W);
    this.kudtaRequestForm.controls['S'].setValue(this.selectedCustomer.custSubscriptions.kudta.S);
    this.kudtaRequestForm.controls['A'].setValue(this.selectedCustomer.custSubscriptions.kudta.A);
    this.kudtaRequestForm.controls['N'].setValue(this.selectedCustomer.custSubscriptions.kudta.N);
    this.kudtaRequestForm.controls['kera'].setValue(this.selectedCustomer.custSubscriptions.kudta.kera);
    this.kudtaRequestForm.controls['kamar'].setValue(this.selectedCustomer.custSubscriptions.kudta.kamar);
    this.kudtaRequestForm.controls['collar'].setValue(this.selectedCustomer.custSubscriptions.kudta.collar);
    this.kudtaRequestForm.controls['ban'].setValue(this.selectedCustomer.custSubscriptions.kudta.ban);
    this.kudtaRequestForm.controls['pocket'].setValue(this.selectedCustomer.custSubscriptions.kudta.pocket);

    //Set Pajama Measurement
    this.pajamaRequestForm.controls['L'].setValue(this.selectedCustomer.custSubscriptions.pajama.L);
    this.pajamaRequestForm.controls['B'].setValue(this.selectedCustomer.custSubscriptions.pajama.B);
    this.pajamaRequestForm.controls['W'].setValue(this.selectedCustomer.custSubscriptions.pajama.W);
    this.pajamaRequestForm.controls['H'].setValue(this.selectedCustomer.custSubscriptions.pajama.H);
    this.pajamaRequestForm.controls['IL'].setValue(this.selectedCustomer.custSubscriptions.pajama.IL);
    this.pajamaRequestForm.controls['type'].setValue(this.selectedCustomer.custSubscriptions.pajama.type);
    this.pajamaRequestForm.controls['pocket'].setValue(this.selectedCustomer.custSubscriptions.pajama.pocket);

    //Set Jacket Measurement
    this.jacketRequestForm.controls['type'].setValue(this.selectedCustomer.custSubscriptions.jacket.type);
    this.jacketRequestForm.controls['pattern'].setValue(this.selectedCustomer.custSubscriptions.jacket.pattern);


    //Set Coat Measurement
    this.coatRequestForm.controls['L'].setValue(this.selectedCustomer.custSubscriptions.coat.L);
    this.coatRequestForm.controls['C'].setValue(this.selectedCustomer.custSubscriptions.coat.C);
    this.coatRequestForm.controls['W'].setValue(this.selectedCustomer.custSubscriptions.coat.W);
    this.coatRequestForm.controls['S'].setValue(this.selectedCustomer.custSubscriptions.coat.S);
    this.coatRequestForm.controls['A'].setValue(this.selectedCustomer.custSubscriptions.coat.A);
    this.coatRequestForm.controls['N'].setValue(this.selectedCustomer.custSubscriptions.coat.N);
    this.coatRequestForm.controls['B'].setValue(this.selectedCustomer.custSubscriptions.coat.B);
    this.coatRequestForm.controls['LB'].setValue(this.selectedCustomer.custSubscriptions.coat.LB);
    this.coatRequestForm.controls['type'].setValue(this.selectedCustomer.custSubscriptions.coat.type);
    this.coatRequestForm.controls['design'].setValue(this.selectedCustomer.custSubscriptions.coat.design);
    this.coatRequestForm.controls['collar'].setValue(this.selectedCustomer.custSubscriptions.coat.collar);
    this.coatRequestForm.controls['basket'].setValue(this.selectedCustomer.custSubscriptions.coat.basket);
    this.coatRequestForm.controls['button'].setValue(this.selectedCustomer.custSubscriptions.coat.button);
    this.coatRequestForm.controls['cut'].setValue(this.selectedCustomer.custSubscriptions.coat.cut);

    //Set Safari Measurement
    this.safariRequestForm.controls['L'].setValue(this.selectedCustomer.custSubscriptions.safari.L);
    this.safariRequestForm.controls['C'].setValue(this.selectedCustomer.custSubscriptions.safari.C);
    this.safariRequestForm.controls['W'].setValue(this.selectedCustomer.custSubscriptions.safari.W);
    this.safariRequestForm.controls['S'].setValue(this.selectedCustomer.custSubscriptions.safari.S);
    this.safariRequestForm.controls['A'].setValue(this.selectedCustomer.custSubscriptions.safari.A);
    this.safariRequestForm.controls['N'].setValue(this.selectedCustomer.custSubscriptions.safari.N);
    this.safariRequestForm.controls['B'].setValue(this.selectedCustomer.custSubscriptions.safari.B);
    this.safariRequestForm.controls['LB'].setValue(this.selectedCustomer.custSubscriptions.safari.LB);
    this.safariRequestForm.controls['type'].setValue(this.selectedCustomer.custSubscriptions.safari.type);
    this.safariRequestForm.controls['design'].setValue(this.selectedCustomer.custSubscriptions.safari.design);
    this.safariRequestForm.controls['collar'].setValue(this.selectedCustomer.custSubscriptions.safari.collar);
    this.safariRequestForm.controls['basket'].setValue(this.selectedCustomer.custSubscriptions.safari.basket);
    this.safariRequestForm.controls['button'].setValue(this.selectedCustomer.custSubscriptions.safari.button);
    this.safariRequestForm.controls['cut'].setValue(this.selectedCustomer.custSubscriptions.safari.cut);

    //Set KP Measurement


  }


  //Rest Method
  resetMethod() {
    this.shirtRequestForm.controls['fit'].setValue("select");
    this.shirtRequestForm.controls['design'].setValue("select");
    this.shirtRequestForm.controls['stitch'].setValue("select");
    this.shirtRequestForm.controls['button'].setValue("select");

    this.pantRequestForm.controls['fit'].setValue("select");
    this.pantRequestForm.controls['plateType'].setValue("select");
    this.pantRequestForm.controls['pocketType'].setValue("select");
    this.pantRequestForm.controls['backPocket'].setValue("select");


    this.kudtaRequestForm.controls['collar'].setValue("select");
    this.kudtaRequestForm.controls['ban'].setValue("select");
    this.kudtaRequestForm.controls['pocket'].setValue("select");

    this.pajamaRequestForm.controls['pocket'].setValue("select");
    this.pajamaRequestForm.controls['type'].setValue("select");

    this.jacketRequestForm.controls['type'].setValue("select");
    this.jacketRequestForm.controls['pattern'].setValue("select");

    this.coatRequestForm.controls['type'].setValue("select");
    this.coatRequestForm.controls['design'].setValue("select");
    this.coatRequestForm.controls['collar'].setValue("select");
    this.coatRequestForm.controls['basket'].setValue("select");
    this.coatRequestForm.controls['button'].setValue("select");
    this.coatRequestForm.controls['cut'].setValue("select");

    this.safariRequestForm.controls['type'].setValue("select");
    this.safariRequestForm.controls['design'].setValue("select");
    this.safariRequestForm.controls['collar'].setValue("select");
    this.safariRequestForm.controls['basket'].setValue("select");
    this.safariRequestForm.controls['button'].setValue("select");
    this.safariRequestForm.controls['cut'].setValue("select");

  }


  //Add new Customer
  addNewCustomer(newCustomer: Customer) {
    newCustomer.custSubscriptions = {};
    this.shirtRequestForm.reset();
    this.pantRequestForm.reset();
    this.kudtaRequestForm.reset();
    this.pajamaRequestForm.reset();
    this.jacketRequestForm.reset();
    this.coatRequestForm.reset();
    this.safariRequestForm.reset();
    this.resetMethod();
    newCustomer.custSubscriptions.shirt = this.shirtRequestForm.value;
    newCustomer.custSubscriptions.pant = this.pantRequestForm.value;
    newCustomer.custSubscriptions.kudta = this.kudtaRequestForm.value;
    newCustomer.custSubscriptions.pajama = this.pajamaRequestForm.value;
    newCustomer.custSubscriptions.coat = this.coatRequestForm.value;
    newCustomer.custSubscriptions.safari = this.safariRequestForm.value;

    //Service Method Call for Add Customer
    this.appservice.addNewCustomer(newCustomer);
    this.newCustomerRequestForm.reset();
    $("#addNewCust").modal("hide");
    this.messageSuccess = true;
    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);
  }


  associateShirt(newShirt) {
    //Below line is updating Shirt Object to new values
    this.selectedCustomer.custSubscriptions.shirt = newShirt;
    this.appservice.updateCustomerMethod(this.selectedCustomer, this.selectedCustomer.custContact);
    this.shirtRequestForm.reset();
    $("#shirtModal").modal('hide');
    this.messageSuccess = true;
    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);
  }

  associatePant(newPant) {
    //Below line is updating Pant Object to new values
    this.selectedCustomer.custSubscriptions.pant = newPant;
    this.appservice.updateCustomerMethod(this.selectedCustomer, this.selectedCustomer.custContact);
    this.pantRequestForm.reset();
    $("#pantModal").modal('hide');
    this.messageSuccess = true;
    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);
  }

  associateKurta(newKudta) {
    //Below line is updating Kudta Object to new values
    this.selectedCustomer.custSubscriptions.kudta = newKudta;
    this.appservice.updateCustomerMethod(this.selectedCustomer, this.selectedCustomer.custContact);
    this.kudtaRequestForm.reset();
    $("#kudtaModal").modal('hide');
    this.messageSuccess = true;
    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);
  }

  associatePajama(newPajama) {
    //Below line is updating Pajama Object to new values
    this.selectedCustomer.custSubscriptions.pajama = newPajama;
    this.appservice.updateCustomerMethod(this.selectedCustomer, this.selectedCustomer.custContact);
    this.pajamaRequestForm.reset();
    $("#pajamaModal").modal('hide');
    this.messageSuccess = true;
    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);
  }

  associateJacket(newJacket) {
    //Below line is updating Jacket Object to new values
    this.selectedCustomer.custSubscriptions.jacket = newJacket;
    this.appservice.updateCustomerMethod(this.selectedCustomer, this.selectedCustomer.custContact);
    this.jacketRequestForm.reset();
    $("#jacketModal").modal('hide');
    this.messageSuccess = true;
    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);
  }


  associateCoat(newCoat) {
    //Below line is updating Coat Object to new values
    this.selectedCustomer.custSubscriptions.coat = newCoat;
    this.appservice.updateCustomerMethod(this.selectedCustomer, this.selectedCustomer.custContact);
    this.coatRequestForm.reset();
    $("#coatModal").modal('hide');
    this.messageSuccess = true;
    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);
  }

  associateSafari(newSafari) {
    //Below line is updating Safari Object to new values
    this.selectedCustomer.custSubscriptions.safari = newSafari;
    this.appservice.updateCustomerMethod(this.selectedCustomer, this.selectedCustomer.custContact);
    this.safariRequestForm.reset();
    $("#safariModal").modal('hide');
    this.messageSuccess = true;
    setTimeout(() => {
      this.messageSuccess = false;
    }, 3000);
  }



}
