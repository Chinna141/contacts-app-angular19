import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactCardComponent } from './contact-card.component';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

const mockData = {
  initialContacts: [
      {
        id: 1,
        name: 'john doe',
        mobile: '8701369370',
        email: 'john@gmail.com',
      },
      {
        id: 2,
        name: 'mosh hemadani',
        mobile: '7931336278',
        email: 'hemadani@gmail.com',
      },
    ],
    expectedMockContact: [
      {
        id: 1,
        name: 'john doe',
        mobile: '8701369370',
        email: 'john@gmail.com',
      },
    ]
}

describe('Contact Card component', () => {
  let component: ContactCardComponent;
  let fixture: ComponentFixture<ContactCardComponent>;
  let service: ContactService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCardComponent],
      providers: [{
        provide: ContactService,
        useValue: {
          updateContactInfo: jasmine.createSpy('updateContactInfo').and.returnValue(mockData.initialContacts[0])
        }
      }, Router],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactCardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ContactService);
    router = TestBed.inject(Router)
  });


  it('Should create ContactCardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Should required the contact input', async () => {
    fixture.componentRef.setInput('contact', mockData.expectedMockContact[0]);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.contact()).toEqual(mockData.expectedMockContact[0]);
  });

  

  it('Should delete the contact number', () => {
    service.contactList.set(mockData.initialContacts);
    spyOn(service, 'deleteContact').and.callFake((id: number) => {
      service.contactList.set(service.contactList().filter((i) => i.id !== id));
    });

    fixture.componentRef.setInput('contact', mockData.initialContacts[0]);

    fixture.detectChanges();
    component.deleteNumber(2);
    expect(service.deleteContact).toHaveBeenCalledWith(2);
    expect(service.contactList()).toEqual(mockData.expectedMockContact);
  });

  it("should call updatedContactinfo with provided contact", () => {
    
    spyOn(service, 'updateContactInfo').and.returnValue(mockData.initialContacts[0]);
    fixture.componentRef.setInput('contact', mockData.initialContacts[0]);
    fixture.detectChanges()

    component.editContact(mockData.initialContacts[0]);
    console.log('Spy calls', service.updateContactInfo);
    expect(service.updateContactInfo).toHaveBeenCalledWith(mockData.initialContacts[0])
  })

  it("should navigate to /newcontact", () => {
    component.editContact(mockData.initialContacts[0]);
    expect(router.navigate).toHaveBeenCalledWith(['/newcontact'])
  })

});
