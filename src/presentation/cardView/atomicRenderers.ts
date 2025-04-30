import MindCardPlugin from "main";
import CollectionModal from "../modals/collectionModals";
import { Notice } from "obsidian";


export function renderCollections(container: HTMLElement){
	const plugin: MindCardPlugin = MindCardPlugin.getInstance();
	container.empty();
	const collections = Object.values(plugin.db.collections);
	if(collections.length === 0){
		container.createEl("p", {text: "No collections found."});

	}

	collections.forEach((collection) => {
		const collectionEl = container.createDiv({cls: "collection-item"});
		collectionEl.createEl('span', {text: collection.name, cls: 'collection-name'});
		collectionEl.addEventListener('click', () => {
			// Handle collection click
			openCollection(collection.id);
		})
	});
}

export function renderCardList(cardList: HTMLElement, searchInput: HTMLInputElement){
	const plugin: MindCardPlugin = MindCardPlugin.getInstance();

	const searchTerm = searchInput.value.toLowerCase();
	const cards = Object.values(plugin.db.cards);

	const filteredCards = searchTerm ? 
		cards.filter((card) =>
			card.content.toLowerCase().includes(searchTerm) ||
			card.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
		) : cards;

		if (filteredCards.length === 0){
			cardList.createEl("p", {text: "No cards found."});
		}
}

function openCollection(collectionId: string){
	const plugin: MindCardPlugin = MindCardPlugin.getInstance();

	const collection = plugin.db.collections[collectionId];
	if(!collection){
		new Notice("Collection not found.");
		return;
	}
	const modal = new CollectionModal(collection);
	modal.open();
}
