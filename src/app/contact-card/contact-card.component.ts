import { Component, input } from '@angular/core';

@Component({
  selector: 'app-contact-card',
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  contact = input.required<any>();
}
