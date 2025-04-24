import MindMapperPlugin from "main";
import { Command, Editor, MarkdownView, Notice, Workspace } from "obsidian";
import CardEngine from "./cardEngine";

class CommandHelper {
	plugin: MindMapperPlugin;
	editor: Editor;
	view: MarkdownView;
	workspace: Workspace;


	constructor() {
		this.plugin = MindMapperPlugin.instance;
		this.workspace = this.plugin.app.workspace;
	}

	loadCommand(): Command[] {
		return [
			{ 
				id: 'open-mindmapper card',
				name: 'Open Mindmap',
				callback: () => {
					if (!this.workspace.activeEditor?.editor) {
						throw new Error('No active editor found.');
					}
					this.editor = this.workspace.activeEditor.editor;
					this.view = this.workspace.getActiveViewOfType(MarkdownView) ?? (() => {
						new Notice('No active MarkdownView found.'); 
						throw new Error('No active MarkdownView found.'); 
					})();
					new CardEngine().create(this.editor, this.view)
					new Notice('Mindmapper opened!');
				}
			},
			{
				id: 'open-mindmapper-sidebar-card-view',
				name: 'Open Mindmap Sidebar',
				callback: () => {
					this.plugin.cardView.load();
				}
			}
		];
	}
}

export default CommandHelper;
