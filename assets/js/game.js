console.log('Connected!');

// Set the wins variable
let intWins = 0;
document.getElementById('wins').innerHTML = intWins;

// Set the losses variable
let intLosses = 0;
document.getElementById('losses').innerHTML = intLosses;

// Set the guesses remaining variable
let intGuesses = 12;
document.getElementById('guessesLeft').innerHTML = intGuesses;

// Create array to hold the guesses
let arrGuesses = [];

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

  // Loop over the random word and get each character and add to an array
  // Create the array to hold the current word
  const arrWord = [];
  for (let i = 0; i < song.length; i += 1) {
    arrWord.push(song.charAt(i));
    // Display the underlines for the word picked, based on array lenght
    document.getElementById('blankWord').innerHTML += ' _ ';
  }
  // Display the array
  console.log(arrWord);

  return arrWord;
}

// Function that resets all
function reset() {
  // Set the guesses remaining variable
  intGuesses = 12;
  document.getElementById('guessesLeft').innerHTML = intGuesses;

  // Clear the array
  arrGuesses = [];
  document.getElementById('dispGuesses').innerHTML = '';

  // Clear the span of the underlines
  document.getElementById('blankWord').innerHTML = '';

  // Call the random letter generator
  randSong();
}
// Call the random word generator
const arrWord = randSong();

// Create an array to hold all the correctly guessed letters
// Make it the same length as the current word
const arrCorrect = new Array(arrWord.length);

// Function that gets the pressed key
// Use keyup so it is a complete key press
document.onkeyup = function keyPressed(event) {
  // event.key captures the pressed key
  const x = event.key;
  // console.log(x);

  // Add to array of guesses if not already in the array
  // const arrCheck = arrGuesses.indexOf(x);
  // console.log(arrCheck);
  // if (arrCheck === -1) {
  //   arrGuesses.push(x);
  //   console.log(arrGuesses);

  //   // Display the remaining guesses
  //   // Decrement by one
  //   intGuesses -= 1;
  //   document.getElementById('guessesLeft').innerHTML = intGuesses;

  //   // Display the guesses so far
  //   document.getElementById('dispGuesses').innerHTML = arrGuesses;

  //   // If remaining guesses gets to 0, increment losses and reset
  //   if (intGuesses === 0) {
  //     intLosses += 1;
  //     document.getElementById('losses').innerHTML = intLosses;

  //     // Call Reset function
  //     reset();
  //   }
  // }

  // Extend the prototype Array
  // to get all the indexes if multiple instances of the letter chosen
  Array.prototype.multiIndexOf = function (el) {
    const idxs = [];
    for (let i = this.length - 1; i >= 0; i -= 1) {
      if (this[i] === el) {
        idxs.unshift(i);
      }
    }
    return idxs;
  };

  // Check if letter is in current word (checkes for multiples)
  const letterCheck = arrWord.multiIndexOf(x);
  // console.log(letterCheck.length);

  // If not in the word decrement the guesses left
  if (letterCheck.length === 0) {
    // Check if the letter is already in guesses array
    const arrCheck = arrGuesses.indexOf(x);
    if (arrCheck === -1) {
      arrGuesses.push(x);
    }
    // console.log(arrGuesses);

    // Display the remaining guesses
    // Decrement by one
    intGuesses -= 1;
    document.getElementById('guessesLeft').innerHTML = intGuesses;

    // Display the guesses so far
    document.getElementById('dispGuesses').innerHTML = arrGuesses;

    if (intGuesses === 0) {
      intLosses += 1;
      document.getElementById('losses').innerHTML = intLosses;

      // Call Reset function
      reset();
    }

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

    // Check if the correct choices array as any empty indicies
    // If all full, player has guessed all the correct letters and wins!
    const arrCheckWin = arrCorrect.includes(undefined);
    // console.log(arrCheckWin);
    if (arrCheckWin === false) {
      // Increment the wins
      intWins += 1;
      document.getElementById('wins').innerHTML = intWins;

      // Call Reset function
      reset();
    }
  } // End check if letter is in the word
}; // End Key Pressed
