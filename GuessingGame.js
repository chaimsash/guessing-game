function generateWinningNumber(){
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr){
  var m = arr.length;
  while(m){
    var i = Math.floor(Math.random() * m);
    m--;
    var cardStore = arr[m]; //store the end of the array
    arr[m] = arr[i]; //end of the array = random place in array
    arr[i] = cardStore; //random place in array = stored card (end of the aray)
  }
  return arr;
}

function Game(){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function (){
  return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function (){
  return this.playersGuess < this.winningNumber;
};

Game.prototype.playersGuessSubmission = function(guess){
    if (guess < 1 || guess > 100 || typeof(guess) !== "number"){
      throw "That is an invalid guess.";
    } else this.playersGuess = guess;
    return this.checkGuess(guess);
};

Game.prototype.checkGuess = function(guess){
  if (this.pastGuesses.length > 3){
    return 'You Lose.';
  } else if (this.winningNumber === guess){
    return 'You Win!';
  } else if (this.pastGuesses.indexOf(guess) > -1){
    return 'You have already guessed that number.';
  } else this.pastGuesses.push(guess);
    if (this.difference() < 10){
      return 'You\'re burning up!';
    } else if (this.difference() < 25){
      return 'You\'re lukewarm.';
    } else if (this.difference() < 50){
      return 'You\'re a bit chilly.';
    } else {
      return 'You\'re ice cold!';
    }
};

function newGame(){
  return new Game();
}

Game.prototype.provideHint = function(){
  var resultArr = [];
  resultArr.push(this.winningNumber);
  resultArr.push(generateWinningNumber(), generateWinningNumber());
  return shuffle(resultArr);
};

$(document).on('ready', function() {
   console.log('Everything is loaded!');
});
