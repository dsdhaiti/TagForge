# TagForge

<p align="left">
  <a href="https://www.buymeacoffee.com/yourusername" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="25" />
  </a>
</p>

TagForge is an [Obsidian](https://obsidian.md/) plugin that automatically generates unique tags for your notes and manages a tag index for each project subfolder. This helps you reference and organize your notes more efficiently within your vault.

---

## Features

-   **Automatic Tag Generation:**  
    Generates a unique tag (first 7 characters of a SHA-512 hash) for each note, inserted at the top of the file just like Git.

-   **Status Bar Integration:**  
    Displays the tag for the active note in the status bar. If no tag exists, a "Generate Tag" button is shown.

-   **Per-Folder Tag Manager:**  
    Maintains a `tag-manager.md` file in each first-level subfolder, listing all tags and their corresponding notes as Obsidian wiki links.

-   **Automatic Tag Removal:**  
    If a tag is removed from a note, the corresponding entry is also removed from the folder's tag manager.

---

## Usage

1. **Open any note** in a subfolder of your vault.
2. **Check the status bar** at the bottom of Obsidian:
    - If the note already has a tag (e.g., `#tag-abcdef1` at the top), it will be displayed.
    - If not, a "Generate Tag" button will appear.
3. **Click "Generate Tag"** to insert a tag at the top of your note.
4. The plugin will automatically update (or create) a `tag-manager.md` file in the first-level subfolder, listing all tags and their associated notes as links.

---

## Installation

1. **Manual Installation**

    1. Download or clone this repository.
    2. Copy the `TagForge` folder into your vault's `.obsidian/plugins/` directory.
    3. Make sure the folder contains `main.ts`, `manifest.json`, and this `README.md`.
    4. Enable the plugin in Obsidian's Settings → Community Plugins.

2. **From Obsidian Community Plugins (when available)**
    - Search for "TagForge" in the Community Plugins browser and install it directly.

---

## Tag Manager File

-   Located at:  
    `<YourVault>/<FirstSubfolder>/tag-manager.md`
-   Format (one entry per note):

### 1. Generating a Tag

-   Open `Experiment1.md` in Obsidian.
-   Click the **"Generate Tag"** button in the status bar.
-   The plugin inserts a tag at the top of the note:

    ```
    #tag-1a2b3c4
    ```

### 2. Tag Manager File

-   The plugin creates or updates `Research/tag-manager.md` with an entry for each tagged note in the folder:

    ```
    #tag-1a2b3c4 - [[Experiment1]]
    #tag-4d5e6f7 - [[Experiment2]]
    ```

-   Each entry links the tag to the corresponding note using Obsidian's wiki link format.

### 3. Removing a Tag

-   If you delete the tag line from `Experiment1.md`, the plugin will automatically remove its entry from `tag-manager.md`.

---

This workflow ensures every note in your project folder can be uniquely referenced and easily found via the tag manager file.

---

## Limitations

-   Only works for notes inside subfolders (not root-level notes).
-   Only one tag per note is managed.
-   The tag manager is created per first-level subfolder.

---

## Contributing

Pull requests and suggestions are welcome!  
Please open an issue or submit a PR on [GitHub](https://github.com/your-repo/tagforge) (replace with your actual repo link).

---

## License

MIT License

---

## Author

Created by [sddhaiti]()  
[Obsidian](https://obsidian.md)
