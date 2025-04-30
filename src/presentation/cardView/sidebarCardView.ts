import MindCardPlugin from "main";
import {ItemView, Modal, WorkspaceLeaf} from "obsidian";
import { renderCardList } from "./atomicRenderers";
import generateUUID from "generators";

class SidebarCardView extends ItemView{
    plugin:  MindCardPlugin;
    searchInput: HTMLInputElement;
    cardList: HTMLElement;
    static viewType = "sidebar-card-view";

    constructor(leaf: WorkspaceLeaf){
        super(leaf);
		this.plugin = MindCardPlugin.getInstance();
    }

    getViewType(): string {
        return SidebarCardView.viewType;
    }
    getDisplayText(): string {
        return "Sidebar Card View";
    }

    async onOpen(){
        const {containerEl} = this;
        containerEl.empty();

        containerEl.addClass("sidebar-card-view");

        //searchbar
        const searchContainer = this.contentEl.createDiv({cls: 'card-search-container'});
        this.searchInput = searchContainer.createEl('input', {
            type: 'text',
            placeholder: 'Search cards...'
        });
		this.searchInput.addEventListener('input', (e) => {
			// this.renderCardList(this.searchInput.value);
		});

        containerEl.appendChild(this.searchInput)

		//Action
		const actionContainer = this.contentEl.createDiv({cls: 'card-action-container'});

		const newCollectionButton = actionContainer.createEl('button', {
			text: 'New Collection',
		});
		newCollectionButton.addEventListener('click', () => {
			// Handle new collection creation
			this.createNewCollection();
		});

		// Collection Section
		containerEl.createEl("hr")
		containerEl.createDiv({cls:"tree-item-self", text: 'Collections'});
		this.cardList = containerEl.createDiv({cls: 'card-list'});
		renderCardList(this.cardList, this.searchInput);

    }
	// addAction(icon: IconName, title: string, callback: (evt: MouseEvent) => any): HTMLElement {
		
	// }

	async onClose() {
		const {containerEl} = this;
		containerEl.empty();
		// Perform any cleanup tasks here
		// this.searchInput.remove();
		// this.cardList.remove();
	}

	async createNewCollection(){
		const modal = new NewCollectionModal((name: string, description: string) => {
			// Handle the submitted data here
			console.log("New Collection Created:", { name, description });
			const newCollection: CardCollection = {
				id: generateUUID(),
				name: name,
				description: description,
				cardIds: [],
				createdAt: Date.now(),
				updatedAt: Date.now(),
			};
			// You can add logic to update the UI or save the collection
			this.refresh()
		});
		modal.open();
	}
}

// Madal is a class that represents a modal dialog in Obsidian
// This modal will be used to create a new collection
class NewCollectionModal extends Modal{
	onSubmit: (name: string, description: string) => void; // This will be called when the form is submitted
	nameEl: HTMLInputElement; // Input field for the collection name
	descriptionEl: HTMLTextAreaElement; // Input field for the collection description

	constructor(onSubmit: (name: string, description: string) => void){
		super(MindCardPlugin.getInstance().app);
		this.onSubmit = onSubmit;
	}

	onOpen(){
		const {contentEl} = this; // this means the modal itself is the contentEl. How we will see it? -> we will see it in the app as a modal's contentEl
		contentEl.createEl('strong', {text: 'Create a new collection'}); // Create a title for the modal

		// Name
		contentEl.createEl('label', {text: 'Name'});
		this.nameEl = contentEl.createEl('input', {
			type: 'text',
			placeholder: 'Collection Name',
		});

		// Description
		contentEl.createEl('label', { text: 'Description' });
		this.descriptionEl = contentEl.createEl('textarea', {
			placeholder: 'Describe your collection'
		})
		this.descriptionEl.rows = 3;

		// Buttons
		const btnContainer = contentEl.createDiv({cls: 'card-modal-button'});


	}
}

export default SidebarCardView
