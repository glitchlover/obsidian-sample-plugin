import { Command, Notice, Plugin, WorkspaceLeaf } from 'obsidian';
import CommandHelper from 'src/core/helpers/Commands';
import MindMapperSettings from 'src/core/interface/mind_mapper_settings';
import SettingsHelper from 'src/core/helpers/settings';
import SidebarCardView from 'src/presentation/cardView/sidebarCardView';

export default class MindCardPlugin extends Plugin {
	settings: MindMapperSettings;
	commands: Command[];
	cardView: SidebarCardView;
	cardViewType: string = SidebarCardView.viewType;
	db: CardDatabase;

	// Singleton instance
	static instance: MindCardPlugin;

	/**
	 * Updates the singleton instance of the plugin.
	 * @param plugin The current plugin instance.
	 */
	static update(plugin: MindCardPlugin) {
		this.instance = plugin;
	}

	/**
	 * Retrieves the singleton instance of the plugin.
	 * @returns The current plugin instance.
	 */
	static getInstance(): MindCardPlugin {
		if (!this.instance) {
			throw new Error("MindMapperPlugin instance is not initialized. Ensure that the plugin's onload() method has been called.");
		}
		return this.instance;
	}

	/**
	 * Called when the plugin is loaded.
	 * Initializes settings, commands, and views.
	 */
	async onload() {
		console.log("Loading MindMapper Plugin");
		MindCardPlugin.update(this);

		// Initialize settings, commands, and views
		this.settings = await new SettingsHelper(this).loadSettings();

		this.app.workspace.onLayoutReady(() => {
			this.cardView = this.activateViews(this.cardViewType);
			this.commands = this.activateCommands();
		});
		
		MindCardPlugin.update(this);
	}

	/**
	 * Called when the plugin is unloaded.
	 * Cleans up views and other resources.
	 */
	onunload() {
		this.cleanupViews();
	}

	/**
	 * Registers all commands loaded from CommandHelper.
	 */
	activateCommands() {
		const commands = new CommandHelper().loadCommand();

		commands.forEach((command) => this.addCommand(command));
		return commands;

	}

	/**
	 * Activates the sidebar views and registers the ribbon icon.
	 * @param viewType The type of the view to activate.
	 */
	activateViews(viewType: string) : SidebarCardView {
		this.registerView(viewType, (leaf) => {
			this.cardView = new SidebarCardView(leaf);
			return this.cardView;
		});

		// Add ribbon icon
		const ribbonIconEl = this.addRibbonIcon('gallery-vertical-end', 'Sample Plugin', async () => {
			new Notice('This is a notice!');
			await this.activateNoteCardView();
		});
		ribbonIconEl.addClass('mind-mapper-ribbon-icon');

		// Ensure the view is initialized properly
		this.app.workspace.onLayoutReady(() => this.ensureSingleViewInstance(viewType));

		return new SidebarCardView(this.getOrCreateLeaf());
	}

	/**
	 * Ensures there is only one instance of the view and activates it if necessary.
	 * @param viewType The type of the view to manage.
	 */
	ensureSingleViewInstance(viewType: string) {
		const leaves = this.app.workspace.getLeavesOfType(viewType);

		// Remove extra leaves if more than one exists
		if (leaves.length > 1) {
			for (let i = 1; i < leaves.length; i++) {
				leaves[i].detach();
			}
		}

		// Activate the first leaf or create a new one
		if (leaves.length === 0) {
			this.activateNoteCardView();
		} else {
			this.cardView = leaves[0].view as SidebarCardView;
		}
	}

	/**
	 * Activates the note card view in the sidebar.
	 */
	async activateNoteCardView() {
		const { workspace } = this.app;
		let leaf = workspace.getLeavesOfType(this.cardViewType)[0];

		if (!leaf) {
			leaf = workspace.getRightLeaf(false) || (() => { throw new Error('No active leaf found.'); })();
			await leaf?.setViewState({ type: this.cardViewType, active: true });
		}

		if (leaf) {
			workspace.revealLeaf(leaf);
		}
	}

	/**
	 * Retrieves or creates a new leaf for the sidebar view.
	 * @returns The workspace leaf.
	 */
	getOrCreateLeaf(): WorkspaceLeaf {
		const leaf = this.app.workspace.getLeavesOfType(this.cardViewType)[0];
		return leaf;
	}

	/**
	 * Cleans up all views of the specified type.
	 */
	cleanupViews() {
		this.app.workspace.detachLeavesOfType(this.cardViewType);
		this.app.workspace.getLeavesOfType(this.cardViewType).forEach((leaf) => {
			(leaf.view as SidebarCardView).onClose();
			leaf.detach();
		});
	}
}
