import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './Garde/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  
  {
    path: 'products',
    component: ProductsListComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard]
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddProductComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }