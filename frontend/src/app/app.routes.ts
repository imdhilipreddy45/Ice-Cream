import { Routes } from '@angular/router';
import { IcecreamListComponent } from './components/icecream-list/icecream-list.component';
import { IcecreamFormComponent } from './components/icecream-form/icecream-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/icecreams', pathMatch: 'full' },
  { path: 'icecreams', component: IcecreamListComponent },
  { path: 'create', component: IcecreamFormComponent },
  { path: 'edit/:id', component: IcecreamFormComponent },
  { path: '**', redirectTo: '/icecreams' }
];
