import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ContactCardComponent } from "./contact-card.component";
import { ContactService } from "../services/contact.service";
import {signal, Signal, WritableSignal } from "@angular/core";
import { Contact } from "../services/contact.modal";

describe("Contact Card component", () => {

    let component: ContactCardComponent;
    let fixture: ComponentFixture<ContactCardComponent>;
    let service: ContactService;
    let contactListSignal: WritableSignal<Contact[]>

    beforeEach( async () => {

        contactListSignal = signal([
            {id:1, name:'john doe', mobile:'8701369370', email: 'john@gmail.com'},
            {id:2, name:'mosh hemadani', mobile: '7931336278', email: 'hemadani@gmail.com'}
        ])

        await TestBed.configureTestingModule({
            providers: [
                ContactCardComponent,
                {
                provide: ContactService,
                useValue: {
                    contactList:() => contactListSignal(),
                    deleteContact: jasmine.createSpy('deleteContact')
                }
            }]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactCardComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ContactService);
        fixture.detectChanges();
    })

    it("Should create ContactCardComponent", () => {
        expect(component).toBeTruthy();
    })

    // it("Should required the contact input", async () => {
    //     const mockContact = {id:1, name:'john doe', mobile:'8701369370', email: 'john@gmail.com'}
    //     fixture.componentRef.setInput('contact', mockContact);
    //     fixture.detectChanges();
    //     await fixture.whenStable();
    //     expect(component.contact()).toEqual(mockContact)
    // })

    it("Should delete the contact number", () => {
        const expectedMockContact = [
            {id:1, name:'john doe', mobile:'8701369370', email: 'john@gmail.com'}
        ]

        spyOn(service, 'deleteContact').and.callFake((id: number) => {
            contactListSignal.set(contactListSignal().filter((i) => i.id !== id))
        });
        component.deleteNumber(2)
        expect(service.deleteContact).toHaveBeenCalledWith(2);
        expect(service.contactList()).toEqual(expectedMockContact)
    })

})