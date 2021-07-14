var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var hole = new Image();
//hole.src = 'data:image/png;base64,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';
hole.src = '/Content/Assets/img/hole.png'

var startTimer;

var countDown = 3000;

var MoleSpawnTimer = 3000;

function Mole(dx, dy, num) {

	this.Pos = {
		X: dx,
		Y: dy
	};
	this.Number = num;
	this.Active = false;
	this.AnimFrame = 0;
	this.FrameTime = 0;
	this.ActiveTime = 0;
	this.MoleFPS = 1000 / 6;
	this.AnimLoops = false;
	Mole.prototype.Activate= function() {
		this.AnimFrame = 0;
		this.FrameTime = 0;
		this.ActiveTime = 0;
		this.Active = true;
	};

	Mole.prototype.Update = function(dt) {
		if (this.Active) {
			this.ActiveTime += dt;

			if (this.ActiveTime > GameSettings.BoomTime) {
				this.Deactivate();
				Boom();
			}

			this.FrameTime += dt;

			if (this.FrameTime >= this.MoleFPS) {
				this.FrameTime -= this.MoleFPS;
				this.AnimFrame++;
				if (!this.AnimLoops && this.AnimFrame >= 3) {
					this.AnimFrame = 3;
				}
				if (this.AnimFrame > 3 && this.AnimLoops) {
					this.AnimFrame = 1;
				}
			}
        }
	};

	Mole.prototype.Deactivate = function() {
		this.Active = false;
		this.AnimFrame = 0;
		this.FrameTime = 0;
		this.ActiveTime = 0;
		GameSettings.ActiveMoles--;
	};
};

var moles = new Array();

var MouseInfo =
{
	mousePos:
	{
		x: -1,
		y: -1
	},
	MouseClick: false,
	clickedLastFrame: false,
	justClicked: false
};

var GameSettings =
{
	holes: 9,
	score: 0,
	holesPerRow: 3,
	Punish: 50,
	Started: false,
	XBuffer: 60,
	YBuffer: 60,
	Moles: 1,
	BoomTime: 1500,
	ActiveMoles: 0,
	MoleMinTime: 2500,
	MoleTimerStart: 2500,
	Difficulty: "Easy",
	EasyScore: 0,
	MedScore: 0,
	HardScore: 0,
	UberScore: 0,
	GameOver: false,
};

function InitMainMenu() {
	window.requestAnimationFrame(DrawIntro);
	var score = localStorage.getItem("EasyMode");
	if (score === null) {
		GameSettings.EasyScore = 0;
	}
	else {
		GameSettings.EasyScore = score;
    }
	score = localStorage.getItem("MediumMode");
	if (score === null) {
		GameSettings.MedScore = 0;
	}
	else {
		GameSettings.MedScore = score;
	}
	score = localStorage.getItem("HardMode");
	if (score === null) {
		GameSettings.HardScore = 0;
	}
	else {
		GameSettings.HardScore = score;
	}
	score = localStorage.getItem("UberMode");
	if (score === null) {
		GameSettings.UberScore = 0;
	}
	else {
		GameSettings.UberScore = score;
	}
};

function InitGame(mode) {

	if (mode === "Easy") {
		GameSettings.Difficulty = "Easy";
		GameSettings.Punish = 60;
		GameSettings.holesPerRow = 2;
		GameSettings.holes = 4;
		GameSettings.XBuffer = 90;
		GameSettings.YBuffer = 90;
		GameSettings.Moles = 1;
		GameSettings.BoomTime = 3500;
		GameSettings.MoleMinTime = 750;
		GameSettings.MoleTimerStart = 2000;
	}
	else if (mode === "Medium") {
		GameSettings.Difficulty = "Medium";
		GameSettings.Punish = 90;
		GameSettings.holesPerRow = 3;
		GameSettings.holes = 9;
		GameSettings.XBuffer = 60;
		GameSettings.YBuffer = 60;
		GameSettings.Moles = 2;
		GameSettings.BoomTime = 3500;
		GameSettings.MoleMinTime = 500;
		GameSettings.MoleTimerStart = 2000;
	}
	else if (mode === "Hard") {
		GameSettings.Difficulty = "Hard";
		GameSettings.Punish = 140;
		GameSettings.holesPerRow = 3;
		GameSettings.holes = 9;
		GameSettings.XBuffer = 60;
		GameSettings.YBuffer = 60;
		GameSettings.Moles = 3;
		GameSettings.BoomTime = 2500;
		GameSettings.MoleMinTime = 400;
		GameSettings.MoleTimerStart = 2000;
	}
	else if (mode === "Uber") {
		GameSettings.Difficulty = "Uber";
		GameSettings.Punish = 200;
		GameSettings.holesPerRow = 4;
		GameSettings.holes = 16;
		GameSettings.XBuffer = 30;
		GameSettings.YBuffer = 30;
		GameSettings.Moles = 5;
		GameSettings.BoomTime = 2250;
		GameSettings.MoleMinTime = 150;
		GameSettings.MoleTimerStart = 1500;
	}

	countDown = 1000;
	GameSettings.ActiveMoles = 0;
	moles.length = 0;
	GameSettings.GameOver = false;
	CreateMoles(GameSettings.holes);

	window.requestAnimationFrame(DrawGame);
};

function InitGameOver() {
	window.requestAnimationFrame(DrawGameOver);
}

function DrawIntro(timer) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '48px sans-serif';
	var RectToMeasure = ctx.measureText('Easy');
	var EasyRect = { x: 10, y: 70 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };

	RectToMeasure = ctx.measureText('Medium');
	var MediumRect = { x: 10, y: 135 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };


	RectToMeasure = ctx.measureText('Hard');
	var HardRect = { x: 10, y: 200 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };

	RectToMeasure = ctx.measureText('Uber');
	var UberRect = { x: 10, y: 265 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };


	if (!CheckMouseHover(MouseInfo.mousePos, EasyRect))
	{
		ctx.fillText('Easy', 10, 70);
	}
	else
	{
		ctx.strokeText('Easy', 10, 70);
		if (MouseInfo.MouseClick)
		{
			startTimer = timer;
			InitGame("Easy");
			return;
		}
	}

	if (!CheckMouseHover(MouseInfo.mousePos, MediumRect))
	{
		ctx.fillText('Medium', 10, 135);
	}
	else {
		ctx.strokeText('Medium', 10, 135);
		if (MouseInfo.MouseClick) {
			startTimer = timer;
			InitGame("Medium");
			return;
		}
	}

	if (!CheckMouseHover(MouseInfo.mousePos, HardRect)) {
		ctx.fillText('Hard', 10, 200);
	}
	else {
		ctx.strokeText('Hard', 10, 200);
		if (MouseInfo.MouseClick) {
			startTimer = timer;
			InitGame("Hard");
			return;
		}
	}

	if (!CheckMouseHover(MouseInfo.mousePos, UberRect)) {
		ctx.fillText('Uber', 10, 265);
	}
	else {
		ctx.strokeText('Uber', 10, 265);
		if (MouseInfo.MouseClick) {
			startTimer = timer;
			InitGame("Uber");
			return;
		}
	}


	ctx.font = '12px sans-serif';
	ctx.fillText('Easy Score: ' + GameSettings.EasyScore, EasyRect.w + 20, 60);
	ctx.fillText('Medium Score: ' + GameSettings.MedScore, MediumRect.w + 20, 125);
	ctx.fillText('High Score: ' + GameSettings.HardScore, HardRect.w + 20, 190);
	ctx.fillText('Uber Score: ' + GameSettings.UberScore, UberRect.w + 20, 255);
	window.requestAnimationFrame(DrawIntro);

};


function DrawGame(timer) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '12px sans-serif';
	ctx.fillText(GameSettings.score, 0, 10);

	var deltaTime = timer - startTimer;

	if (countDown > 0) {
		countDown -= deltaTime;
		ctx.fillText(Math.floor(countDown / 1000), 50, 10);
	}

	if (GameSettings.Started) {
		MoleSpawnTimer -= deltaTime;
		if (MoleSpawnTimer <= 0) {
			MakeMole();

			var delay = GameSettings.MoleTimerStart - (GameSettings.Punish * GameSettings.score);
			if (delay <= GameSettings.MoleMinTime) {
				delay = GameSettings.MoleMinTime;
            }
			MoleSpawnTimer = delay;
			console.log(MoleSpawnTimer);
        }
	}

	if (countDown < 0 && !GameSettings.Started) {
		GameSettings.Started = true;
	}

	for (var i = 0; i < moles.length; i++) {
		var currentMole = moles[i];
		currentMole.Update(deltaTime);
		var EasyRect = { x: currentMole.Pos.X, y: currentMole.Pos.Y, w: 64, h: 64 };

		if (MouseInfo.MouseClick && MouseInfo.clickedLastFrame) {
			if (CheckMouseHover(MouseInfo.mousePos, EasyRect) && currentMole.Active) {
				GameSettings.score += 1;
				currentMole.Deactivate();
			}
		}

		ctx.drawImage(hole, (currentMole.AnimFrame * 64), 0, 64, 64, currentMole.Pos.X, currentMole.Pos.Y, 64, 64);
	}

	if (!GameSettings.GameOver) {
		window.requestAnimationFrame(DrawGame);
	}
	else {
		InitGameOver();
    }
	startTimer = timer;
};

function DrawGameOver(timer) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.font = '48px sans-serif';

	RectToMeasure = ctx.measureText('Try Again?');
	var MediumRect = { x: 10, y: 130 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };


	RectToMeasure = ctx.measureText('Main Menu');
	var HardRect = { x: 10, y: 190 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };

	ctx.fillText('Score: ' + GameSettings.score, 10, 50);

	if (!CheckMouseHover(MouseInfo.mousePos, MediumRect)) {
		ctx.fillText('Try Again?', 10, 130);
	}
	else {
		ctx.strokeText('Try Again?', 10, 130);
		if (MouseInfo.MouseClick) {
			startTimer = timer;
			InitGame(GameSettings.Difficulty);
			return;
		}
	}

	if (!CheckMouseHover(MouseInfo.mousePos, HardRect)) {
		ctx.fillText('Main Menu', 10, 190);
	}
	else {
		ctx.strokeText('Main Menu', 10, 190);
		if (MouseInfo.MouseClick) {
			startTimer = timer;
			InitMainMenu();
			return;
		}
	}

	window.requestAnimationFrame(DrawGameOver);

};


function CreateMoles(numMoles) {
	var ColNum = 0;
	var RowNum = 0;
	var HoleNum = 0;
	for (var i = 0; i < numMoles; i++) {

		var dx = (ColNum * 64) + GameSettings.XBuffer;
		var dy = (RowNum * 64) + GameSettings.YBuffer;
		var newMole = new Mole(dx, dy, i);

		moles.push(newMole);

		ColNum++;
		if (ColNum >= GameSettings.holesPerRow) {
			ColNum = 0;
			RowNum++;
		}
    }
};

function Boom() {

	if (GameSettings.Difficulty === "Easy" && GameSettings.score > GameSettings.EasyScore) {
		localStorage.setItem("EasyMode", GameSettings.score);
	}
	else if (GameSettings.Difficulty === "Medium" && GameSettings.score > GameSettings.MedScore) {
		localStorage.setItem("MediumMode", GameSettings.score);
	}
	else if (GameSettings.Difficulty === "Hard" && GameSettings.score > GameSettings.HardScore) {
		localStorage.setItem("HardMode", GameSettings.score);
	}
	else if (GameSettings.Difficulty === "Uber" && GameSettings.score > GameSettings.UberScore) {
		localStorage.setItem("UberMode", GameSettings.score);
	}
	GameSettings.GameOver = true;
	return;
}

function MakeMole() {
	//draw();
	if (GameSettings.ActiveMoles >= GameSettings.Moles) {
		return;
    }
	var newMole = getRandomInt(GameSettings.holes);
	while (moles[newMole].Active) {
		newMole = getRandomInt(GameSettings.holes);
	}

	moles[newMole].Activate();

	GameSettings.ActiveMoles++;
};

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
};

canvas.addEventListener('mousemove', function (e) {
	MouseInfo.mousePos = getMousePos(e);
});

canvas.addEventListener('mousedown', function (e) {
	ClickStart(e, false);
});

canvas.addEventListener('mouseup', function (e) {
	ClickEnd(e);
});

canvas.addEventListener('touchstart', function (e) {
	e.preventDefault();
	console.log("touch");
	ClickStart(e, true);
});

canvas.addEventListener('touchend', function (e) {
	console.log("touch end");
	ClickEnd(e);
});

function ClickStart(e, touch) {
	if (touch) {
		MouseInfo.mousePos = getMousePos(e.changedTouches[0]);
	}
	else {
		MouseInfo.mousePos = getMousePos(e);
	}

	MouseInfo.MouseClick = true;
	if (MouseInfo.justClicked && MouseInfo.clickedLastFrame) {
		MouseInfo.justClicked = false;
	}
	else if (MouseInfo.clickedLastFrame === false) {
		MouseInfo.justClicked = true;
		MouseInfo.clickedLastFrame = true;
	}
}

function ClickEnd(e) {
	MouseInfo.mousePos.x = -1;
	MouseInfo.mousePos.y = -1;
	MouseInfo.MouseClick = false;
	MouseInfo.clickedLastFrame = false;
}

function getTouchPos(e) {
	var r = canvas.getBoundingClientRect();
	return {
		x: e.touches[0].clientX - r.left,
		y: e.touches[0].clientY - r.top
	};
}

function getMousePos(e) {
	var r = canvas.getBoundingClientRect();
	return {
		x: e.clientX - r.left,
		y: e.clientY - r.top
	};
}

function CheckMouseHover(mousePos, theRect) {
	if (mousePos.x >= theRect.x && mousePos.x <= (theRect.x + theRect.w)) {
		if (mousePos.y >= theRect.y && mousePos.y <= (theRect.y + theRect.h)) {
			return true;
		}
	}
	return false;
}
