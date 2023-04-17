import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepperActivateEvent } from '@progress/kendo-angular-layout';
import { LabelSettings } from "@progress/kendo-angular-progressbar";
declare var $: any;
@Component({
  selector: 'app-asset-history',
  templateUrl: './asset-history.component.html',
  styleUrls: ['./asset-history.component.scss']
})
export class AssetHistoryComponent implements OnInit {
  constructor(private router: Router) { }
  currentStep = 0;
  assetHistory: Array<any> = [];
  public labelSettings: LabelSettings = {
    format: () => ''
  };
  ngOnInit(): void {
    this.assetHistory = [
      { label: "Asset Recommisoned", iconClass: "fa fa-fingerprint", text: "Major", date: "2023-01-23", viewMore: true, type: "statement" },
      { label: "Asset Decommisoned", iconClass: "fa fa-trash", text: "Major", date: "2023-01-22", viewMore: true, type: "pdf" },
      { label: "Inspection Started", iconClass: "fa fa-wrench", text: "Major", date: "2023-01-20", viewMore: true, type: "steps" },
      { label: "Asset Updated", iconClass: "fa fa-pen", text: "q-check", date: "2023-01-13", viewMore: true, type: "list" },
      { label: "Asset Commmisioned", iconClass: "fa fa-fingerprint", text: "system_rite", date: "2023-01-08" },
      { label: "Asset Created ", iconClass: "fa fa-pen", text: "system_rite", date: "2023-01-01" }
    ];

    // this.currentStep = this.assetHistory?.length;
    this.assetHistory.map((asset: any) => {
      this.calculateDiff(asset);
    })


  }

  stepperRefresh: boolean = false;
 
  backToAsset() {
    this.router.navigate(['/blank']);
  }
  calculateDiff(asset: any) {
    let firstDate = new Date(this.assetHistory[0].date);
    let secondDate = new Date(asset.date);
    secondDate.setDate(secondDate.getDate());
    let differenceInTime = firstDate.getTime() - secondDate.getTime();
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    asset["days"] = differenceInDays;
    return asset;
  }
  toggleShowMore(step: any) {
    step.isExpanded = !step.isExpanded;
    this.refreshStepper();
  }

  refreshStepper() {
    setTimeout(() => {
      this.refreshStepperHeight();
    }, 100)
  }

  timeOutVar: any;
  refreshStepperHeight() {
    if (this.timeOutVar) {
      return;
    }
    const index = this.currentStep;
    this.timeOutVar = setTimeout(() => {
      let curIndTop = $(".k-step-indicator:eq(" + index + ")").offset()?.top || 0;
      let firstIndTop = $(".k-step-indicator:eq(0)").offset()?.top || 0;
      let fullIndElem = $(".stepper .k-progress-status-wrap:eq(0)");
      let fullIndHeight = fullIndElem.height();
      let perc = (Math.abs(firstIndTop - curIndTop) / fullIndHeight) * 100;
      $(".k-selected").height(perc + "%");
      clearTimeout(this.timeOutVar);
      this.timeOutVar = undefined;
    }, 500)
  }

  public activate(e: StepperActivateEvent): void {
    this.currentStep = e.index;
    this.refreshStepperHeight();
  }

  public currentStepChange(e: number): void {
    this.currentStep = e;
    this.refreshStepperHeight();
  }

}
