let view = {

    displayMessage: function(message) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = message;
    }
    ,
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");

    }
    ,
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
}

let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        {locations: ["06", "16", "26"], hits: ["", "", ""]},
        {locations: ["24", "34", "44"], hits: ["", "", ""]},
        {locations: ["10", "11", "12"], hits: ["", "", ""]}
    ],

    fire: function(guess) {
      for (var i = 0; i < this.numShips; i++) {
          var ship = this.ships[i];
          var index = ship.locations.indexOf(guess);
          if (index >= 0) {
              // we have a hit!
              ship.hits[index] = "hit";
              view.displayHit(guess);
              view.displayMessage("Hit!");
              if (this.isSunk(ship)) {
                  view.displayMessage("You sunk my battleship!");
                  this.shipsSunk++;
              }
              return true;
          }
      }
      view.displayMessage("You missed.");
      view.displayMiss(guess);
      return false;
    }
    ,
    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    }
};

let controller = {
    guesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) { // returns null if false. Remember null is falsey.
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses.");

            }
        }
    }

}

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.key === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;

