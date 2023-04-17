import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  constructor() { }
  @Input()
  public stepperData:any;
  @Input() public currentStep=0;
  ngOnInit(): void {
    this.onSteperChange.emit(0);
  }
 
  @Output() onSteperChange = new EventEmitter<number>();
  
  currentStepChange(event:number){
    this.onSteperChange.emit(event);
  }

}
