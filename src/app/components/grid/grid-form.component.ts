import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Keys } from '@progress/kendo-angular-common';
import { AddEvent, CancelEvent, CellClickEvent, ColumnVisibilityChangeEvent, EditEvent, GridComponent, RemoveEvent, SaveEvent, SelectableSettings, SelectionEvent } from '@progress/kendo-angular-grid';
import { ContextMenuComponent } from '@progress/kendo-angular-menu';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { assetData, AssetStatus } from 'src/app/model';
@Component({
  selector: 'app-grid-form',
  templateUrl: './grid-form.component.html',
  styleUrls: ['./grid-form.component.scss']
})
export class GridFormComponent implements OnInit {
  formGroup: FormGroup;
  constructor() {
    this.formGroup = this.getFormGroup();
    this.EXCEL_COLUMN_MAPPING = this.getFormKeys();
  }
  public sort: SortDescriptor[] = [
  ];

  assetData: any =[];
  editMode:boolean;
  editedRowIndex: undefined | number = 0;
  isNew: boolean;
  submitted: boolean;
  locations = ["Australia", "Kuwait"];
  selectableSettings: SelectableSettings = {
    cell: true,
    mode: 'single',
    drag: true
  };
  EXCEL_COLUMN_MAPPING: string[];

  @ViewChild('kendoGrid')
  public currentGridRef: GridComponent;
  public noRecordsMsg = "No records available yet. Please drop a row.";
  public mySelection: any[] = [];
  currentSelection: any;
  @ViewChild("gridmenu")
  public gridContextMenu: ContextMenuComponent;
  private contextItem: any;

  ngOnInit(): void {
    this.loadProducts();
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadProducts();
  }

  private loadProducts(): void {
    const key='pressureRating';
    const sorting=this.sort.find(a=>a.field==key);
    if(sorting?.dir){
      this.assetData = this.assetData.sort((a:any,b:any)=>{
        return sorting?.dir=='desc' ? a[key]<b[key] : b[key]>a[key];
      });
    }else{
      this.assetData = orderBy(this.assetData, this.sort);
    }     
  }

  addHandler(args: AddEvent): void {
    
    this.formGroup = this.getFormGroup();
    args.sender.addRow(this.formGroup);
  }
  editHandler(args: any) {
    this.isNew = false;
    this.getFormGroupData(args.rowIndex);
    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  cellCloseHandler(args: any) {
    const { formGroup, dataItem,column } = args;
    const key=column.field;
    this.assignValues(dataItem, {
      [key]:formGroup?.value[key]
    });
  }


  public assignValues(target: any, source: any): void {
    Object.assign(target, source);
    console.log(this.assetData)
  }

  cancelHandler(args: CancelEvent): void {
    this.closeEditor(args.sender, args.rowIndex);
    this.editMode=false;
  }

  closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid?.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = new FormGroup({});
    this.editMode=false;
  }
  saveHandler(grid: GridComponent): void {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
  }
  removeHandler({ rowIndex }: RemoveEvent): void {
    this.assetData.splice(rowIndex, 1);
  }

  get f() { return this.formGroup.controls; }

  onExcelPaste(rows: any[]): void {
    const data = rows.map((row: any, rowInd: any) => {
      let rowObj: any = {};
      row.forEach((cell: any, cellInd: any) => {
        let key = this.EXCEL_COLUMN_MAPPING[cellInd];
        let val = row[cellInd].trim().replace(/(\r\n|\n|\r)/gm, " ");
        rowObj[key] = val;
      });
      return rowObj;
    });
    this.assetData = data;
    setTimeout(() => {
      this.selectableSettings.mode = 'multiple';
    }, 100);
  }

  findCellClass(key: any, val: any) {
      let handler: any = {
        ownerLocation: () => {
          return !this.locations.some(loc => new RegExp("^" + loc + "$", "i").test(val));
        },
        inspectionDate: () => {
          const maxyear = new Date(val).getFullYear();
          return !maxyear || maxyear > 2099;
        },
        progressValue: () => {
          return isNaN(val);
        },
        progressStatus: () => {
          return !/(true|false)/i.test(val);
        }
      };
      return handler[key] ? handler[key].bind(this)() : false;

    
  }

  onCellSelction(event: SelectionEvent) {
    console.log(event);
    const length = event.selectedCells?.length;
    if ((length && length > 1) || (this.currentSelection)) {
      setTimeout(() => {
        if (!this.currentSelection || this.mySelection.length < 2) {
          return;
        }
        this.mySelection = [];
        const { rowIndex, columnIndex } = this.currentSelection;
        const columnKey = this.EXCEL_COLUMN_MAPPING[columnIndex];
        event.selectedCells?.forEach(cell => {
          const key = this.EXCEL_COLUMN_MAPPING[cell.columnKey];
          const startedAssetValue = this.assetData[rowIndex][columnKey];
          this.assetData[cell.itemKey][key] = startedAssetValue;
        });
        this.currentSelection = null;
      }, 100);
    }
  }

  onCellClick(args: any) {

    const {which}=args.originalEvent;

    if (!(args.isEdited) && which ==1) {
      args.sender.editCell(args.rowIndex, args.columnIndex, this.editHandler(args));
      this.editMode=true;
    }
    if (!args.isEdited && args.type === 'contextmenu' && which == 3) {
      const originalEvent = args.originalEvent;
      originalEvent.preventDefault();
      this.contextItem = args.dataItem;
      this.gridContextMenu.show({ left: originalEvent.pageX, top: originalEvent.pageY });
    }
    this.currentSelection = args;
  }
  newRowCreation(event: any) {
    if (this.currentSelection && event.which) {
      this.assetData.push({})
    }
  }

  enablePasteMode(event: any) {
    const actualColumn=this.getFormKeys().length-1;
    let {activeRow:rowIndex,activeCol:columnIndex}=(<any>this.currentGridRef)?.navigationService.cursor;
    if (event.ctrlKey && event.which == 86) {
      this.selectableSettings.mode = 'single';
    }
    if (event.which == 13) {
      if(rowIndex==this.assetData?.length) {
        this.newRowCreation(event);
      }else {
        console.log("editmode",this.editMode);
        if(!this.editMode){
          setTimeout(()=>{
            this.currentGridRef.editCell(rowIndex-1, columnIndex,this.getFormGroupData(rowIndex-1));
          },100)
         this.editMode=true;
        }else{
          this.editMode=false;
        }
      }
    }else if(event.which == 9 && event.shiftKey){
      if(columnIndex==0){
        rowIndex=rowIndex-1;
        columnIndex=actualColumn+1;
      }
      this.currentGridRef.editCell(rowIndex-1, columnIndex-1,this.getFormGroupData(rowIndex-1));
    }else if(event.which == 9 && !event.shiftKey){
      if(actualColumn==columnIndex){
          rowIndex=rowIndex+1;
          columnIndex=-1
      }
      this.currentGridRef.editCell(rowIndex-1, columnIndex+1,this.getFormGroupData(rowIndex-1));
    }
  }

  getFormGroupData(rowIndex:number){
    this.formGroup = this.getFormGroup();
    let dataItem=this.assetData[rowIndex];
    dataItem.ownerLocation = this.locations.find(loc => new RegExp("^" + loc + "$", "i").test(dataItem.ownerLocation));
    dataItem.inspectionDate = new Date(dataItem.inspectionDate).getDate() ? new Date(dataItem.inspectionDate) : '';
    if(dataItem.progressStatus)
    dataItem.progressStatus = /(true)/i.test(dataItem.progressStatus)
   
    this.EXCEL_COLUMN_MAPPING.forEach((key) => {
      this.formGroup.controls[key].setValue(dataItem[key]);
    })
    return this.formGroup;
  }

  getFormGroup(): FormGroup {
    return new FormGroup({
      ownerLocation: new FormControl("", Validators.required),
      pressureRating: new FormControl("", Validators.required),
      inspectionDate: new FormControl("", Validators.required),
      progressValue: new FormControl("", Validators.required),
      progressStatus: new FormControl(false)
    });
  }

  getFormKeys() {
    return Object.keys(this.formGroup?.controls);
  }

  //context menu for adding rows

  public items: any[] = [
    { text: "Insert row above" },
    { text: "Insert row below" },
    { text: "Remove row" }
  ];

  onSelect({ item }: any): void {
    const index = this.assetData.indexOf(this.contextItem);
    if (item.text === "Insert row above") {
      this.assetData.splice(index, 0, {});
    } else if (item.text === "Insert row below") {
      this.assetData.splice(index + 1, 0, {});
    }
    else if (item.text === "Remove row") {
      this.assetData.splice(index, 1);
    }
  }
  
}
