import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MonsterGridComponent} from './components/monsters/monster-list/monster-grid/monster-grid.component';
import {HomeComponent} from './components/home/home.component';
import {MonsterSearchPipePipe} from './pipes/monster-search-pipe.pipe';
import {FirstCharUpperPipe} from './pipes/first-char-upper.pipe';
import {ChallengeRatingPipe} from './pipes/challenge-rating.pipe';
import {BattleComponent} from './components/battle/battle.component';
import {MonsterTemplateComponent} from './components/monsters/monster-list/monster-template/monster-template.component';
import {HeroesGridBattleComponent} from './components/battle/heroes-grid-battle/heroes-grid-battle.component';
import {MonstersGridBattleComponent} from './components/battle/monsters-grid-battle/monsters-grid-battle.component';
import {BattleActionsComponent} from './components/battle/battle-actions/battle-actions.component';
import {BattleActionsGridComponent} from './components/battle/battle-actions/battle-actions-grid/battle-actions-grid.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SpellListComponent} from './components/spells/spell-list/spell-list.component';
import {ClassListComponent} from './components/classes/class-list/class-list.component';
import {MonsterDocComponent} from './components/monsters/monster-doc/monster-doc.component';
import { ClassTemplateComponent } from './components/classes/class-list/class-template/class-template.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterGridComponent,
    HomeComponent,
    MonsterSearchPipePipe,
    MonsterTemplateComponent,
    FirstCharUpperPipe,
    ChallengeRatingPipe,
    BattleComponent,
    HeroesGridBattleComponent,
    MonstersGridBattleComponent,
    BattleActionsComponent,
    BattleActionsGridComponent,
    SpellListComponent,
    ClassListComponent,
    MonsterDocComponent,
    ClassTemplateComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ScrollingModule,
        DragDropModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
