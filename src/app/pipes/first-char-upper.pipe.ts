import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCharUpper'
})
export class FirstCharUpperPipe implements PipeTransform {

  transform(text: string): string {
    if (!text) {
      return '';
    }

    let textAux = '';
    for (let i = 0; i < text.length; i++) {
      if (i === 0) {
        textAux += text[i].toUpperCase();
      } else {
        textAux += text[i];
      }
    }
    return textAux;
  }

}
