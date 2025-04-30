# Database Design

The plugin will need to store several types of information persistently. Since Obsidian plugins typically use JSON for data storage, we'll design a database structure based on JSON.

## Main Database File Structure

```json
{
  "cards": {
    "card_id_1": {
      "id": "card_id_1",
      "content": "Card text content",
      "sourceNote": "path/to/source/note.md",
      "sourceParagraphId": "unique_paragraph_identifier",
      "startPosition": 150,
      "endPosition": 250,
      "created": "2025-04-29T12:00:00Z",
      "modified": "2025-04-29T14:30:00Z",
      "tags": ["tag1", "tag2"],
      "comments": ["comment_id_1", "comment_id_2"],
      "links": {
        "cardLinks": ["card_id_2", "card_id_3"],
        "noteLinks": ["path/to/linked/note1.md", "path/to/linked/note2.md"]
      },
      "syncStatus": "synced", // "synced", "modified", "outOfSync"
    },
    "card_id_2": {
      // Another card...
    }
  },
  "comments": {
    "comment_id_1": {
      "id": "comment_id_1",
      "cardId": "card_id_1",
      "content": "Comment content",
      "created": "2025-04-29T15:00:00Z",
      "modified": "2025-04-29T15:10:00Z",
    },
    "comment_id_2": {
      // Another comment...
    }
  },
  "settings": {
    "cardTemplate": "Default template for new cards",
    "cardViewOptions": {
      "showTags": true,
      "showCreationDate": true,
      "showLinks": true
    },
    "syncOptions": {
      "autoSyncOnEdit": false,
      "promptBeforeSync": true
    }
  },
  "cardViews": {
    "view_id_1": {
      "id": "view_id_1",
      "name": "Project Planning",
      "cards": ["card_id_1", "card_id_3"],
      "layout": "grid", // "grid", "list", "mindmap", etc.
      "sortOrder": "created" // "created", "modified", "alphabetical", "custom"
    }
  }
}
```

## Data Access Methods

The plugin will need methods to:
1. Create, read, update, and delete cards
2. Link and unlink cards
3. Add and remove comments
4. Track changes between cards and their source notes
5. Handle synchronization between cards and source notes

## Database Schema Evolution Approach

As the plugin evolves, the database schema may need to change. To handle this:

1. Include a version field in the database
2. Implement migration functions for each version upgrade
3. On load, check the version and migrate if necessary

## Storage Approach 
#read

1. **Main Plugin Data**: Store in `.obsidian/plugins/obsidian-card-plugin/plugin-data.json`. 
   - We can achieve this using `app.vault.adapter.write()` to write the JSON data.
2. **Card Content Backup**: Consider creating a hidden folder `.cards` to store backup copies of card content for faster retrieval and protection against source note changes. 
   - This can be done using `app.vault.create()` to create files in this folder.
3. **User Settings**: Store user settings in `.obsidian/plugins/obsidian-card-plugin/settings.json`.
   - How to store data using obsidian's built in settings: 
   ```javascript
   this.app.vault.adapter.write('path/to/settings.json', JSON.stringify(settings));
   ```
4. **Cache**: Implement a runtime cache for frequently accessed data to improve performance.
   - How to do it: Use a simple in-memory object to store data temporarily. For example
   ```
   let cache = {};
   function getFromCache(key) {
	   return cache[key];
   }
   function setToCache(key, value) {
	   cache[key] = value;
   }
   ```

## Data Integrity Considerations

1. **Conflict Resolution**: Implement strategies for handling conflicts when both a card and its source note have been modified
2. **Reference Integrity**: Maintain the integrity of links between cards and with notes
3. **Error Recovery**: Include mechanisms to detect and repair database corruption
4. **Backup**: Automatically backup the database before major operations or periodically

## Synchronization Algorithm

When syncing changes between cards and source notes:

1. Store a hash of the original text when creating a card
2. On sync check:
   - Compare current source text hash with original hash
   - If changed, determine if it's the card or source that changed
   - Use diff algorithms to merge changes when possible
   - Prompt user for resolution when automatic merging isn't possible
Example code:
```javascript
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
hash.update(sourceText);
const originalHash = hash.digest('hex');
if (originalHash !== currentHash) {
	// Handle conflict resolution
}
```
