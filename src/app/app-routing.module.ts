import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BlankComponent } from "./components/blank/blank.component";
import { StepperComponent } from './components/stepper/stepper.component';
import { InspectionComponent } from './components/inspection/inspection.component';
import { GridFormComponent } from './components/grid/grid-form.component';
import { AssetHistoryComponent } from './components/asset-history/asset-history.component';
import { ReportsComponent } from './components/reports/reports.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'blank', component: BlankComponent },
  { path: 'inspection', component: InspectionComponent},
  { path: 'grid', component: GridFormComponent},
  { path: 'asset_history', component: AssetHistoryComponent},
  { path: 'reports', component: ReportsComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
