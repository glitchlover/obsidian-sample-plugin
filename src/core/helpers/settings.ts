import MindCardPlugin from "main";
import MindMapperSettings from "../interface/mind_mapper_settings";

class SettingsHelper {
	plugin: MindCardPlugin;

	constructor(plugin: MindCardPlugin) {
		this.plugin = plugin;
	}

	async loadSettings(): Promise<MindMapperSettings> {
		const app = this.plugin.app;
		const containerEl = app.workspace.containerEl;
		const defaultSettings: MindMapperSettings = {
			databasePath: 'default/path',
			app: app, // Replace with appropriate value
			containerEl: containerEl, // Replace with appropriate value
			display: () => {}, // Replace with appropriate function
			hide: () => {} // Replace with appropriate function
		};

		// the code below means that the settings are loaded from the plugin data
		return this.plugin.loadData().then((data) => {
			return {...defaultSettings, ...data}; // returning the merged settings so that later we can use the default settings
		});
	}
}

export default SettingsHelper
