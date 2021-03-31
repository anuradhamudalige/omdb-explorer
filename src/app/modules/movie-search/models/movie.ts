import { Rating } from './rating';

export interface Movie {
  Title: string;
  Year: string;
  Plot: string;
  Ratings: Rating[];
  Poster: string;
  Actors: string;
}
