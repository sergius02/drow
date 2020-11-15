import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {APIReference} from 'src/app/interfaces/api-reference';
import {Monster} from 'src/app/interfaces/monster';
import {MonstersService} from 'src/app/services/monsters-service.service';
import {DocWindowFactory} from '../../../../classes/docs/doc-window-factory';
import {MonsterDocComponent} from '../../monster-doc/monster-doc.component';

@Component({
  selector: 'app-monster-grid',
  templateUrl: './monster-grid.component.html',
  styleUrls: ['./monster-grid.component.scss']
})
export class MonsterGridComponent implements OnInit {

  @ViewChild('monsterListDocRef', { read: ViewContainerRef })
  monsterListDocContainerRef: ViewContainerRef;
  monsterListDocRefs: ComponentRef<MonsterDocComponent>[];
  monsterDocWindowsNumber: number;

  monstersReferences: APIReference[];
  monsterReferenceSelected: APIReference;
  monsterSelected: Monster;

  searchMonsterRef;

  constructor(
    private monsterservice: MonstersService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.monsterListDocRefs = [];
    this.monsterDocWindowsNumber = 0;
  }

  ngOnInit(): void {
    this.monsterservice.getAllMonsters().subscribe(
      response => this.monstersReferences = response
    );
  }

  openMonsterDoc(monsterReferenceSelected: APIReference): void {
    this.monsterReferenceSelected = monsterReferenceSelected;
    this.monsterSelected = null;
    this.monsterservice.getMonsterInfo(monsterReferenceSelected.index)
    .subscribe(
      response => {
        DocWindowFactory.createMonsterDocWindow(
          this.componentFactoryResolver,
          response,
          this.monsterListDocContainerRef,
          this.monsterListDocRefs,
          this.monsterDocWindowsNumber,
          // @ts-ignore
          this
        );
        this.monsterDocWindowsNumber++;
      }
    );
  }

  closeMonsterDoc(index: number): void {
    if (this.monsterListDocContainerRef.length < 1) {
      return;
    }

    const componentRef = this.monsterListDocRefs.filter(
      value => value.instance.index === index )[0];

    const refIndex: number = this.monsterListDocContainerRef.indexOf(
      componentRef.hostView );

    this.monsterListDocContainerRef.remove(refIndex);
    this.monsterListDocRefs = this.monsterListDocRefs.filter(
      value => value.instance.index !== index);
    this.monsterDocWindowsNumber--;
  }

}
