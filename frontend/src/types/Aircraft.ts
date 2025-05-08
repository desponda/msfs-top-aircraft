export enum CompatibilityStatus {
    NATIVE = 'Native',
    COMPATIBLE = 'Compatible',
    NOT_COMPATIBLE = 'Not Compatible'
}

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
    dateAdded?: string; // ISO date string
    msfs2020Compatibility?: CompatibilityStatus;
    msfs2024Compatibility?: CompatibilityStatus;
}

export interface AircraftWithVotes extends Aircraft {
    votes: number;
    daysOnList: number;
    weeksInChart: number;
    rank?: number; // Position in the rankings, calculated on the server
}
