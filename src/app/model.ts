export interface AssetData {
  id?:number;
  ownerLocation:string;
  physicalLocation: string;
  fullDescription: string;
  pressureRating: string;
  container: string;
  lastInspectionDate: string;
  nextInspectionDate: string;
  progressColor?:string;
  assetStatus: AssetStatus;
  progressValue:number;
  progressStatus?:boolean;
}

export enum AssetStatus {
  NEW = 'New',
  PM_DUE ='PMI Due',
  BEING_INSPECTED = 'Being Inspected',
  READY_FOR_USE = 'Ready for Use',
  IDLE = 'Idle',
  SILVER_BANED = 'Silver Banded',
  PM_FAILED = 'PM Failed',
  FAILED =  'Failed',
}

export const assetData: AssetData[] = [
  {
    ownerLocation: 'Australia',
    physicalLocation: 'nez',
    fullDescription: 'FMC_ASSET_ATTACH',
    pressureRating: '1520 CWP',
    container: 'UnAssigned',
    lastInspectionDate: '01/07/2023',
    nextInspectionDate: '02/07/2024',
    assetStatus: AssetStatus.NEW,
    progressValue:65
  },
  {
    ownerLocation: 'Australia',
    physicalLocation: 'nez',
    fullDescription: 'FMC_ASSET_ATTACH',
    pressureRating: '1520 CWP',
    container: 'IRON 21',
    lastInspectionDate: '01/30/2023',
    nextInspectionDate: '02/08/2023',
    assetStatus: AssetStatus.PM_DUE,
    progressValue:90
  },
  {
    ownerLocation: 'Australia',
    physicalLocation: 'nez',
    fullDescription: 'FMC_ASSET_ATTACH',
    pressureRating: '120 CWP',
    container: 'UnAssigned',
    lastInspectionDate: '01/07/2023',
    nextInspectionDate: '02/10/2023',
    assetStatus: AssetStatus.BEING_INSPECTED,
    progressValue:30
  },
  {
    ownerLocation: 'Australia',
    physicalLocation: 'nez',
    fullDescription: 'FMC_ASSET_ATTACH',
    pressureRating: '1520 CWP',
    container: 'UnAssigned',
    lastInspectionDate: '01/24/2023',
    nextInspectionDate: '02/01/2023',
    assetStatus: AssetStatus.READY_FOR_USE,
    progressValue:70
  },
  {
    ownerLocation: 'Australia',
    physicalLocation: 'nez',
    fullDescription: 'FMC_ASSET_ATTACH',
    pressureRating: '152 CWP',
    container: 'UnAssigned',
    lastInspectionDate: '01/24/2023',
    nextInspectionDate: '02/24/2024',
    assetStatus: AssetStatus.IDLE,
    progressValue:80
  },
  {
    ownerLocation: 'Australia',
    physicalLocation: 'nez',
    fullDescription: 'FMC_ASSET_ATTACH',
    pressureRating: '1520 CWP',
    container: 'UnAssigned',
    lastInspectionDate: '01/24/2023',
    nextInspectionDate: '02/24/2023',
    assetStatus: AssetStatus.SILVER_BANED,
    progressValue:30
  },
  {
    ownerLocation: 'Australia',
    physicalLocation: 'nez',
    fullDescription: 'FMC_ASSET_ATTACH',
    pressureRating: '1520 CWP',
    container: 'UnAssigned',
    lastInspectionDate: '01/24/2023',
    nextInspectionDate: '02/24/2023',
    assetStatus: AssetStatus.PM_FAILED,
    progressValue:50
  },
  {
    ownerLocation: 'Australia',
    physicalLocation: 'nez',
    fullDescription: 'FMC_ASSET_ATTACH',
    pressureRating: '1520 CWP',
    container: 'MAL 23',
    lastInspectionDate: '',
    nextInspectionDate: '',
    assetStatus: AssetStatus.FAILED,
    progressValue:30
  },
];

