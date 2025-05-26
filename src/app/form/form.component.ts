import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  chipsList = signal<any>([]);

  displayForm = new FormGroup({
    reason: new FormControl('choose', [Validators.required]),
    reasonLabel: new FormControl('', [Validators.required])
  })

  addChip(){
    const getValue = this.displayForm.controls['reasonLabel'].value;
    if(getValue){
      this.chipsList.update(prev => [...prev, getValue]);
      this.displayForm.patchValue({
        reasonLabel: ''
      })
    }
  }

  removeChip(getIndex: number) {
    const getList = [...this.chipsList()]
    getList.splice(getIndex, 1)
    this.chipsList.set(getList);
  }

}
