export default class BoundingBox {
	x = 0;
	y = 0;
	w = 0;
	h = 0;

	constructor(x,y,w,h) {
		this.Resize(x, y, w, h);
	};

	//this.x = x;
	//this.y = y;
	//this.w = w;
	//this.h = h;
	//this.Top = this.y;
	//this.Bottom = this.y + this.h;
	//this.Left = this.x;
	//this.right = this.x + this.w;

	Contains (Point) {
		if (Point.X === undefined || Point.X === null || Point.Y === undefined || Point.Y === null) {
			console.log('BoundingBox contains received invalid Point');
        }
		if (Point.X >= this.Left && Point.X <= this.Right && Point.Y >= this.Top && Point.Y <= this.Bottom) {
			return true;
		}
		return false;
	};

	Draw (MyColor = 'rgb(0, 0, 0)') {
		var priorFillStyle = ctx.fillStyle;
		ctx.fillStyle = MyColor;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.fillStyle = priorFillStyle;
	};

	Update (x, y) {
		this.x = x;
		this.y = y;
	};

	Resize(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.Top = this.y;
		this.Bottom = this.y + this.h;
		this.Left = this.x;
		this.Right = this.x + this.w;
	};
}