import MindCardPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { FolderSuggest } from "./utils/fileSuggester";

export class MainMindMapperSettingsTab extends PluginSettingTab {
	plugin: MindCardPlugin;

	constructor(app: App, plugin: MindCardPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Default Note File Path')
			.setDesc('Set you main database path here')
            .addSearch((cb) => {
                new FolderSuggest(this.plugin.app, cb.inputEl);
                cb.setPlaceholder("Example: folder1/folder2")
                    .setValue(this.plugin.settings.databasePath)
                    .onChange(async (new_folder) => {
                        this.plugin.settings.databasePath = new_folder;
                        await this.plugin.saveData(this.plugin.settings);
                    });
                // @ts-ignore
                cb.containerEl.addClass("dump_path_search");
            });
	}
}
