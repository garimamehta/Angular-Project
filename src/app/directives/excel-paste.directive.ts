import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[excelPaste]',
})

export class ExcelPasteDirective {

    @Input()
    public gridModel: any[] = []
    @Output()
    public excelPaste: EventEmitter<any[]> = new EventEmitter<any[]>();
    @HostListener('paste', ['$event'])
    public onPaste(e: any) {

        if (e.target.tagName && e.target.tagName.match(/(input|textarea)/i)) {
            // Do not handle past when an input element is currently focused
            return;
        }
        // Get clipboard data as text
        const value = e.clipboardData.getData('text');
        let sheetData = value.split('\n').map((sheet: any) => sheet.split('\t'))
            .filter((r: any) => r.toString().trim());
        let [...rows] = sheetData;
        this.excelPaste.emit(rows);
    }

}

