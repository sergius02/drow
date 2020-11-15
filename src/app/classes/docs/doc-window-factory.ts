import {Component, ComponentFactoryResolver, ComponentRef, ViewContainerRef} from '@angular/core';
import {Monster} from '../../interfaces/monster';
import {MonsterDocComponent} from '../../components/monsters/monster-doc/monster-doc.component';

export class DocWindowFactory {

  constructor() { }

  public static createMonsterDocWindow(
    componentFactoryResolver: ComponentFactoryResolver,
    monster: Monster,
    monsterDocContainerRef: ViewContainerRef,
    monsterDocRefs: ComponentRef<MonsterDocComponent>[],
    monsterDocWindowsNumber: number,
    parentComponent: Component
): void {
      const monsterRef = monsterDocRefs.find(value => {
        return value.instance.monster.index === monster.index;
      });

      if (monsterRef === undefined) {
        const componentFactory = componentFactoryResolver
          .resolveComponentFactory(MonsterDocComponent);

        const childComponentRef = monsterDocContainerRef
          .createComponent(componentFactory);

        const childComponent = childComponentRef.instance;
        childComponent.index = ++monsterDocWindowsNumber;
        childComponent.monster = monster;
        childComponent.parentRef = parentComponent;

        monsterDocRefs.push(childComponentRef);
      }
  }

}
