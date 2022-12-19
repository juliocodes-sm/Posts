const gameMessageElement = document.querySelector(".message");
const player1Element = document.querySelector(".player-1");
const player2Element = document.querySelector(".player-2");
const player1HealthElement = document.querySelector(".player-1-health-bar");
const player2HealthElement = document.querySelector(".player-2-health-bar");
const playBtn = document.querySelectorAll(".play-btn");
const resetBtn = document.querySelector(".reset-btn");
let player1Health;
let player2Health;
let player2Option;
let isGameOver;

const updateData = (element, message) => {
    element.textContent = message;
};

const init = () => {
    player1Health = 100;
    player2Health = 100;
    isGameOver = false;
    player1HealthElement.style.width = "100%";
    player2HealthElement.style.width = "100%";
    updateData(gameMessageElement, "Fight");
    updateData(player1Element, "🤜");
    updateData(player2Element, "🤛");
};

init();

const player2Turn = () => {
    const player2Options = Math.trunc(Math.random() * 3) + 1;
    switch (player2Options) {
        case 1:
            player2Option = {
                name: "Rock",
                emoji: "✊",
            };
            break;
        case 2:
            player2Option = {
                name: "Paper",
                emoji: "🖐️",
            };
            break;
        case 3:
            player2Option = {
                name: "Scissors",
                emoji: "✌️",
            };
            break;
    }
};

const determineWinner = () => {
    if (player1Health <= 0 || player2Health <= 0) {
        if (player1Health > player2Health) {
            updateData(gameMessageElement, "You win!");
        } else {
            updateData(gameMessageElement, "You lose!");
        }
        isGameOver = true;
    }
};

playBtn.forEach((e) => {
    e.addEventListener("click", () => {
        const player1Option = e.getAttribute("data-option");
        player2Turn();
        if (!isGameOver) {
            if (player1Option === player2Option.name) {
                updateData(player1Element, player2Option.emoji);
                updateData(player2Element, player2Option.emoji);
                updateData(gameMessageElement, "It's a draw. No damage.");
            } else if (player1Option === "Rock") {
                updateData(player1Element, "✊");
                updateData(player2Element, player2Option.emoji);

                if (player2Option.name === "Paper") {
                    updateData(gameMessageElement, "Player 2 hit (+1)");
                    player1Health -= 20;
                    player1HealthElement.style.width = `${player1Health}%`;
                } else {
                    updateData(gameMessageElement, "Player 1 hit (+1)");
                    player2Health -= 20;
                    player2HealthElement.style.width = `${player2Health}%`;
                }
            } else if (player1Option === "Paper") {
                updateData(player1Element, "🖐️");
                updateData(player2Element, player2Option.emoji);

                if (player2Option.name === "Scissors") {
                    updateData(gameMessageElement, "Player 2 hit (+1)");
                    player1Health -= 20;
                    player1HealthElement.style.width = `${player1Health}%`;
                } else {
                    updateData(gameMessageElement, "Player 1 hit (+1)");
                    player2Health -= 20;
                    player2HealthElement.style.width = `${player2Health}%`;
                }
            } else {
                updateData(player1Element, "✌️");
                updateData(player2Element, player2Option.emoji);

                if (player2Option.name === "Rock") {
                    updateData(gameMessageElement, "Player 2 hit (+1)");
                    player1Health -= 20;
                    player1HealthElement.style.width = `${player1Health}%`;
                } else {
                    updateData(gameMessageElement, "Player 1 hit (+1)");
                    player2Health -= 20;
                    player2HealthElement.style.width = `${player2Health}%`;
                }
            }
            determineWinner();
        } else {
            updateData(gameMessageElement, "The game is over. Please reset.");
        }
    });
});

resetBtn.addEventListener("click", init);