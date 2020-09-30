let scores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1.Random Number
    let dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    //2.Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    //3. Update the round score If the rolled number was not a 1
    if (dice > 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Pasar de current a global
    scores[activePlayer] += roundScore;

    //2. Actualizar UI
    document.querySelector(`#score-${activePlayer}`).innerHTML =
      scores[activePlayer];

    //3. Si alguno de los dos ganó el juego
    if (scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).innerHTML = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").innerHTML = "0";
  document.getElementById("current-1").innerHTML = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  //Poniendo todos los contadores a 0
  document.getElementById("score-0").innerHTML = "0";
  document.getElementById("score-1").innerHTML = "0";
  document.getElementById("current-0").innerHTML = "0";
  document.getElementById("current-1").innerHTML = "0";
  document.getElementById(`name-0`).innerHTML = "Player 1";
  document.getElementById(`name-1`).innerHTML = "Player 2";
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  document.querySelector(`.player-0-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("active");
  document.querySelector(`.player-0-panel`).classList.add("active");
}
