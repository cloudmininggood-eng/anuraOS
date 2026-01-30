declare class ContextMenu {
	large: boolean;
	private isShown;
	private element;
	item(text: string, callback: VoidFunction, icon?: string): JSX.Element;
	constructor(large?: boolean);
	addItem(text: string, callback: VoidFunction, icon?: string): void;
	removeAllItems(): void;
	show(x: number, y: number): JSX.Element;
	hide(): void;
}
