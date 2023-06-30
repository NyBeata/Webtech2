import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageDlcComponent } from './manage-dlc/manage-dlc.component';
import { ManageAnimalComponent } from './manage-animal/manage-animal.component';



export const MaterialRoutes: Routes = [
    {
        path:'dlc',
        component:ManageDlcComponent,
        data:{
            expectedRole:['admin']
        }
    },
    {
        path:'animal',
        component:ManageAnimalComponent,
        /*data:{
            expectedRole:['admin']
        }*/
    }
];
