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

// Loop over the word and get each character and add to an array
const arrWord = [];
for (let i = 0; i < newSong.length; i++) {
  arrWord.push(newSong.charAt(i));
  // Display the underlines for the word picked
  document.getElementById('blankWord').innerHTML += ' _ ';
}

console.log(arrWord);

// Create an array to hold all the correctly guessed letters
// Make it the same length as the current word
const arrCorrect = new Array(arrWord.length);

// Function that gets the pressed key,
// function keyPressed(event) {
document.onkeyup = function keyPressed(event) {
  const x = event.key;
  console.log(x);

  // Check if letter is in current word
  const letterCheck = arrWord.indexOf(x);

  // If not in the word decrement the guesses left
  if (letterCheck === -1) {
    // Display the remaining guesses
    // Decrement by one
    intGuesses -= 1;
    document.getElementById('guessesLeft').innerHTML = intGuesses;
    // Chosen letter is in the current word
  } else {
    // Add letter to the chosen letter array at the correct position
    arrCorrect[letterCheck] = x;

    // Problem with duplicate letters!!!!!!!!

    // Loop through current word array and put the letter at that index and underline at others
    // First clear the span of the underlines
    document.getElementById('blankWord').innerHTML = '';
    for (let i = 0; i < arrCorrect.length; i++) {
      // console.log(arrCorrect[i]);
      if (arrCorrect[i] === undefined) {
        // If empty position, display underline
        document.getElementById('blankWord').innerHTML += ' _ ';
      } else {
        // Display the letter
        document.getElementById('blankWord').innerHTML += arrCorrect[i];
      }
    }
  }
};
