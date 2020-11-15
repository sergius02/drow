import { Component, Input, OnInit } from '@angular/core';
import { Monster } from 'src/app/interfaces/monster';

@Component({
  selector: 'app-monster-template',
  templateUrl: './monster-template.component.html',
  styleUrls: ['./monster-template.component.scss']
})
export class MonsterTemplateComponent implements OnInit {

  @Input() monster: Monster;

  constructor() { }

  ngOnInit(): void {
  }

}
