import { ComponentFixture, TestBed } from "@angular/core/testing"
import { ContactCardComponent } from "./contact-card.component";
import { ContactService } from "../services/contact.service";

describe("Contact Card component", () => {

    let component: ContactCardComponent;
    let fixture: ComponentFixture<ContactCardComponent>;

    beforeEach( async() => {
        await TestBed.configureTestingModule({
            imports:[],
            providers: [ContactService]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactCardComponent);
        component = fixture.componentInstance;
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

})