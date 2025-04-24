import MindMapperPlugin from "main";
import { Editor, MarkdownView, App, EditorPosition, TFile } from "obsidian";

declare const app: App;
class CardEngine {
  plugin: MindMapperPlugin;
  constructor() {
    this.plugin = MindMapperPlugin.getInstance();
  }
  selection: string;
  cursorStart: EditorPosition;
  cursorEnd: EditorPosition;
  fileInfo: TFile;
  position: {
    start: number;
    end: number;
  }

  
  create(editor: Editor, view: MarkdownView) {
	this.selection = editor.getSelection();
	this.cursorStart = editor.getCursor("from");
	this.cursorEnd = editor.getCursor("to");
	const activeFile = app.workspace.getActiveFile();
	if (!activeFile) {
	throw new Error("No active file");
	}
      
	this.position = this.getPosition();      
	const newCard: Card = {
		id: this.generateUUID(),
		content: this.selection,
		sourceNote: this.fileInfo ? this.fileInfo.path : "",
		sourcePosition: this.position,
		links: [],
		noteLinks: [],
		comments: [],
		tags: [],
		lastSynced: Date.now(),
		collectionIds: []
	};
      
	// Store card
	this.saveCard(newCard);
	
	// Optional: Add reference marker in the text
	this.insertCardReference(editor, newCard.id);
    }

  generateUUID() {
      // Generate a UUID
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }


  async saveCard(card: Card) {
    console.log("Saving card:", card);
  }
  


  insertCardReference(editor: Editor, id: any) {
      // Insert the card reference at the end of the selection
      editor.setCursor(this.cursorEnd);
      editor.replaceRange(`([[${id}|card]]) `, this.cursorEnd);
  }
  getPosition(){
    return {
      start: this.cursorStart.ch,
      end: this.cursorEnd.ch
    }
  }
}

export default CardEngine;
