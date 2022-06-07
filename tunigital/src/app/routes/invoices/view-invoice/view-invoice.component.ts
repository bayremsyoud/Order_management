import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../invoice';
import { InvoicesService } from '../invoices.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit,AfterViewInit {
  @ViewChild('pdfInvoice', { static: false })
  pdfInvoice!: ElementRef;

  constructor(private router:Router,private route:ActivatedRoute,private cdr:ChangeDetectorRef,
    private invoiceServ:InvoicesService) {

    }


invoice : Invoice = new Invoice()

  getInvoice(){
      this.route.params.subscribe(param => {
        let id = param['id'];

          this.invoiceServ.getOneInvoice(id).subscribe(res => {
            this.invoice = res;
          });

      });
    }
    downloadPDF() {
      let doc = new jsPDF('p', 'pt', 'a4');
      doc.html(this.pdfInvoice.nativeElement, {
        callback: pdf => {
          pdf.save(`Invoice of ${this.invoice.nomInvoice}.pdf`);
        },
      });
    }



  ngOnInit(): void {
    this.getInvoice()
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

}
