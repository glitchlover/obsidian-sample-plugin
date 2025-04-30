import MindCardPlugin from "main";
import { Modal } from "obsidian";

class CollectionModal extends Modal{
	plugin: MindCardPlugin;
	collection: CardCollection;

	constructor(collection: CardCollection){
		const plugin = MindCardPlugin.getInstance();
		super(plugin.app);
		this.plugin = plugin;
		this.collection = collection;
	}

	onOpen(){
		// TODO: Implement the modal content
	}

}

export default CollectionModal;
