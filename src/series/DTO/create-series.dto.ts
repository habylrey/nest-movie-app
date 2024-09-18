export class CreateSeriesDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly poster_file_id: number;
  readonly start_year: number;
  readonly grad_year: number;
  readonly genre_id: number;
}