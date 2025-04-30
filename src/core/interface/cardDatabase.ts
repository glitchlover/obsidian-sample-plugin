interface CardDatabase{
    cards: Record<string, Card>;
    collections: Record<string, CardCollection>;
    metadata: {
        version: string;
        lastSync: number;
    }
}
