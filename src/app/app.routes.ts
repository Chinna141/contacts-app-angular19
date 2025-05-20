import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NewContactComponent } from './new-contact/new-contact.component';

export const routes: Routes = [
    {
        path: '',
        component: ContactListComponent,
        pathMatch: 'full'
    },
    {
        path: 'contacts',
        component: ContactListComponent
    },
    {
        path: 'newcontact',
        component: NewContactComponent
    }
];
