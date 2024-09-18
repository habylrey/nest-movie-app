export class CreateEpisodesDto {
    readonly id: number;
    readonly preview_file_id: number;
    readonly series_id: number;
    readonly season: number;
    readonly episode: number;
    readonly episode_link: string;
    readonly description: string;
    readonly name: string;
}