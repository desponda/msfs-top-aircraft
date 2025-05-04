export interface Aircraft {
    id: string;
    name: string;
    manufacturer: string;
    popularity: number;
    category: string;
    msrp?: number;
    buyUrl: string;
    previewImageUrl?: string;
    description?: string;
    tags?: string[];
    votes: number;
    daysOnList: number;
    oldRank: number;
    currentRank: number;
}
