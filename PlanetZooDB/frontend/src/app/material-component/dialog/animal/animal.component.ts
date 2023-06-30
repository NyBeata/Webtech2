import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnimalService } from 'src/app/services/animal.service';
import { DlcService } from 'src/app/services/dlc.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit {
  onAddAnimal = new EventEmitter();
  onEditAnimal = new EventEmitter();
  animalForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  dlcs: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    public dialogRef: MatDialogRef<AnimalComponent>,
    private dlcService: DlcService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.animalForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      dlcId: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    if (this.dialogData.action == 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.animalForm.patchValue(this.dialogData.data);
    }
    this.getDlc();
  }

  getDlc() {
    this.dlcService.getDlc().subscribe(
      (response: any) => {
        this.dlcs = response;
      },
      (error: any) => {
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

  handleSubmit() {
    if (this.dialogAction == 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    var formData = this.animalForm.value;
    var data = {
      name: formData.name,
      dlcId: formData.dlcId,
      description: formData.description,
    };
    this.animalService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddAnimal.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
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
    var formData = this.animalForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      dlcId: formData.dlcId,
      description: formData.description,
    };
    this.animalService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditAnimal.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
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
