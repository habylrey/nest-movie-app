export class CreateGradeDto {
    readonly series_id: number | null;
    readonly movie_id: number | null;
    readonly user_id: number;
    readonly grade: number;
  }