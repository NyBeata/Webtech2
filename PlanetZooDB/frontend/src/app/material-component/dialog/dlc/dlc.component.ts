import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DlcService } from 'src/app/services/dlc.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-dlc',
  templateUrl: './dlc.component.html',
  styleUrls: ['./dlc.component.scss'],
})
export class DlcComponent implements OnInit {
  onAddDlc = new EventEmitter();
  onEditDlc = new EventEmitter();
  dlcForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private dlcService: DlcService,
    public dialogRef: MatDialogRef<DlcComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.dlcForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
    if (this.dialogData.action == 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.dlcForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction == 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    var formData = this.dlcForm.value;
    var data = {
      name: formData.name,
    };
    this.dlcService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddDlc.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  edit() {
    var formData = this.dlcForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
    };
    this.dlcService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditDlc.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
        this.dialogRef.close();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
