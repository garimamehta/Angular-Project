import { AfterViewInit, Component, Input } from '@angular/core';
import {  AssetData, AssetStatus } from './../../model';
import { LabelSettings } from "@progress/kendo-angular-progressbar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {

  @Input() public assetData!: AssetData;

  constructor(private router:Router) { }


  public labelSettings: LabelSettings = {
    format: () => ''
  };
  public progressStyles: { [key: string]: string } = {
    background: <string>this.assetData?.progressColor
  };

  // background based on enum value
  getBackground(assetStatus: AssetStatus): string {
    switch (assetStatus) {
      case 'New':
        return 'new';
      case 'PMI Due':
        return 'new';
      case 'Being Inspected':
        return 'being-Inspected';
      case 'Ready for Use':
        return 'ready';
      case 'Idle':
        return 'idle';
      case 'Silver Banded':
        return 'silver';
      case 'PM Failed':
        return 'pm-failed';
      case 'Failed':
        return 'failed';
      default:
        return '';
  }
}
assetHistory(){
  this.router.navigate(['/asset_history'])
}
}
