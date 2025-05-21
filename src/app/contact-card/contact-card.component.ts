import { Component, inject, input } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  contact = input.required<any>();
  private contactService = inject(ContactService);
  private router = inject(Router);

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  deleteNumber(id: number){
    this.contactService.deleteContact(id)
  }

  editContact(contact: any){
    this.contactService.updateContactInfo.set(contact);
    this.router.navigate(['/newcontact'])
  }

}
