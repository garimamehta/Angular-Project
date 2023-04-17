import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContextMenuModule, MenuModule } from '@progress/kendo-angular-menu';
import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from "@progress/kendo-angular-layout";
import { ProgressBarModule } from "@progress/kendo-angular-progressbar";
import { UploadsModule } from "@progress/kendo-angular-upload";
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlankComponent } from "./components/blank/blank.component";
import { TileComponent } from './components/tile/tile.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { InspectionComponent } from './components/inspection/inspection.component';
import { ListViewModule } from "@progress/kendo-angular-listview";
import { HttpClientModule } from '@angular/common/http';
import { GridFormComponent } from './components/grid/grid-form.component';
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { ExcelPasteDirective } from './directives/excel-paste.directive';
import { PagerModule } from "@progress/kendo-angular-pager";
import { AssetHistoryComponent } from './components/asset-history/asset-history.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DateFormatPipe } from './directives/date-format.pipe';
import { AssetToggleComponent } from './components/asset-toggle/asset-toggle.component';
import { ReportGeneratorComponent } from './components/report-generator/report-generator.component';
import { PDFExportModule } from "@progress/kendo-angular-pdf-export";
import { TelerikReportingModule } from '@progress/telerik-angular-report-viewer';
import { StatusbarRangeComponent } from './components/statusbar-range/statusbar-range.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        BlankComponent,
        FooterComponent,
        TileComponent,
        StepperComponent,
        InspectionComponent,
        GridFormComponent,
        ExcelPasteDirective,
        AssetHistoryComponent,
        ReportsComponent,
        DateFormatPipe,
        AssetToggleComponent,
        ReportGeneratorComponent,
        StatusbarRangeComponent
              
    ],
    imports: [
      BrowserModule,
      DateInputsModule,
      ReactiveFormsModule,
      FormsModule,
      MenuModule,
      BrowserAnimationsModule,
      ProgressBarModule,
      GridModule,
      ChartsModule,
      AppRoutingModule,
      DropDownsModule,
      PopupModule,
      UploadsModule,
      InputsModule,
      LabelModule,
      LayoutModule,
      ButtonsModule,
      ListViewModule ,
      HttpClientModule,
      PagerModule,
      PDFExportModule,
      ContextMenuModule,
      TelerikReportingModule
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
