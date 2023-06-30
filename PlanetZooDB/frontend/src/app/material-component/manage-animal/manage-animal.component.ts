import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { AnimalComponent } from '../dialog/animal/animal.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-animal',
  templateUrl: './manage-animal.component.html',
  styleUrls: ['./manage-animal.component.scss'],
})
export class ManageAnimalComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dlcName', 'description', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private animalService: AnimalService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    this.animalService.getAnimals().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response);
      },
      (error: any) => {
        console.log(error);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(AnimalComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddAnimal.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values,
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(AnimalComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditAnimal.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete the ' + values.name + ' animal',
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (response) => {
        this.deleteAnimal(values.id);
        dialogRef.close();
      }
    );
  }

  deleteAnimal(id: any) {
    this.animalService.delete(id).subscribe(
      (response: any) => {
        this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
        console.log(error);
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

  onChange(status: any, id: any) {
    var data = {
      status: status.toString(),
      id: id,
    };
    this.animalService.updateStatus(data).subscribe(
      (response: any) => {
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
        console.log(error);
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
