import { PluginSettingTab } from "obsidian";

interface MindMapperSettings extends PluginSettingTab {
	databasePath: string;
	
}

export default MindMapperSettings;
