import MindCardPlugin from "main";

class DatabaseHelpers{
	db: CardDatabase;
	async loadDatabase(): Promise<CardDatabase>{
		return this.db = await MindCardPlugin.getInstance().loadData() || {
			cards: {},
			// collections: {},
			metadata: {
				version: "1.0.0",
				lastSync: Date.now()
			}
		};
	}

	async saveDatabase(): Promise<void>{
		await MindCardPlugin.getInstance().saveData(this.db);
	}
}

export default DatabaseHelpers;
