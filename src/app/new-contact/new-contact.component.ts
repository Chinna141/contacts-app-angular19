import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-contact',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss'
})
export class NewContactComponent {

    invalidForm = signal<boolean>(false);

    contactForm = new FormGroup({
      name: new FormControl('',{validators: [Validators.required]}),
      mobile: new FormControl('', {validators: [Validators.required, Validators.pattern("^[0-9]{10}$"), Validators.maxLength(10)]}),
      email: new FormControl('', {validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]})
    })

    contactSubmit(){

      if(this.contactForm.invalid){
        this.invalidForm.set(true)
      } else{
        this.invalidForm.set(false)
        console.log(this.contactForm.value)  
      }

      
    }



    get nameInvalid () {
      return(
        this.contactForm.controls.name.touched &&
        this.contactForm.controls.name.dirty &&
        this.contactForm.controls.name.invalid
      )
    }

    get mobileInvalid() {
      return(
        this.contactForm.controls.mobile.touched &&
        this.contactForm.controls.mobile.dirty &&
        this.contactForm.controls.mobile.invalid
      ) 
    }

    get emailInvalid() {
      return(
        this.contactForm.controls.email.touched &&
        this.contactForm.controls.email.dirty &&
        this.contactForm.controls.email.invalid
      ) 
    }

}
