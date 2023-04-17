import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
declare var $: any,jQuery:any;

@Component({
  selector: 'app-asset-toggle',
  templateUrl: './asset-toggle.component.html',
  styleUrls: ['./asset-toggle.component.scss']
})
export class AssetToggleComponent implements OnInit ,AfterViewInit{

  constructor() { }
  @Input() assetHistory:any;
  // @ViewChild('pdfViewer', { static: false }) private pdfViewer:any;

  ngOnInit(): void {
  }
  @ViewChild('pdfViewer', { static: false }) private pdfViewer:any;

  ngAfterViewInit() {
    const pdfViewElm=this.pdfViewer?.nativeElement;
    $.when(
      $.getScript("assets/js/kendo.all.min.js")
  )
  .done(function () {
      (<any>window).pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/js/pdf-worker.js';           
  }).then(function(){
      $(pdfViewElm).kendoPDFViewer({
          pdfjsProcessing: {
              file: "assets/img/dummy-pdf_2_2.pdf"
          },
          width: "100%",
          height: "300px"
      });
  })
    }

  

}
