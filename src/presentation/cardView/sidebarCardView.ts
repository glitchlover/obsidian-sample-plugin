import MindMapperPlugin from "main";
import { ItemView, WorkspaceLeaf} from "obsidian";

class SideebarCardView extends ItemView{
    plugin:  MindMapperPlugin = MindMapperPlugin.getInstance();
    searchInput: HTMLInputElement;
    cardList: HTMLElement;
    static viewType = "sidebar-card-view";

    constructor(leaf: WorkspaceLeaf){
        super(leaf);
    }

    getViewType(): string {
        return SideebarCardView.viewType;
    }
    getDisplayText(): string {
        return "Sidebar Card View";
    }

    async onOpen(){
        const {containerEl} = this;
        containerEl.empty();

        containerEl.addClass("sidebar-card-view");

        containerEl.createEl("h4", {text: this.getDisplayText()})

        //searchbar
        const searchContainer = this.contentEl.createDiv({cls: 'card-search-container'});
        this.searchInput = searchContainer.createEl('input', {
            type: 'text',
            placeholder: 'Search cards...'
        })

        containerEl.appendChild(this.searchInput)
    }

	async onClose() {
		const {containerEl} = this;
		containerEl.empty();
		// Perform any cleanup tasks here
		// this.searchInput.remove();
		// this.cardList.remove();
	}
}

export default SideebarCardView
