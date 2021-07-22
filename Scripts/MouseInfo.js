export default class MouseInfo {

	constructor(canv) {
		this.Pos =
		{
			X: -1,
			Y: -1
		};
		this.Click = false;
		this.clickedLastFrame = false;
		this.justClicked = false;
		this.canvas = canv;
	};

	Update() {
		if (this.Click) {
			if (!this.clickedLastFrame) {
				this.justClicked = true;
			}
			else {
				this.justClicked = false;
			}
			this.clickedLastFrame = true;
		}
	};

	ClickStart(e, touch) {
		if (touch) {
			this.Pos = this.GetMousePos(e.changedTouches[0]);
		}
		else {
			this.Pos = this.GetMousePos(e);
		}

		this.Click = true;
	};

	ClickEnd(e) {
		this.Pos.x = -1;
		this.Pos.y = -1;
		this.Click = false;
		this.clickedLastFrame = false;
	};

	GetMousePos(e) {
		var r = canvas.getBoundingClientRect();
		return {
			X: e.clientX - r.left,
			Y: e.clientY - r.top
		};
	};
};