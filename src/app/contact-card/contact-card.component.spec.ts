import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ContactCardComponent } from "./contact-card.component";
import { ContactService } from "../services/contact.service";
import { inject } from "@angular/core";
import { of } from "rxjs";
import { Contact } from "../services/contact.modal";

describe("Contact Card component", () => {

    let component: ContactCardComponent;
    let fixture: ComponentFixture<ContactCardComponent>;
    let service: ContactService

    beforeEach( async() => {
        await TestBed.configureTestingModule({
            imports:[],
            providers: [ContactService]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactCardComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ContactService);
        fixture.detectChanges();
    })

    it("Should create ContactCardComponent", () => {
        expect(component).toBeTruthy();
    })

    it("Should required the contact input", async () => {
        const mockContact = {id:1, name:'john doe', mobile:'8701369370', email: 'john@gmail.com'}
        fixture.componentRef.setInput('contact', mockContact);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.contact()).toEqual(mockContact)
    })

    it("Should delete the contact number", () => {
        const mockContact: Contact[] = [
            {id:1, name:'john doe', mobile:'8701369370', email: 'john@gmail.com'},
            {id:2, name:'mosh hemadani', mobile: '7931336278', email: 'hemadani@gmail.com'}
        ]
        const expectedMockContact: Contact[] = [
            {id:1, name:'john doe', mobile:'8701369370', email: 'john@gmail.com'}
        ]

        spyOn(service, 'deleteContact').and.returnValue(of(expectedMockContact));
        component.deleteNumber(2)
        expect(service.deleteContact).toHaveBeenCalledWith(2);

    })

})