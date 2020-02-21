import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { LoginGuardGuard } from '../services/guards/login-guards.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'dashboard',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule',
        data: { animationState: 'Dashboard' }
      },
      { 
        path: 'info-app',
        canActivate: [ LoginGuardGuard ],
        loadChildren: '../info-app/info-app.module#InfoAppPageModule' 
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
