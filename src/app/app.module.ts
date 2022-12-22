import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { MineSweeperComponent } from './mine-sweeper/mine-sweeper.component';
import { FormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { reducer } from './core/game.reducer';


const routes: Routes = [
  { path: 'home', component: MineSweeperComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    MineSweeperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducer),
    FormsModule,
    // IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

 