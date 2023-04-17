import { Component, OnInit } from '@angular/core';
import { AssetData, assetData } from './../../model';
import { PageChangeEvent } from "@progress/kendo-angular-pager";
import * as moment from 'moment';

@Component({
  selector: 'app-blank.component',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit {

  public assetData = assetData;
  public pageSize = 8;
  public skip = 0;
  public pagedDestinations:AssetData[]=[];
  public total = this.assetData.length;

  constructor() { }

  ngOnInit(): void { 
    this.statusBarRange();
    console.log(this.assetData)
    this.pageData();
  }
  statusBarRange(){
  
    this.assetData.forEach(asset=>{
     if(!asset.nextInspectionDate){
      asset.progressValue=0;
      return;
     }
     let startDate:number = +new Date(asset.lastInspectionDate);
     let endDate :number= +new Date(asset.nextInspectionDate);
     let todayDate=new Date();
     todayDate.setHours(0,0,0,0);
     startDate=+(startDate?startDate:todayDate);
     let diffDays:number = (endDate - startDate) / (1000 * 60 * 60 * 24); 
     let diffFromToday:number=(endDate - todayDate.getTime()) / (1000 * 60 * 60 * 24); 
     var percentage=(diffFromToday/diffDays)*100;
     asset.progressValue=percentage;
     var statusBarRange=100-percentage;
     if(statusBarRange<=70){
       asset.progressColor='#2ecc71';
     }
     else if(statusBarRange>70 && statusBarRange<=99){
       asset.progressColor='#f39c12';
     }
     else{
       asset.progressColor='#da3a3a';
       asset.progressValue=5;
     }
    });
  }
  public onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;
    this.pageData();
  }

  private pageData(): void {
    this.pagedDestinations = this.assetData.slice(
      this.skip,
      this.skip + this.pageSize
    );
  }

 

}
