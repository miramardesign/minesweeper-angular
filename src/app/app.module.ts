import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { MineSweeperComponent } from './mine-sweeper/mine-sweeper.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './state/game.reducer';

const routes: Routes = [
  { path: '', component: MineSweeperComponent},
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
    StoreModule.forRoot({gameState: gameReducer}),
    FormsModule,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

 