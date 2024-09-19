export class CreateFavoritesDto {
    readonly id: number;
    readonly user_id: number;
    readonly series_id: number | null;
    readonly  movie_id: number | null;
    readonly  grade_id: number;
  }