export interface Aircraft {
    id: string; // Unique identifier (UUID or slug)
    name: string;
    manufacturer: string;
    popularity: number; // e.g., rank or score
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
