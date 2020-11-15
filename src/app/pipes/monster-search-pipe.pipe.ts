import { Pipe, PipeTransform } from '@angular/core';
import { APIReference } from '../interfaces/api-reference';

@Pipe({
  name: 'monsterSearchPipe'
})
export class MonsterSearchPipePipe implements PipeTransform {

  transform(monstersReferences: APIReference[], searchText: string): APIReference[] {
    if (!monstersReferences) {
      return [];
    }

    if (!searchText) {
      return monstersReferences;
    }
    searchText = searchText.toLocaleLowerCase();

    return monstersReferences.filter(monsterReference => {
      return monsterReference.name.toLocaleLowerCase().includes(searchText);
    });
  }

}
