'use strict';

const xPlayer = document.querySelector('.x');
const oPlayer = document.querySelector('.o');
const players = document.querySelectorAll('.player');
let xPlayerTurn = true,
	oPlayerTurn = false;
let xPlayerPos = [];
let oPlayerPos = [];
let xPlayerWinCount = 0,
	oPlayerWinCount = 0;
let winnerNotification = document.querySelector('.win-notification p');
let turnCount = 9,
	highLight = [],
	winFlag = false;

document.querySelector('.x-result').innerHTML = `${xPlayerWinCount}`;
document.querySelector('.o-result').innerHTML = `${oPlayerWinCount}`;

let winLogics = [
	['11', '12', '13'],
	['21', '22', '23'],
	['31', '32', '33'],
	['11', '21', '31'],
	['12', '22', '32'],
	['13', '23', '33'],
	['11', '22', '33'],
	['13', '22', '31'],
];

/////////////////////////////////////
/// Active Player update
const updateUI = function (player) {
	players.forEach((player) => {
		player.classList.remove('active');
	});
	player.classList.add('active');
};
updateUI(xPlayer);

////////////////////////////////////////
/// Winner count update
function updateWinUI() {
	document.querySelector('.x-result').innerHTML = `${xPlayerWinCount}`;
	document.querySelector('.o-result').innerHTML = `${oPlayerWinCount}`;
	document.querySelector('.table').classList.add('blur');
	console.log(highLight);
	const tds = document.querySelectorAll('.td');
	tds.forEach((td) => {
		if (highLight.includes(td.dataset.id)) {
			td.style.color = 'rgba(255, 255, 255, 1)';
		}
	});
}

//////////////////////////////////////
/// Subset Finding
const arrSubset = function (player = []) {
	player.sort(function (a, b) {
		return a - b;
	});
	let result,
		count = 0;

	winLogics.forEach((logic) => {
		result = logic.every((val) => player.includes(val));
		if (result == true) {
			count++;
			highLight = logic;
			return;
		}
	});
	//console.log(result);
	if (count == 0) return false;
	else return true;
};

///////////////////////////////////////////
/// Click event
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('td')) {
		if (!e.target.innerHTML == '') return;
		turnCount--;
		const tableID = e.target.dataset.id;

		if (xPlayerTurn) {
			e.target.innerHTML = 'x';
			xPlayerTurn = false;
			oPlayerTurn = true;
			xPlayerPos.push(tableID);

			if (xPlayerPos.length > 2 && arrSubset(xPlayerPos)) {
				xPlayerWinCount++;
				updateWinUI();
				xPlayerTurn = false;
				oPlayerTurn = false;
				winFlag = true;
				winnerNotification.innerHTML = 'X Wins🏆';
				xPlayer.classList.remove('active');
				oPlayer.classList.remove('active');
				setTimeout(function () {
					winnerNotification.innerHTML = '';
				}, 2000);
			} else updateUI(oPlayer);
		} else if (oPlayerTurn) {
			e.target.innerHTML = 'o';
			oPlayerTurn = false;
			xPlayerTurn = true;
			oPlayerPos.push(tableID);

			if (oPlayerPos.length > 2 && arrSubset(oPlayerPos)) {
				oPlayerWinCount++;
				updateWinUI();
				xPlayerTurn = false;
				oPlayerTurn = false;
				winnerNotification.innerHTML = 'O Wins🏆';
				winFlag = true;
				setTimeout(function () {
					winnerNotification.innerHTML = '';
				}, 2000);
			} else updateUI(xPlayer);
		}
		if (turnCount == 0 && !winFlag) {
			xPlayerTurn = false;
			oPlayerTurn = false;
			winnerNotification.innerHTML = 'DRAW';
			document.querySelector('.table').classList.add('blur');
			setTimeout(function () {
				winnerNotification.innerHTML = '';
			}, 2000);
		}
	} else if (e.target.classList.contains('reset')) {
		xPlayerTurn = true;
		oPlayerTurn = false;

		xPlayerPos = [];
		oPlayerPos = [];
		winFlag = false;
		turnCount = 9;

		updateUI(xPlayer);
		document.querySelectorAll('.td').forEach((td) => {
			td.innerHTML = '';
		});

		document.querySelector('.table').classList.remove('blur');
	}
});
