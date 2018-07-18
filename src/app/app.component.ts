import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  messageError: boolean = false;
  constructor() {
  }

  ngOnInit() {
    
    let options = {
      keyboard: false,
      backdrop: 'static'
    };

    if (localStorage.getItem("code") == "2358") {
      $("#login").modal("hide");
    }
    else {
      $("#login").modal(options);
      $('[data-toggle="tooltip"]').tooltip();
    }

  }


  authRequestForm = new FormGroup({
    code: new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.required, Validators.maxLength(4)]),
  });

  login(loginObject) {
    if (loginObject.code == '2358') {
      localStorage.setItem("code", "2358");
      $("#login").modal("hide");
    }
    else {
      this.messageError = true;
      setTimeout(() => {
        this.messageError = false;
      }, 3000);
    }
  }

}
