export class CreateMoviesDto{
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly poster_file_id: number;
    readonly director_id: number;
    readonly genre_id: number;
    readonly link: string;
}
