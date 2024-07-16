const playGrid = document.querySelector("#playgrid");
const info = document.querySelector("#info");
const btnReset = document.querySelector("#btnrest");

let player = "mark_x";
let who_win = "";

info.innerHTML = "X Turn";


const patternWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBox() {
    for (let i = 0; i < 9; i++) {
        let div = document.createElement("div");
        div.classList.add("box");
        div.addEventListener("click", clickMark);
        playGrid.append(div);
    }
}

createBox();

function clickMark(e) {
    e.target.classList.add(player);
    e.target.removeEventListener("click", clickMark);
    changePlayer();
    checkWin();
}

function changePlayer() {
    if (player === "mark_x") {
        player = "mark_o";
        info.innerHTML = "O Turn";
    } else {
        player = "mark_x";
        info.innerHTML = "X Turn";
    }
}

function checkWin() {
    let allDiv = document.querySelectorAll(".box");
    patternWin.forEach(patt => {
        let [a, b, c] = patt;
        if (allDiv[a].classList.contains("mark_x") && allDiv[b].classList.contains("mark_x") && allDiv[c].classList.contains("mark_x")) {
            who_win = "mark_x";
        }
        if (allDiv[a].classList.contains("mark_o") && allDiv[b].classList.contains("mark_o") && allDiv[c].classList.contains("mark_o")) {
            who_win = "mark_o";
        }
    });

    if (who_win !== "") {
        if (who_win === "mark_x") {
            info.innerHTML = "X WIN";
        } else {
            info.innerHTML = "O WIN";
        }
        allDiv.forEach(d => {
            d.removeEventListener("click", clickMark);

        })
    }

    let allMark_O = document.querySelectorAll(".mark_o");
    let allMark_X = document.querySelectorAll(".mark_x");

    if (allMark_O.length + allMark_X.length === 9 && who_win === "") {
        info.innerHTML = "DRAW";
    }
}

btnReset.addEventListener("click", resetGame);

function resetGame() {
    let allDiv = document.querySelectorAll(".box");
    allDiv.forEach(d => {
        d.classList.remove("mark_x");
        d.classList.remove("mark_o");
        d.addEventListener("click", clickMark);
    });
    player = "mark_x";
    who_win = "";
    info.innerHTML = "X Turn";
}
