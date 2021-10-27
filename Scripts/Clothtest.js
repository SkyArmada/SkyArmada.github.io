import MouseInfo from './MouseInfo.js';

var canvas = document.getElementById('canvasString');
var ctx = canvas.getContext('2d');
var theme = 'Diglett';

var dot = new Image();

var dots = new Array();
var Mouse = new MouseInfo(canvas);
var startTimer = 0;
var stringLength = 10;
function Dot(px, py, dx, dy, speed, color, parent) {
	this.Pinned = false;
	this.followMouse = false;
	this.Parent = parent;
	this.Pos = {
		X: px,
		Y: py
	};
	this.Color = color;
	this.Direction = {
		X: dx,
		Y: dy
	};
	this.Speed = speed;
	this.Active = false;

	Dot.prototype.Activate = function (px, py, dx, dy, speed) {
		this.Pos = {
			X: px,
			Y: py
		};

		this.Direction = {
			X: dx,
			Y: dy
		};
		this.Active = true;
	};

	Dot.prototype.Update = function (dt) {
		if (this.followMouse) {
			if (Mouse.RightClick == false) {
				this.followMouse = false;
				var parentFound = false;
				var closest = this;
				var distanceP = 999999;
				for (var i = 0; i < dots.length; i++) {
					
					var distance = Math.hypot(this.Pos.X - dots[i].Pos.X, this.Pos.Y - dots[i].Pos.Y) / 100;
					if (distance == 0) {
						continue;
                    }
					if (distance < 0.5) {
						if (distance < distanceP) {
							closest = dots[i];
							distanceP = distance;
						}
						parentFound = true;
					}
				}
				if (parentFound) {
					if (closest.Parent) {
						if (closest.Parent.Pos.X != this.Pos.X && closest.Parent.Pos.Y != this.Pos.Y) {
							this.Parent = closest;
						}
					}
					else {
						this.Parent = closest;
                    }


				}
			}
			else {
				this.Pos.X = Mouse.Pos.X;
				this.Pos.Y = Mouse.Pos.Y;
				var g = document.querySelector('#cbGravity');
				var stringLengthtxt = document.querySelector('#txtStrLength');
				var gravPow = document.querySelector('#txtGrav');
				var pullStre = document.querySelector('#txtPullStr');

				if (this.Pinned) {
					ctx.fillStyle = 'rgb(0, 255, 255)';

				}
				else if (!this.Parent) {
					ctx.fillStyle = 'rgb(200, 120, 120)';

				}
				else {
					ctx.fillStyle = 'rgb(255, 0, 0)';

				}
				ctx.fillRect(this.Pos.X, this.Pos.Y, 4, 4);
				if (this.Parent) {
					var distance = Math.hypot(this.Parent.Pos.X - this.Pos.X, this.Parent.Pos.Y - this.Pos.Y);
					if ((distance) >= stringLengthtxt.value) {
						this.Pos.Y += (speed * dt) * (this.Direction.Y * (distance * pullStre.value));
						this.Pos.X += (speed * dt) * (this.Direction.X * (distance * pullStre.value));
					}
					ctx.beginPath();
					ctx.moveTo(Mouse.Pos.X, Mouse.Pos.Y);
					ctx.lineTo(this.Parent.Pos.X + 2, this.Parent.Pos.Y + 2);
					if (distance > 90) {
						this.Parent = null;
					}
					ctx.lineWidth = 90 - (distance);
					if (ctx.lineWidth > 5) {
						ctx.lineWidth = 5;
                    }
					ctx.strokeStyle = "#FF0000";
					ctx.stroke();
                }


				return;
            }

        }
		if (!this.Pinned) {

			var g = document.querySelector('#cbGravity');
			var stringLengthtxt = document.querySelector('#txtStrLength'); 
			var gravPow = document.querySelector('#txtGrav');
			var pullStre = document.querySelector('#txtPullStr');
			if (g.checked) {
				this.Pos.Y += (gravPow.value * dt)
			}
			if (this.Parent) {
				speed = 0.01;
				var myradians = Math.atan2(this.Parent.Pos.Y - this.Pos.Y, this.Parent.Pos.X - this.Pos.X)
				this.Direction.Y = Math.sin(myradians);
				this.Direction.X = Math.cos(myradians);

				var distance = Math.hypot(this.Parent.Pos.X - this.Pos.X, this.Parent.Pos.Y - this.Pos.Y);
				if ((distance) >= stringLengthtxt.value) {
					this.Pos.Y += (speed * dt) * (this.Direction.Y * (distance * pullStre.value));
					this.Pos.X += (speed * dt) * (this.Direction.X * (distance * pullStre.value));
				}
				ctx.beginPath();
				ctx.moveTo(this.Pos.X + 2, this.Pos.Y + 2);
				ctx.lineTo(this.Parent.Pos.X + 2, this.Parent.Pos.Y + 2);
				if (distance > 90) {
					this.Parent = null;
                }
				ctx.lineWidth = 90 - (distance);
				if (ctx.lineWidth > 5) {
					ctx.lineWidth = 5;
				}
				ctx.strokeStyle = "#FF0000";
				ctx.stroke();
            }

		}
		if (this.Pinned) {
			ctx.fillStyle = 'rgb(0, 255, 255)';

		}
		else if (!this.Parent) {
			ctx.fillStyle = 'rgb(200, 120, 120)';

		}
		else {
			ctx.fillStyle = 'rgb(255, 0, 0)';

        }
		ctx.fillRect(this.Pos.X, this.Pos.Y, 4, 4);
	};

	Dot.prototype.Deactivate = function () {
		this.Active = false;
	};


};

function InitCanvas(theme) {
	dot.src = '/Content/Assets/img/' + theme + '/dot.png';
	CreateMoles(10);
	window.requestAnimationFrame(DrawGame);
}

function DrawGame(timer) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '24px sans-serif';

	var deltaTime = timer - startTimer;

	Mouse.Update();

	if (Mouse.justClicked) {
		var parentFound = false;
		var closest = dots[0];
		var distanceP = 999999;
		for (var i = 0; i < dots.length; i++) {
			var distance = Math.hypot(Mouse.Pos.X - dots[i].Pos.X, Mouse.Pos.Y - dots[i].Pos.Y) / 100;
			if (distance < 0.5) {
				var r = getRandomInt(255);
				var g = getRandomInt(255);
				var b = getRandomInt(255);
				if (distance < distanceP) {
					closest = dots[i];
					distanceP = distance;
                }
				parentFound = true;
			}
		}
		if (!parentFound) {
			var newMole = new Dot(Mouse.Pos.X, Mouse.Pos.Y, 0, 0.2, 0.02, 'rgb(' + r + ', ' + g + ', ' + b + ')', null);
			dots.push(newMole);
		}
		else {
			var newMole = new Dot(Mouse.Pos.X, Mouse.Pos.Y, 0, 0.2, 0.02, 'rgb(' + r + ', ' + g + ', ' + b + ')', closest);
			dots.push(newMole);
        }
	}

	if (Mouse.rightClicked) {
		for (var i = 0; i < dots.length; i++) {
			var distance = Math.hypot(Mouse.Pos.X - dots[i].Pos.X, Mouse.Pos.Y - dots[i].Pos.Y);
			if (distance < 6) {
				
				dots[i].followMouse = true;
				//dots[i].Parent = null;
				break;
            }
		}
    }

	for (var i = 0; i < dots.length; i++) {
		dots[i].Update(deltaTime);

	}
	startTimer = timer;

	window.requestAnimationFrame(DrawGame);
};

function CreateMoles(numMoles) {
	var px = 50;//getRandomInt(canvas.width);
	var py = 50;//getRandomInt(canvas.height);
	var dx = 0;//Math.random();
	var dy = 0.2;//Math.random();

	var speed = 0.02;//getRandomInt(2);
	if (getRandomInt(100) % 2 == 0) {
		dx *= -1;
	}

	if (getRandomInt(100) % 2 == 0) {
		dy *= -1;
	}

	var r = getRandomInt(255);
	var g = getRandomInt(255);
	var b = getRandomInt(255);

	var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
	var newMole = new Dot(px, py, dx, dy, speed, color, null);
	var prevMole = newMole;
	dots.push(newMole);
	//for (var i = 0; i < numMoles; i++) {

	//	 px = 30 * (i+1);
	//	py = 0 * (i + 1);
	//	dx = 0;//Math.random();
	//	dy = 0.02;//Math.random();

	//	 speed = 0.02;//getRandomInt(2);
	//	if (getRandomInt(100) % 2 == 0) {
	//		dx *= -1;
	//	}

	//	if (getRandomInt(100) % 2 == 0) {
	//		dy *= -1;
	//	}

	//	 r = getRandomInt(255);
	//	 g = getRandomInt(255);
	//	 b = getRandomInt(255);

	//	var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

	//	var newMole = new Dot(px, py, dx, dy, speed, color, prevMole);
	//	prevMole = newMole;
	//	dots.push(newMole);
	//}
};

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
};

canvas.addEventListener('mousemove', function (e) {
	Mouse.Pos = Mouse.GetMousePos(e);
});

canvas.addEventListener('mousedown', function (e) {
	e.preventDefault();
	if (e.button == 2) {
		Mouse.RightClickStart(e);

	} else {
		Mouse.ClickStart(e, false);

	}
});

canvas.addEventListener('mouseup', function (e) {

	e.preventDefault();
	if (e.button == 2) {

		Mouse.RightClickEnd(e);

	} else {
		Mouse.ClickEnd(e);

	}
});

canvas.addEventListener('touchstart', function (e) {
	e.preventDefault();
	Mouse.ClickStart(e, true);
});

canvas.addEventListener('touchend', function (e) {
	Mouse.ClickEnd(e);
});


document.getElementById('canvasString').addEventListener('keypress', function (e) {
	if (e.key == " ") {
		var px = Mouse.Pos.X;//getRandomInt(canvas.width);
		var py = Mouse.Pos.Y;//getRandomInt(canvas.height);
		var dx = 0;//Math.random();
		var dy = 0.2;//Math.random();

		var speed = 0.02;//getRandomInt(2);
		if (getRandomInt(100) % 2 == 0) {
			dx *= -1;
		}

		if (getRandomInt(100) % 2 == 0) {
			dy *= -1;
		}

		var r = getRandomInt(255);
		var g = getRandomInt(255);
		var b = getRandomInt(255);

		var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		var newMole = new Dot(px, py, dx, dy, speed, color, null);
		var prevMole = newMole;
		newMole.Pinned = true;
		dots.push(newMole);
    }
});

function CheckMouseHover(mousePos, theRect) {
	if (mousePos.X >= theRect.x && mousePos.X <= (theRect.x + theRect.w)) {
		if (mousePos.Y >= theRect.y && mousePos.Y <= (theRect.y + theRect.h)) {
			return true;
		}
	}
	return false;
}

export default InitCanvas;