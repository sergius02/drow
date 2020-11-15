import {Component, OnInit} from '@angular/core';
import {Monster} from '../../../interfaces/monster';

@Component({
  selector: 'app-monster-doc',
  templateUrl: './monster-doc.component.html',
  styleUrls: ['./monster-doc.component.scss']
})
export class MonsterDocComponent implements OnInit {

  monster: Monster;
  parentRef: Component;
  index: number;

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    // @ts-ignore
    this.parentRef.closeMonsterDoc(this.index);
  }

}
