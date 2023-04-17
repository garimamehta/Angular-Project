import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor() { }
  viewerContainerStyle = {
    position: 'relative',
    width: '1000px',
    height: '800px',
    ['font-family']: 'ms sans serif'
  };

  reportObject = {
    "report": "NAME/Samples/Invoice/",
    "parameterValues":
      { "OrderNumber": "SO51081", "ForYear": "2003", "ForMonth": "7" }
  }

  reportingServerObj = {
    url: 'http://localhost:83',
    username: 'Jeyanthi',
    password: 'Welcome@123'
  }
  ngOnInit(): void {
  }

}
