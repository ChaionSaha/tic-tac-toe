"use strict";

const xPlayer = document.querySelector(".x");
const oPlayer = document.querySelector(".o");
const players = document.querySelectorAll(".player");
let xPlayerTurn = true,
	oPlayerTurn = false;
let xPlayerPos = [];
let oPlayerPos = [];
let xPlayerWinCount = 0,
	oPlayerWinCount = 0;

let winLogics = [
	["11", "12", "13"],
	["21", "22", "23"],
	["31", "32", "33"],
	["11", "21", "31"],
	["12", "22", "32"],
	["13", "23", "33"],
	["11", "22", "33"],
	["13", "22", "31"],
];

/////////////////////////////////////
/// Active Player update
const updateUI = function (player) {
	players.forEach((player) => {
		player.classList.remove("active");
	});
	player.classList.add("active");
};
updateUI(xPlayer);

////////////////////////////////////////
/// Winner count update
function updateWinUI() {
	document.querySelector(".x-result").innerHTML = `${xPlayerWinCount}`;
	document.querySelector(".o-result").innerHTML = `${oPlayerWinCount}`;
	if (xPlayerWinCount || oPlayerWinCount)
		document.querySelector(".table").classList.add("blur");
}
updateWinUI();

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
			//console.log(result);
			count++;
			return;
		}
	});
	//console.log(result);
	if (count == 0) return false;
	else return true;
};

///////////////////////////////////////////
/// Click event
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("td")) {
		if (!e.target.innerHTML == "") return;
		const tableID = e.target.dataset.id;

		if (xPlayerTurn) {
			e.target.innerHTML = "x";
			xPlayerTurn = false;
			oPlayerTurn = true;
			xPlayerPos.push(tableID);

			if (xPlayerPos.length > 2 && arrSubset(xPlayerPos)) {
				xPlayerWinCount++;
				updateWinUI();
			} else updateUI(oPlayer);
		} else if (oPlayerTurn) {
			e.target.innerHTML = "o";
			oPlayerTurn = false;
			xPlayerTurn = true;
			oPlayerPos.push(tableID);

			if (oPlayerPos.length > 2 && arrSubset(oPlayerPos)) {
				oPlayerWinCount++;
				updateWinUI();
			} else updateUI(xPlayer);
		}
	} else if (e.target.classList.contains("reset")) {
		xPlayerTurn = true;
		oPlayerTurn = false;

		xPlayerPos = [];
		oPlayerPos = [];

		updateUI(xPlayer);
		document.querySelectorAll(".td").forEach((td) => {
			td.innerHTML = "";
		});

		document.querySelector(".table").classList.remove("blur");
	}
});
