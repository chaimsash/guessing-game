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
    if (guess < 1 || guess > 100 || typeof(guess) !== "number" || isNaN(guess)){
      $('h1').text("That is an invalid guess.");
      throw "That is an invalid guess.";
    } else {
      this.playersGuess = guess;
      var index = game.pastGuesses.length + 1;
      $('.guess li:nth-child(' + index + ')').text(guess);
      if(game.isLower()){
        $('h2').text('Guess a higher number.');
      } else $('h2').text('Guess a lower number.');
    }
    return this.checkGuess(guess);
};

Game.prototype.checkGuess = function(guess){
  if (this.winningNumber === guess){
    $('#menu-btns button:last, #submit').prop("disabled",true);
    $('h2').text("Press the Reset button to play again!");
    return 'You Win!';
  } else if (this.pastGuesses.length > 3){
    $('#menu-btns button:last, #submit').prop("disabled",true);
    $('h2').text("Press the Reset button to play again!");
    return 'You Lose.';
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

$(document).ready(function() {
  game = newGame();
  console.log(game.winningNumber);
  var orgTitle = $('h1').clone();
  var orgSubTitle = $('h2').clone();
  var orgList = $('.guess').clone();
  var guessSubmit = function(){
    var guess = +$('#player-input').val();
    $('h1').text(game.playersGuessSubmission(guess));
    $('#player-input').val('');
  };
  $('#submit').click(guessSubmit);
  $('#player-input').keypress(function(e){
    var key = e.which;
    if (key == 13){
      guessSubmit();
    }
  });
  $('#menu-btns button:first').click(function(){
    game = newGame();
    $('h1').replaceWith($(orgTitle).clone());
    $('h2').replaceWith($(orgSubTitle).clone());
    $('.guess').replaceWith($(orgList).clone());
    $('#menu-btns button:last, #submit').prop("disabled",false);
  });
  $('#menu-btns button:last').click(function(){
    $('h1').text('One of these are the answer: ' + game.provideHint());
  });
});
