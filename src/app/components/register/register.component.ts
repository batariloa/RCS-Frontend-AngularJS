import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  form: FormGroup;

  constructor(private api:ApiService, private router:Router, private fb:FormBuilder) {
    this.createForm()
   }

  ngOnInit(): void {
  }

  register(){

    var password = this.form.controls['password'].value
    var email = this.form.controls['email'].value

    if(!this.form.errors){
    this.api.register(email, password).subscribe((result) => {
 
      console.log("Register succesful");
    
      this.router.navigate(['login']);
      // redirect to main page
    }, () => {

    });
  
    }


  }

  createForm() {
    this.form = this.fb.group({
       email: ['', [Validators.required, Validators.email ]],
       password: ['', [Validators.required] ],
       passwordAgain:['', [Validators.required]]
    },
    {validator: this.passwordMatchValidator}
    );
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['passwordAgain'].value ? null : {'mismatch': true};
  }

}
