import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MonsterGridComponent } from './components/monsters/monster-list/monster-grid/monster-grid.component';
import { BattleComponent } from './components/battle/battle.component';
import {SpellListComponent} from './components/spells/spell-list/spell-list.component';
import {ClassListComponent} from './components/classes/class-list/class-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'monsters', component: MonsterGridComponent},
  { path: 'battle', component: BattleComponent},
  { path: 'spells', component: SpellListComponent},
  { path: 'classes', component: ClassListComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
