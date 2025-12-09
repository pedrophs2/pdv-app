import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./page/home/home.component";
import { LoginComponent } from "./page/login/login.component";
import { ProductComponent } from "./page/product/product.component";
import { SaleComponent } from "./page/sale/sale.component";
import { SalesComponent } from "./page/sales/sales.component";
import { GuardiaoGuard } from "./service/guardiao.guard";
import { ProductsComponent } from "./page/products/products.component";
import { UserComponent } from "./page/user/user.component";
import { UsersComponent } from "./page/users/users.component";

const routes: Routes = [
    { path: "home", component: HomeComponent, canActivate: [GuardiaoGuard] },
    {
        path: "product",
        component: ProductComponent,
        canActivate: [GuardiaoGuard],
    },
    {
        path: "product/:id",
        component: ProductComponent,
        canActivate: [GuardiaoGuard],
    },
    {
        path: "products",
        component: ProductsComponent,
        canActivate: [GuardiaoGuard],
    },
    { path: "sale", component: SaleComponent, canActivate: [GuardiaoGuard] },
    {
        path: "sales",
        component: SalesComponent,
        canActivate: [GuardiaoGuard],
    },
    {
        path: "users",
        component: UsersComponent,
        canActivate: [GuardiaoGuard],
    },
    {
        path: "user",
        component: UserComponent,
        canActivate: [GuardiaoGuard],
    },
    {
        path: "user/:id",
        component: UserComponent,
        canActivate: [GuardiaoGuard],
    },
    { path: "login", component: LoginComponent },
    { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
