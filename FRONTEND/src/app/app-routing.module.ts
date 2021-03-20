import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanysComponent } from './companys/companys.component';
import { FormComponent } from './form/form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'lists', component: CompanysComponent },
  { path: 'lists/:id', component: FormComponent },
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
