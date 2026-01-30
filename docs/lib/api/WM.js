"use strict";
class WMAPI {
	windows = [];
	create(ctx, info) {
		const win = AliceWM.create(info, ctx);
		win.focus();
		win.addEventListener("focus", (event) => {
			//@ts-ignore
			document.activeElement?.blur();
			alttab.update();
			taskbar.element.style.zIndex = getHighestZindex() + 3 + "";
		});
		win.addEventListener("resize", (event) => {});
		win.addEventListener("close", (event) => {
			this.windows = this.windows.filter((w) => w.deref() !== win);
		});
		win.addEventListener("maximize", () => {
			taskbar.maximizedWins.push(win);
			taskbar.updateRadius();
		});
		win.addEventListener("unmaximize", () => {
			taskbar.maximizedWins = taskbar.maximizedWins.filter((w) => w !== win);
			taskbar.updateRadius();
		});
		win.addEventListener("snap", (event) => {
			taskbar.updateRadius();
		});
		ctx.windows.push(win);
		this.windows.push(new WeakRef(win));
		taskbar.updateTaskbar();
		alttab.update();
		return win;
	}
	createGeneric(info) {
		return this.create.call(this, anura.apps["anura.generic"], info);
	}
}
//# sourceMappingURL=WM.js.map
