import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '@core';
import { Company } from '../Company';
import { ListClientComponent } from '../list-client/list-client.component';
import { CompaniesService } from '../clients.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ListClientComponent>,
    @Inject(MAT_DIALOG_DATA) public company: Company,

  ) {}

  companyForm: FormGroup = new FormGroup({
    nomCompany: new FormControl('', [Validators.required, Validators.minLength(4)]),

    emailCompany: new FormControl('', [Validators.required, Validators.email]),

    numCompany: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    ]),

    companyRep: new FormControl('', [Validators.required, Validators.minLength(4)]),

    addressCompany: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });



  ngOnInit(): void {
    if (this.company) {
      this.companyForm.patchValue(this.company);
    } else {
      this.company = new Company();
    }

  }



  close(): void {
    this.dialogRef.close();
  }
}
