(function (common) {
    'use strict';

	common.Updater = class Updater {
		constructor(viewer) {
			this._viewer = viewer;
		}

		start() {
			this._now0 = Date.now();
			this.update();
		}

		update() {
			const now0 = this._now0;
			const viewer = this._viewer;
			const now = Date.now();
			let time = (now - now0) * 0.001;
			viewer.diagram.data.each((id) => {
				time += 1;
				const value = Math.sin(time);
				viewer.diagram.data.set(id, value, now);
			});
			viewer.application.update();
			setTimeout(() => this.update(), 32);
		}
	}
}(window.common ||= {}));
