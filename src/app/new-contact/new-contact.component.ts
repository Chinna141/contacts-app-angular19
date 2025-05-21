import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Contact } from '../services/contact.modal';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-new-contact',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss'
})
export class NewContactComponent {

    invalidForm = signal<boolean>(false);
    editContact = signal<any>(null);
    private contactService = inject(ContactService);
    private router = inject(Router);

    contactForm = new FormGroup({
      name: new FormControl('',{validators: [Validators.required]}),
      mobile: new FormControl('', {validators: [Validators.required, Validators.pattern("^[0-9]{10}$"), Validators.maxLength(10)]}),
      email: new FormControl('', {validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]})
    })

    constructor() {
      effect(() => {
        this.editContact.set(this.contactService.updateContactInfo());

        if(this.editContact()){
          this.contactForm.setValue({
            name: this.editContact().name,
            mobile: this.editContact().mobile,
            email: this.editContact().email
          })
        }
        

      })
    }

    contactSubmit(){

      if(this.contactForm.invalid){
        this.invalidForm.set(true)
      } else{

        if(this.editContact()){
          this.contactService.updateContact(this.contactForm.value, this.editContact().id);
          this.router.navigate(['/contacts']);
          this.editContact.set(null)
        } else{
          const idGenarate = Date.now().toString();
          const formInfo = ({...this.contactForm.value, id: +idGenarate});
          this.contactService.addNewContact(formInfo);
          this.router.navigate(['/contacts'])
          console.log(formInfo)  
        }
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
