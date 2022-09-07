"use strict";

const xPlayer = document.querySelector(".x");
const oPlayer = document.querySelector(".o");
const players = document.querySelectorAll(".player");
let xPlayerTurn = true,
	oPlayerTurn = false;

const updateUI = function (player) {
	players.forEach((player) => {
		player.classList.remove("active");
	});
	player.classList.add("active");
};
updateUI(xPlayer);

document.addEventListener("click", (e) => {
	if (e.target.classList.contains("td")) {
		const tableID = e.target.dataset.id;
		console.log(tableID);
		if (!e.target.innerHTML == "") return;

		if (xPlayerTurn) {
			e.target.innerHTML = "x";
			xPlayerTurn = false;
			oPlayerTurn = true;
			updateUI(oPlayer);
		} else if (oPlayerTurn) {
			e.target.innerHTML = "o";
			oPlayerTurn = false;
			xPlayerTurn = true;
			updateUI(xPlayer);
		}
	} else if (e.target.classList.contains("reset")) {
		xPlayerTurn = true;
		oPlayerTurn = false;
		updateUI(xPlayer);
		document.querySelectorAll(".td").forEach((td) => {
			td.innerHTML = "";
		});
	}
});
