# About Obsidian API
Also see [[Obsidian API Phillosopy]]
---

# Obsidian API Classes and Methods for Card Plugin
- [About Obsidian API](#about-obsidian-api)
	- [Also see \[\[Obsidian API Phillosopy\]\]](#also-see-obsidian-api-phillosopy)
- [Obsidian API Classes and Methods for Card Plugin](#obsidian-api-classes-and-methods-for-card-plugin)
	- [Core Application Access](#core-application-access)
	- [Lifecycle and Event Management](#lifecycle-and-event-management)
	- [File and Metadata Management](#file-and-metadata-management)
	- [UI and Workspace Management](#ui-and-workspace-management)
	- [UI Components and Interactions](#ui-components-and-interactions)
	- [Markdown Rendering and Processing](#markdown-rendering-and-processing)
	- [Editor Interaction](#editor-interaction)
	- [Plugin Development](#plugin-development)
	- [File and Folder Representation](#file-and-folder-representation)

## Core Application Access
These classes provide access to the core application and its components:
- **App**: Provides access to the core application, including metadata, vault, and workspace.
  - `app.metadataCache`: Provides access to the cached metadata of notes.
  - `app.vault`: Gives access to the file system and operations.
  - `app.workspace`: Access to the UI workspace.

---

## Lifecycle and Event Management
These classes manage plugin lifecycle and event handling:
- **Component**: Base class for managing plugin lifecycle and registering events.
  - `Component.onunload()`: Clean up resources when the plugin is disabled.
  - `Component.registerEvent()`: Register event handlers that are automatically removed when unloaded.
- **EventRef**: Represents a reference to an event, used for cleanup when the event is no longer needed.

---

## File and Metadata Management
These classes handle file operations and metadata access:
- **DataAdapter**: Handles file system operations like reading, writing, and deleting files.
  - `DataAdapter.read()`: Read file content.
  - `DataAdapter.write()`: Write content to a file.
  - `DataAdapter.remove()`: Remove a file.
- **FileManager**: Provides methods to create, rename, and manage markdown files.
  - `FileManager.createNewMarkdownFile()`: Create a new markdown file.
  - `FileManager.renameFile()`: Rename a file.
  - `FileManager.processFrontMatter()`: Process/update frontmatter of a file.
- **MetadataCache**: Provides access to cached metadata of files and allows reacting to metadata changes.
  - `MetadataCache.getFileCache()`: Get metadata for a specific file.
  - `MetadataCache.getCache()`: Get all cached metadata.
  - `MetadataCache.on('changed')`: React to metadata changes.
- **Vault**: Handles file operations like creating, reading, modifying, and deleting files.
  - `Vault.create()`: Create a new file.
  - `Vault.delete()`: Delete a file.
  - `Vault.read()`: Read file content.
  - `Vault.modify()`: Modify file content.
  - `Vault.on('modify')`: React to file modifications.
  - `Vault.getAllLoadedFiles()`: Get all loaded files.

---

## UI and Workspace Management
These classes manage the user interface and workspace layout:
- **Workspace**: Manages the UI workspace, including active files, views, and layout events.
  - `Workspace.getActiveFile()`: Get the active file.
  - `Workspace.getActiveViewOfType()`: Get active view of a specific type.
  - `Workspace.onLayoutReady()`: Execute code when layout is ready.
  - `Workspace.on('file-open')`: React to file open events.
  - `Workspace.on('editor-change')`: React to editor changes.
  - `Workspace.on('active-leaf-change')`: React to active leaf changes.
- **WorkspaceLeaf**: Represents a single view in the workspace, with methods to get and set its state.
  - `WorkspaceLeaf.getViewState()`: Get the state of the view.
  - `WorkspaceLeaf.setViewState()`: Set the state of the view.

---

## UI Components and Interactions
These classes provide tools for creating and managing UI components:
- **ItemView**: Base class for creating custom views in Obsidian.
  - `ItemView.onOpen()`: Called when the view is opened.
  - `ItemView.onClose()`: Called when the view is closed.
- **Modal**: Base class for creating modal dialogs for user interaction.
  - `Modal.open()`: Open the modal.
  - `Modal.close()`: Close the modal.
- **Menu**: Allows adding custom menu items to context menus.
  - `Menu.addItem()`: Add menu items to context menus.
- **Hover**: Handles hover popups for displaying additional information.
  - `Hover.hoverEl`: Use to display hover popups for cards.
  - `Hover.show()`: Show hover information.
  - `Hover.hide()`: Hide hover information.
- **Notice**: Displays notifications to the user.
  - `new Notice()`: Display notifications to the user.

---

## Markdown Rendering and Processing
These classes handle markdown rendering and post-processing:
- **MarkdownPostProcessor**: Allows post-processing of markdown during rendering for custom elements.
- **MarkdownPostProcessorContext**: Provides context for markdown post-processing, including access to elements and source text.
- **MarkdownPreviewRenderer**: Renders markdown content into HTML for preview purposes.
  - `MarkdownPreviewRenderer.render()`: Render markdown to HTML.
- **MarkdownView**: Provides access to both the editor and preview of a markdown file.
  - `MarkdownView.getViewData()`: Get the data from the view.
  - `MarkdownView.setViewData()`: Set the data of the view.

---

## Editor Interaction
These classes provide methods to interact with the text editor:
- **Editor**: Provides methods to interact with the text editor, such as selection and cursor manipulation.
  - `Editor.getSelection()`: Get selected text from the editor.
  - `Editor.replaceSelection()`: Replace selected text with new text.
  - `Editor.setCursor()`: Set cursor position.

---

## Plugin Development
These classes and methods are used for developing plugins:
- **Plugin**: Base class for all plugins, providing methods to register views, commands, and settings.
  - `Plugin.registerView()`: Register a custom view.
  - `Plugin.registerMarkdownPostProcessor()`: Register a markdown post processor.
  - `Plugin.addCommand()`: Add commands to the command palette.
  - `Plugin.addSettingTab()`: Add a settings tab for the plugin.
- **PluginSettingTab**: Provides a base class for creating settings UI for plugins.
  - `PluginSettingTab.display()`: Display the settings.
- **Setting**: Provides methods to add UI elements like text inputs, toggles, and dropdowns to settings.
  - `Setting.addText()`: Add text input to settings.
  - `Setting.addToggle()`: Add toggle switch to settings.
  - `Setting.addDropdown()`: Add dropdown selector to settings.
- **SuggestModal**: Base class for creating suggestion modals, useful for selecting items like cards.
  - `SuggestModal.getSuggestions()`: Get suggestions based on input.
  - `SuggestModal.renderSuggestion()`: Render a suggestion item.
  - `SuggestModal.onChooseSuggestion()`: Handle suggestion selection.

---

## File and Folder Representation
These classes represent files and folders in the vault:
- **TAbstractFile**: Represents a base interface for files and folders, containing path and name properties.
- **TFile**: Represents a file in the vault, providing file stats and operations.
- **TFolder**: Represents a folder in the vault, with methods for creating and managing files.
