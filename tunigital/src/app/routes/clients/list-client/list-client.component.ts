import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddClientComponent } from '../add-client/add-client.component';
import { Company } from '../Company';
import { CompaniesService } from '../clients.service';
import { DeleteClientComponent } from '../delete-client/delete-client.component';




@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'nb',
    'Company',
    'Company_rep',
    'emailClient',
    'numClient',
    'addressClient',
    'action',
  ];
  dataSource = new MatTableDataSource<Company>();

 constructor(private companyService : CompaniesService,private dialog : MatDialog) { }

  getCompanies(){
    this.companyService.getCompanies().subscribe( data => {
      console.log(data)
      this.dataSource.data= data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  addCompany(company : any) {
    let Company: Company;
    Company = company;
   Company.added_at = new Date();
    this.companyService.addCompany(company).subscribe(company => {
      this.getCompanies();
    });
  }

  editCompany(company : Company, id : any) {
    this.companyService.editCompany(id, company).subscribe(company => {
      this.getCompanies();
    });
  }

  deleteCompany(id: any) {
    this.companyService.deleteCompany(id).subscribe(company => {
      this.getCompanies();
    });

  }


  openDialog(company:any): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '520px',
      data: company,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (company) {
          this.editCompany(result, company._id);
        } else {
          this.addCompany(result);
        }
      }
    });
  }

  openDialogdel(company: Company): void {

      const dialogRef = this.dialog.open(DeleteClientComponent, {
        data: company,
      });
      dialogRef.afterClosed().subscribe((result : any) => {
        if (result) {
          this.deleteCompany(result);
        }
      });

  }


  ngOnInit(): void {
this.getCompanies();
  }

}
