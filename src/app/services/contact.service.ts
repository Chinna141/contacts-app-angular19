import { Injectable, signal } from "@angular/core";
import { Contact } from "./contact.modal";

@Injectable({
    providedIn: 'root'
}) 

export class ContactService {



    contactList = signal([
      {id:1, name:'john doe', mobile:'8701369370', email: 'john@gmail.com'},
      {id:2, name:'mosh hemadani', mobile: '7931336278', email: 'hemadani@gmail.com'}
    ])




    updateContactInfo = signal<any>(null);

    addNewContact(contact: any){
        this.contactList.update(prev => [...prev, contact])
    }

    updateContact(getContact: any, getId: number){
        //const objIndex = this.contactList().findIndex(contact => contact.id == getContact.id);

        const update = this.contactList().map((contact) => {
            if(contact.id == getId){
                return {...contact, id: getId, name: getContact.name, mobile:getContact.mobile, email:getContact.email }
            } else{
                return contact
            }
        })

        console.log(update)

        this.contactList.set(update)

    }

    deleteContact(id: number){
        const filteredItem = this.contactList().filter((con) => con.id !== id);
        console.log(filteredItem)
        this.contactList.set(filteredItem)
    }
}