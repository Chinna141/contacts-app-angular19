import { Component, input, signal } from '@angular/core';
import { ContactCardComponent } from '../contact-card/contact-card.component';

@Component({
  selector: 'app-contact-list',
  imports: [ContactCardComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
    contactList = signal([
      {id:1, name:'chinna', mobile:'9010333141'},
      {id:2, name:'sukanya', mobile: '9063033141'}
    ])
    contact = input.required<any>();

    
}
