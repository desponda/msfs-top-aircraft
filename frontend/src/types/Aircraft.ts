export interface Aircraft {
    id: string;
    name: string;
    manufacturer: string;
    category: string;
    payware: string; // 'Payware', 'Freeware', 'Deluxe Edition', etc.
    msrp?: number;
    buyUrl: string;
    previewImageUrl?: string;
    description?: string;
    tags?: string[];
    votes: number;
    daysOnList: number;
    dateAdded?: string; // ISO date string
    weeksInChart: number;
    rank?: number; // Position in the rankings, calculated on the server
}
