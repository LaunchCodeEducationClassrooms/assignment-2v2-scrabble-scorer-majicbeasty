// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let newPointStructure = {
  
};

let wordToScore = "";

let position = 0;

function oldScrabbleScorer(word) {
	word = word.toUpperCase(); // changes all letters to upper case
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {// for/in statement loops through properties of object
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
		 }
 
	  }
	}
	return letterPoints;
 }

 function newScrabbleScorer(word)
 {
  word = word.toUpperCase();
  let letterPoints = 0;

  for(let i = 0; i < word.length; i++){
    for(const letter in newPointStructure){
      if(word[i] == letter)
      {
        letterPoints += Number(newPointStructure[letter]);
      }
    }
  }
  return letterPoints;
}


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some scrabble!\n")
  wordToScore = input.question("Enter a word to score: ");
}

function simpleScore(word){
    word = word.toUpperCase();
    let letterPoints = 0;
 
	  for (let i = 0; i < word.length; i++) {
      letterPoints++;
    }
      
	return letterPoints;
}

//let simpleScore;
function checkVowel(word) {
  let listOfVowels = 'aeiouAEIOU';
  let count = 0;

  for(i = 0; i < word.length; i++)
  {
    if(listOfVowels.indexOf(word[i]) !== -1)
    {
      count++;
    }
  }
  return count;
}

function vowelBonusScore(word){
  let vScore = checkVowel(word);
  let cScore = Number(word.length) - vScore; //score for non vowels
 
  vScore = vScore * 3; //total value of vowel bonus stored here

  return vScore + cScore; //add two scores for total
}

//first object for simple score info/score
let obj1 = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",

  simpleScore: function(word){
    word = word.toUpperCase();
    let letterPoints = 0;

    for(let i = 0; i < word.length; i++)
    {
      letterPoints++;
    }
    return letterPoints;
  }
}

//second object for bonus vowel info/score
let obj2 = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pt, consonants are 1 pt",

  vowelBonusScore: function(word){
    let vScore = checkVowel(word);
    let cScore = Number(word.length) - vScore;

    vScore = vScore * 3;

    return vScore + cScore;
  }
}

//third object for tradtional info/score
let obj3 = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",

  newScrabbleScorer:  function(word){
    word = word.toUpperCase(); // changes all letters to upper case
	  let letterPoints = 0;
 
	  for (let i = 0; i < word.length; i++) {
 
	    for (const letter in newPointStructure) {// for/in statement loops through properties of object
		    if(word[i] == letter)
        {
          letterPoints += Number(newPointStructure[letter]);
        }
      }
    }
    return letterPoints;
  }
}
 

let scrabbleScore;

const scoringAlgorithms = [];

scoringAlgorithms[0] = obj1;
scoringAlgorithms[1] = obj2;
scoringAlgorithms[2] =  obj3;


function scorerPrompt() {
  console.log("0 - Simple: One point per character");
  console.log("1 - Vowel Bonus: Vowels are worth 3 point");
  console.log("2 - Scrabble: Uses scrabble point system");
  console.log("any - Enter antyhing else to exit!");

  scorePrompt = input.question("Enter 0, 1, or 2 or anything else to exit: ");
  switch(scorePrompt){
    case "0":
      position = 0;
      break;
    case "1":
      position = 1;
      break;
    case "2":
      position = 2;
      break;
    default:
      position = 3;
    }
return position;
}

function transform(xformObj) {
  for(point in oldPointStructure)
  {
    for(i = 0;  i < oldPointStructure[point].length; i++)
    {
      newPointStructure[oldPointStructure[point][i]] = point;
    }
  }
};


function runProgram() {
  
   transform(oldPointStructure);
   initialPrompt();
   scorerPrompt();
   
   if(position === 0)
   {
     console.log(`Score for ${wordToScore}: ${scoringAlgorithms[0].simpleScore(wordToScore)}`);
   }
   else if(position === 1)
   {
     console.log(`Score for ${wordToScore}: ${scoringAlgorithms[1].vowelBonusScore(wordToScore)}`);
   }
   else if(position === 2)
   {
     console.log(`Score for ${wordToScore}: ${scoringAlgorithms[2].newScrabbleScorer(wordToScore)}`);
   }
   else
   {
     console.log("Invalid Selection.\n");
     x = 0;
   }   
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

