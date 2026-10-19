
document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#board div");
    const status = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");
    const originalMessage = status.textContent;

    let currentPlayer = "X";
    let gameOver = false;
    let board = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;

            if (board[a] !== "" &&
                board[a] === board[b] &&
                board[b] === board[c]) {
                return board[a];
            }
        }

        return null;
    }

    squares.forEach(function(square, index) {
        square.classList.add("square");

        square.addEventListener("mouseover", function() {
            square.classList.add("hover");
        });

        square.addEventListener("mouseout", function() {
            square.classList.remove("hover");
        });

        square.addEventListener("click", function() {
            if (board[index] !== "" || gameOver) {
            return;
        }

            board[index] = currentPlayer;
            square.textContent = currentPlayer;
            square.classList.remove("X", "O");
            square.classList.add(currentPlayer);

            const winner = checkWinner();

            if (winner !== null) {
                status.textContent =
                    "Congratulations! " + winner + " is the Winner!";
                status.classList.add("you-won");
                gameOver = true;
                return;
            }

            if (currentPlayer === "X") {
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }
        });
    });

    newGameButton.addEventListener("click", function() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;

    squares.forEach(function(square) {
        square.textContent = "";
        square.classList.remove("X", "O", "hover");
    });

    status.textContent = originalMessage;
    status.classList.remove("you-won");
});
});


