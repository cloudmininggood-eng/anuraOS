interface SystrayInit {
	onclick: (event: MouseEvent) => void;
	onrightclick: (event: MouseEvent) => void;
	icon: string;
	tooltip: string;
}
declare class SystrayIcon {
	element: HTMLImageElement;
	onclick: (event: MouseEvent) => void;
	onrightclick: (event: MouseEvent) => void;
	constructor(init?: SystrayInit);
	get icon(): string;
	set icon(value: string);
	get tooltip(): string;
	set tooltip(value: string);
	destroy: () => void;
}
declare class Systray {
	element: HTMLSpanElement;
	icons: SystrayIcon[];
	constructor();
	create(init?: SystrayInit): SystrayIcon;
}
