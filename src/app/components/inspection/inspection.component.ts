import { Component, OnInit } from '@angular/core';
// import { Stepper } from '../stepper/model/stepper';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {

  constructor() { }
  stepperData: any = [
    { label: "Visual Inspection ",isValid:true,status:'comple' },
    { label: "Connecton checks" ,isValid:true,status:'comple' },
    { label: "Thickness check" }
  ]
  currentStep = 0;
  familyTypes = [
    {name: "SHOW ALL FAMILY",id: null},
    { id: 1, name: "Type1" },
    { id: 2, name: "Type2" }
  ];
  steps = [
    {name: "SHOW ALL STEPS",id: null},
    { id: 1, name: "Step1" },
    { id: 2, name: "Step2" }
  ];
  itemList = [
    {
      title: "TESTSN-19",
      description: "VISUAL INSPECTION"
    },
    {
      title: "TESTSN-2",
      description: "REVIEW PHASE"
    },
    {
      title: "TESTSN-21",
      description: "VISUAL INSPECTION"
    },
    {
      title: "TESTSN-17",
      description: "REVIEW PHASE"
    }
  ]
  inspectionStartDate:any;
  inspectionEndDate:any;
  ngOnInit(): void {
  }
  saveResult(result: string) {
    const currentSteper=this.stepperData[this.currentStep];
    currentSteper.isValid=result=="Pass"?true:false;
    if(!currentSteper.labelOriginal){
      currentSteper.labelOriginal=currentSteper.label;
    }
    currentSteper.label=currentSteper.labelOriginal +" "+result;
    currentSteper.result=result;
  }
  continueNextStep() {
    this.currentStep += 1;
    console.log(this.currentStep);
  }

  currentStepChange(event:number){
    this.currentStep=event;
  }
}
