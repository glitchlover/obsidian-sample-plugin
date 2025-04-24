interface Card {
  id: string;
  content: string;
  sourceNote: string;
  sourcePosition: {start: number, end: number};
  links: string[];  // IDs of linked cards
  noteLinks: string[];  // Paths of linked notes
  comments: Comment[];
  tags: string[];
  lastSynced: number;  // timestamp
  collectionIds: string[];  // IDs of collections this card belongs to
}