import {Plugin} from 'obsidian';

export default class ExamplePlugin extends Plugin{

statusBarTextElement: HTMLSpanElement;

 onload(){


	this.app.workspace.on('active-leaf-change', async () => {
	const file = this.app.workspace.getActiveFile();

	if(file){
		const content = await this.app.vault.read(file);
		this.updateLineCount(content);
	} else {
		this.statusBarTextElement.textContent = 'No active file';
	}
	})	

	this.app.workspace.on('editor-change', editor => {
		const content = editor.getDoc().getValue();
		this.updateLineCount(content);

	} );

}

private updateLineCount(fileContent: string) {
	console.log('Updating line count...');


	const lineCount = fileContent.split('\n').length;
	this.statusBarTextElement.textContent = `Lines: ${lineCount}`;
	

}
} 