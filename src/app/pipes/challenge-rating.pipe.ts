import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'challengeRating'
})
export class ChallengeRatingPipe implements PipeTransform {

  transform(challengeRating: number): string {
    if (challengeRating === 0.5) {
      return '1/2';
    } else if (challengeRating === 0.25) {
      return '1/4';
    } else if (challengeRating === 0.125) {
      return '1/8';
    }

    return challengeRating.toString();
  }

}
