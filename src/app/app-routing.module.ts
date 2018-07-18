import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { OrdersComponent } from './orders/orders.component';


const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'bodyView' },
    { path: 'bodyView', component: BodyComponent },
    { path: 'ordersView', component: OrdersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }