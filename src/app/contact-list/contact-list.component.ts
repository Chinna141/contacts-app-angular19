import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-list',
  imports: [ContactCardComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
    contactList = signal<any>([]);
    contact = input.required<any>();
    

    private contactService = inject(ContactService);

    constructor(){
      effect(() => {
        const updatedList = this.contactService.contactList();
        this.contactList.set(updatedList);
      })
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      //this.contactList.set(this.contactService.contactList());
    }

    
    
}
