declare class WMAPI {
	windows: WeakRef<WMWindow>[];
	create(ctx: App, info: WindowInformation | string): WMWindow;
	createGeneric(info: WindowInformation | string): WMWindow;
}
