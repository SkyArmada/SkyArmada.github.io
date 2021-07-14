var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var hole = new Image();
hole.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABACAMAAADCg1mMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURQAAAP/yZgAAAEse6e4AAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUNSURBVHhe5ZfbdlwpDAUT//9HB0QBAiQQx23HndRa4z5Iu7goT/Pr4z9nN4BfDQqXICcoXIKcoHAJcoKChdfDVNAIgqSgEQRJQSMIkoLGjFlHWaB9hPgC7SPEF2gfIb5Ae8AokjYhsoWoCZEtRE2IbCFqQkSxlEi6EHMh5kLMhZgLMRdiLsQaU4HUFqImRLYQNSGyhagJkS1EYVwSOUDYgMABwgYEDhA2IHCAcGFYEThCfIH2EeILtI8QX6B9hLigF7QDIEzQDIAwQTMAwgTNAAgZ9U0zBMoArRAoA7RCoAzQCoGS6J+0giApaARBUtAIgqSgEQRJDYBGGLQG5TBoDcph0BqUG78FFgZobQCUL0AEihcgAsULEIFipjy9Q3mmivw8oJgFSlegCmm5++cyQRUoCerd6nMFk58HFLNAKZ/I1xlUIS39mzqgCpQs3H0xy99HiCpQyGepw7yTK8iJvBrdCMgJCg7ezkUtfx8hqiDLfM5wkHNuAzlR1mt82XIAOUHBw9mlqAHfRXZIlNV8yubyNNA3foXSBHrg/vYO4sY2sMlupqys+/M9QwPd9EXPlfJh7oQeGoC1gbgh3yPv0O8/PyD9x2KmNnw/rdQyr6y9tL/H9V85gPILeWkemqkN5S8P5hNyZd1N+ScGu26W5egGNuoC4/3kBOPKhdZo/vC+YVExi80/MshtLxmAfD2knz9er6ysKwutXv3Z5mPEKHdflhumBAe+dADlV6jv8e7V6vjz+22NevqZfalJwWXuF+FlA8gXUEfUT+9WrY6vXd8iJkcRqeeXonzZrF0pfHoA+Qb5R87vR9RP70693nxZCetdG63TMnUAUnI9Y08qaQCyfMx+ft6Veh1fX9CTEr1Vv/T5lpjHUqCQUZWfMgC5U/lypURv1a9xAKuZ982wLKjKjxmAefuFlukP0OdbW6jHNlTp5wwgQr93f4Dy15cK6rmNVvtLA+hcDoCP/lX9/CL3NKNTS281gP6O/jUMoHwaGE0K7zSA/gj1nObnN/rHrS0K7zUAPnhsYvCp2Mytun6fAYyvyyspjL6UbKZOXb7NAMpzVx4OoAXfYwD59c5O2t/ExquoXBrApybQ/mekIFdIsBxONZl8YJcBWhPd36UyuteDyf6SAXgQ60w+kO5QX+n+Npawu68ewHkEGaKZxdcQL1Cb2PoaZ4fXD2BLeUp4AAUkgVInfL4zQRnAJyaQz/8enwlM7wj7swhZjm3gIOd/n/94AM776wAevyC7GZbXoH+ln2eWYTki7mGDLdnNsLwG/Wt8Xg4UR8T1dzgiqkDhEuQEhUuQExQGdi8vFLX8fYSoAoVLkBMULkFOULikqPL30Q7FLFC6AlWgdAWqQOkKTH4eUMwCpStQBUpXoAqUrsAsPw92QASKFyACxQsQgeIFVeT3ege0BuUwaA3KYdAalMOg9QFc7oCkoBEESUEjCJKCRhAkPYCrHVAGaIVAGaAVAmWAVgiUhN6KZgCECZoBECZoBkCYoBkAITPsRfsI8QXaR4gv0D5CfIH2EeLCuBmBA4QNCBwgbEDgAGEDAgcIF6bdiGwhakJkC1ETIluImhDZQhSW7Ui5EHMh5kLMhZgLMRdiLsQaxoYkTYhsIWpCZAtREyJbiJoQUZhbkl6gfYT4Au0jxBdoHyG+QHvA2RRjgFYIlAFaIVAGaIVAGaA1sdkWT6B0BapA6QpUgdIVqAIlg0db/zt8fPwBeA0ky5VhmoAAAAAASUVORK5CYII=';

var MoleHole = 3;
var MoleFPS = 1000 / 3;
var MoleCurrentFrameTime = 0;
var MoleFrameNum = 1;
var AnimLoops = false;

var startTimer;

var countDown = 3000;

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
	difficulty: "Easy",
	Scene: "Menu",
	MoleTime: 2500,
	Punish: 50,
	Started: false
};

function InitMainMenu() {
	GameSettings.Scene = "Menu";
	window.requestAnimationFrame(DrawIntro);
};

function InitGame(mode) {
	GameSettings.Scene = "Game";

	if (mode === "Easy") {
		GameSettings.MoleTime = 2500;
		GameSettings.Punish = 55;
	}
	else if (mode === "Medium") {
		GameSettings.MoleTime = 1500;
		GameSettings.Punish = 60;
	}
	else if (mode === "Hard") {
		GameSettings.MoleTime = 750;
		GameSettings.Punish = 75;
	}
	else if (mode === "Uber") {
		GameSettings.MoleTime = -6000;
		GameSettings.Punish = 120;
	}

	countDown = 3000;
	MoleHole = -1;
	window.requestAnimationFrame(drawGame);
};

function DrawIntro(timer) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = '48px sans-serif';
	var RectToMeasure = ctx.measureText('Easy');
	var EasyRect = { x: 10, y: 70 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };

	RectToMeasure = ctx.measureText('Medium');
	var MediumRect = { x: 10, y: 130 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };


	RectToMeasure = ctx.measureText('Hard');
	var HardRect = { x: 10, y: 190 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };

	RectToMeasure = ctx.measureText('Uber');
	var UberRect = { x: 10, y: 250 - RectToMeasure.actualBoundingBoxAscent, w: RectToMeasure.width, h: RectToMeasure.actualBoundingBoxAscent };


	if (!CheckMouseHover(MouseInfo.mousePos, EasyRect)) {
		ctx.fillText('Easy', 10, 70);
	}
	else {
		ctx.strokeText('Easy', 10, 70);
		if (MouseInfo.MouseClick) {
			startTimer = timer;
			InitGame("Easy");
			return;
		}
	}

	if (!CheckMouseHover(MouseInfo.mousePos, MediumRect)) {
		ctx.fillText('Medium', 10, 130);
	}
	else {
		ctx.strokeText('Medium', 10, 130);
		if (MouseInfo.MouseClick) {
			startTimer = timer;
			InitGame("Medium");
			return;
		}
	}

	if (!CheckMouseHover(MouseInfo.mousePos, HardRect)) {
		ctx.fillText('Hard', 10, 190);
	}
	else {
		ctx.strokeText('Hard', 10, 190);
		if (MouseInfo.MouseClick) {
			startTimer = timer;
			InitGame("Hard");
			return;
		}
	}

	if (!CheckMouseHover(MouseInfo.mousePos, UberRect)) {
		ctx.fillText('Uber', 10, 250);
	}
	else {
		ctx.strokeText('Uber', 10, 250);
		if (MouseInfo.MouseClick) {
			startTimer = timer;
			InitGame("Uber");
			return;
		}
	}

	window.requestAnimationFrame(DrawIntro);

};


function drawGame(timer) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = '12px sans-serif';
	ctx.fillText(GameSettings.score, 0, 10);

	var deltaTime = timer - startTimer;
	MoleCurrentFrameTime += deltaTime;

	if (countDown > 0) {
		countDown -= deltaTime;
		ctx.fillText(Math.floor(countDown / 1000), 50, 10);
	}

	if (countDown < 0 && !GameSettings.Started) {
		MakeMole();
		GameSettings.Started = true;
	}

	var j = 0;
	var ColNum = 0;
	var RowNum = 0;
	var HoleNum = 0;
	for (var i = 0; i < GameSettings.holes; i++) {
		var dx = (ColNum * 64) + 40;
		var dy = (RowNum * 64) + 40;

		if (HoleNum === MoleHole) {
			ctx.drawImage(hole, (MoleFrameNum * 64), 0, 64, 64, dx, dy, 64, 64);
			var EasyRect = { x: dx, y: dy, w: 64, h: 64 };

			if (MouseInfo.MouseClick && MouseInfo.clickedLastFrame) {
				if (CheckMouseHover(MouseInfo.mousePos, EasyRect)) {
					GameSettings.score += 1;
					MoleHole = -1;
					var delay = (8 * (1000 - (GameSettings.score * GameSettings.Punish))) + GameSettings.MoleTime;
					console.log(delay);
					setTimeout(MakeMole, delay)
				}
			}
			if (MoleCurrentFrameTime >= MoleFPS) {
				MoleCurrentFrameTime -= MoleFPS;
				MoleFrameNum++;
				if (!AnimLoops && MoleFrameNum >= 3) {
					MoleFrameNum = 3;
				}
				if (MoleFrameNum > 3 && AnimLoops) {
					MoleFrameNum = 1;
				}
			}
		}
		else {
			ctx.drawImage(hole, 0, 0, 64, 64, dx, dy, 64, 64);
		}

		ColNum++;
		if (ColNum >= GameSettings.holesPerRow) {
			ColNum = 0;
			RowNum++;
		}
		HoleNum++;
	}


	window.requestAnimationFrame(drawGame);
	startTimer = timer;
};

function MakeMole() {
	//draw();
	var newMole = getRandomInt(GameSettings.holes);
	while (newMole === MoleHole) {
		newMole = getRandomInt(GameSettings.holes);
	}
	MoleHole = newMole;

	MoleFrameNum = 1;
	MoleCurrentFrameTime = 0;
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
