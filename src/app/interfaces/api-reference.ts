export interface APIReferenceList {
    count: number;
    results: APIReference[];
}

export interface APIReference {
    index: string;
    name: string;
    url: string;
}
