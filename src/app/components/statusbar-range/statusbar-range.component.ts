import { Component, Input, OnInit } from '@angular/core';
import { LabelSettings } from "@progress/kendo-angular-progressbar";
@Component({
  selector: 'app-statusbar-range',
  templateUrl: './statusbar-range.component.html',
  styleUrls: ['./statusbar-range.component.scss']
})
export class StatusbarRangeComponent implements OnInit {

  @Input() lastInspectionDate: any;
  @Input() nextInspectionDate: any;
  progressValue: any;
  progressColor: any;
  public labelSettings: LabelSettings = {
    format: () => ''
  };
  public progressStyles: { [key: string]: string } = {

  };
  constructor() { }

  ngOnInit(): void {
    this.showProgressiveBar();
  }
  showProgressiveBar() {
    if (!this.nextInspectionDate) {
      this.progressValue = 0;
      return;
    }
    let startDate: number = +new Date(this.lastInspectionDate);
    let endDate: number = +new Date(this.nextInspectionDate);
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    startDate = +(startDate ? startDate : todayDate);
    let diffDays: number = (endDate - startDate) / (1000 * 60 * 60 * 24);
    let diffFromToday: number = (endDate - todayDate.getTime()) / (1000 * 60 * 60 * 24);
    var percentage = (diffFromToday / diffDays) * 100;
    this.progressValue = percentage;
    var statusBarRange = 100 - percentage;
    if (statusBarRange <= 70) {
      this.progressStyles['background'] = '#2ecc71';
    }
    else if (statusBarRange > 70 && statusBarRange <= 99) {
      this.progressStyles['background'] = '#f39c12';
    }
    else {
      this.progressStyles['background'] = '#da3a3a';
      this.progressValue = 5;
    }
  }

}
