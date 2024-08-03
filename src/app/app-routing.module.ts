import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { DetailProductComponent } from "./components/detail-product/detail-product.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: '', component: HomeComponent }, 

  { path: 'detail-product/:id', component: DetailProductComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}