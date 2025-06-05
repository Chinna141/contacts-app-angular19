import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-date',
  imports: [],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss'
})
export class DateComponent {

  @ViewChildren('yearItem') yearItems!: QueryList<ElementRef<HTMLElement>>;

  years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017]
  months = ["Jan", "Feb", "Mar", "Apr", 'May', "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 

  selectDate(getDate: number, getElement: HTMLElement){
    console.log(getDate);
    this.setActive(getElement)
  }

  setActive(getElement: HTMLElement){
    this.yearItems.forEach(item => {
      item.nativeElement.classList.remove('selected')
    })
    getElement.classList.add('selected')
  }

}
