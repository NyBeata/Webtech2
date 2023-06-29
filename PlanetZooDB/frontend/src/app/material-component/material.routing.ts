import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageDlcComponent } from './manage-dlc/manage-dlc.component';



export const MaterialRoutes: Routes = [
    {
        path:'dlc',
        component:ManageDlcComponent,
        data:{
            expectedRole:['admin']
        }
    }
];
