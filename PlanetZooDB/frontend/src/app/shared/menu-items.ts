import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
  { state: 'dlc', name: 'Manage DLC', icon: 'category', role: 'admin' },
  { state: 'animal', name: 'Manage Animal', icon: 'pets', role: '' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
