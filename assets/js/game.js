console.log('Connected!');

// Set the wins variable
const intWins = 0;
document.getElementById('wins').innerHTML = intWins;

// Set the losses variable
const intLosses = 0;
document.getElementById('losses').innerHTML = intLosses;

// Set the guesses remaining variable
let intGuesses = 12;
document.getElementById('guessesLeft').innerHTML = intGuesses;

// Random word chooser
function randSong() {
  // Create an array of casting crowns song keywords to use from the acoustic sessions album
  const songs = [
    'body',
    'east',
    'west',
    'american',
    'dream',
    'who',
    'again',
    'delivered',
    'middle',
    'free',
    'only',
    'you',
    'praise',
    'storm',
  ];

  const song = songs[Math.floor(Math.random() * songs.length)];
  return song;
}

// Call the random word generator and set the word to use
const newSong = randSong();

// Loop over the random word and get each character and add to an array
const arrWord = [];
for (let i = 0; i < newSong.length; i++) {
  arrWord.push(newSong.charAt(i));
  // Display the underlines for the word picked, based on array lenght
  document.getElementById('blankWord').innerHTML += ' _ ';
}

// Display the array
console.log(arrWord);

// Create an array to hold all the correctly guessed letters
// Make it the same length as the current word
const arrCorrect = new Array(arrWord.length);

// Function that gets the pressed key
// Use keyup so it is a complete key press
document.onkeyup = function keyPressed(event) {
  // event.key captures the pressed key
  const x = event.key;
  console.log(x);

  // Extend the prototype Array
  // to get all the indexes if multiple instances of the letter chosen
  Array.prototype.multiIndexOf = function (el) {
    const idxs = [];
    for (let i = this.length - 1; i >= 0; i--) {
      if (this[i] === el) {
        idxs.unshift(i);
      }
    }
    return idxs;
  };

  // Check if letter is in current word
  const letterCheck = arrWord.multiIndexOf(x);
  console.log(`Idx: ${letterCheck}`);

  // If not in the word decrement the guesses left
  if (letterCheck.length === 0) {
    // Display the remaining guesses
    // Decrement by one
    intGuesses -= 1;
    document.getElementById('guessesLeft').innerHTML = intGuesses;

    // Chosen letter is in the current word
  } else {
    // Loop through indices array and update the array of the correctly guessed letters
    for (let i = 0; i < letterCheck.length; i++) {
      arrCorrect[letterCheck[i]] = x;
    }

    // Loop through current word array
    // and put the letter at that index and underline at others
    // First clear the span of the underlines
    document.getElementById('blankWord').innerHTML = '';
    for (let i = 0; i < arrCorrect.length; i++) {
      if (arrCorrect[i] === undefined) {
        // If empty position, display underline
        document.getElementById('blankWord').innerHTML += ' _ ';
      } else {
        // Display the letter(s)
        document.getElementById('blankWord').innerHTML += arrCorrect[i];
      }
    }
  }
};
