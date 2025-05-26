import {Plugin, TFile} from 'obsidian';

export default class ExamplePlugin extends Plugin{

    statusBarTextElement: HTMLElement;
    statusTextSpan: HTMLSpanElement;
    generateTagButton: HTMLButtonElement | null = null;

    onload() {
        // Create the status bar item and a span for the text
        this.statusBarTextElement = this.addStatusBarItem();
        this.statusTextSpan = document.createElement('span');
        this.statusBarTextElement.appendChild(this.statusTextSpan);

        this.app.workspace.on('active-leaf-change', async () => {
            await this.checkAndDisplayTag();
        });
    }

    private async checkAndDisplayTag() {
        const file = this.app.workspace.getActiveFile();
        if (!file) {
            this.statusTextSpan.textContent = 'No active file';
            this.removeGenerateTagButton();
            return;
        }

        const content = await this.app.vault.read(file);
        const tagMatch = content.match(/^#tag-[a-f0-9]{7}/m);

        if (tagMatch) {
            this.statusTextSpan.textContent = `Tag: ${tagMatch[0]}`;
            this.removeGenerateTagButton();
        } else {
            this.statusTextSpan.textContent = 'No tag found';
            this.showGenerateTagButton(file, content);
        }
    }

    private showGenerateTagButton(file: TFile, content: string) {
        this.removeGenerateTagButton();
        this.generateTagButton = document.createElement('button');
        this.generateTagButton.textContent = 'Generate Tag';
		this.generateTagButton.style.marginLeft = '8px';

        this.generateTagButton.onclick = async () => {
            const tag = await this.generateTagFromContent(content);
            const newContent = `#tag-${tag}\n${content}`;
            await this.app.vault.modify(file, newContent);
            this.statusTextSpan.textContent = `Tag: #tag-${tag}`;
            this.removeGenerateTagButton();
        };
        this.statusBarTextElement.appendChild(this.generateTagButton);
    }

    removeGenerateTagButton() {
        if (this.generateTagButton && this.generateTagButton.parentElement) {
            this.generateTagButton.parentElement.removeChild(this.generateTagButton);
        }
        this.generateTagButton = null;
    }

    private async generateTagFromContent(content: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(content);
        const hashBuffer = await window.crypto.subtle.digest('SHA-512', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex.slice(0, 7);
    }
}