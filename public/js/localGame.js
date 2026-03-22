
function getSongFile(){
  let params = new URLSearchParams(document.location.search)
  return params.get("album")

}
async function getSongSpecifics(){
  let params = new URLSearchParams(document.location.search)
  try {
    const response = await fetch("../data/albumOptions.json")
    const albums = await response.json()

    return findOptionById(albums,params.get("id"))

  } catch (error) {
    throw new Error("Couldn't get song")
  }
}
function findOptionById(options, optionId) {
  return options.find((o) => o.id === Number(optionId));
}
async function getLyrics(songFile){
const songResponse = await fetch(`/api/gamecalculater?song=${songFile}`)
const lyrics =  await songResponse.json()
return lyrics
}

///////// FUNCTIONS  FOR  WIERD COMPLICATED SHIT   ///////////
function setScoreAni(guess,lyricStart,lyricEnd,songLength,){ // visualizes the result

  const guessDot = document.querySelector(".js-resultGuess")
  const range = document.querySelector(".js-resultRange")

  const guessPercent = (guess / songLength) * 100
  const startPercent = (lyricStart / songLength) * 100
  const endPercent = (lyricEnd / songLength) * 100

  guessDot.style.left = guessPercent + "%"

  range.style.left = startPercent + "%"
  range.style.width = (endPercent - startPercent) + "%"


}


//////////////// CONSTANTS   /////////////
const filename = getSongFile()

const song = await getSongSpecifics()

const lyrics = await getLyrics(filename)

let score = "0000";


//////////// AFTER GETTING SONG AND LYRICS ////////////////////
import { formatTime, countdowner, stopCounter } from "./helperFunctions/time.js";
import { formatScore } from "./helperFunctions/score.js";

//////  HTML CONTAINERS ////////////
const guessingContainer = document.getElementById("js-guessingContainer")
const scoreContainer = document.getElementById("js-resultContainer")



////////// render game specifics
function setSongSpecifics(){
  const head = document.querySelector(".songTitle")
  head.textContent = song.name

  slider.max = song.seconds
  slider.value= song.startValue
}

function setResultSpecifics(points,number){
  
  document.querySelector(".js-songTitle").textContent = song.name

  document.querySelector(".js-score").textContent = `SCORE ${score}`

  document.querySelector(".js-lyricResult").textContent = lyrics[number].lyric

  document.querySelector(".js-guessLabel").textContent = `Your Guess: ${points}`
}

const lyricContainer = document.querySelector(".js-lyric")
const questionCounter = document.querySelector(".js-questionCounter")
const scoreHTMLquestion = document.querySelector(".js-score-question")
const timeContainer = document.querySelector(".js-timer")

function renderQuestion(number){
  
  scoreHTMLquestion.textContent = `SCORE ${score}`

  lyricContainer.textContent = lyrics[number].lyric

  questionCounter.innerHTML = `${number+1} of 6`
}


///////////  Guess handling

let questionNumber = 0;

// slidebar and guess time
let guess = null;
const slider = document.getElementById("guess");
const label = document.getElementById("currentTime");


slider.addEventListener("input", (event) => {

  guess = event.target.value;

  label.textContent = formatTime(guess);
});

// submit button
let commitedGuess;

// function for submit af gæt eller timer gået
const guessingOver = async ()=>{
  commitedGuess = guess
  // Post request for server to calculate score
  try {
    const resultResponse = await fetch("/api/gamecalculater/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lyricsFile : filename,
      songMiddle : song.startValue,
      lyricId: lyrics[questionNumber].id,
      guess: commitedGuess
    })
    }) 

    if (!resultResponse.ok) {
  throw new Error("Server error")
}

  let result = await resultResponse.json()

  
  score = formatScore(score,result.score)

  // TODO --- add hidden class from js-guessingContainer
  guessingContainer.classList.add("hidden")  

  // TODO  ---  remove hidden class from js-pointCalculater 

  setScoreAni(commitedGuess,result.startTime,result.endTime,song.seconds,result.score)
  setResultSpecifics(result.score,questionNumber)

  //makes sure that nextBtn changes to finishBtn after 6th submit
  if (questionNumber === 5){
    document.querySelector(".js-finishBtn").classList.remove("hidden")
    document.querySelector(".js-nextBtn").classList.add("hidden")
  } 

  scoreContainer.classList.remove("hidden")   
  
  
  

  } catch (error) {
    throw new Error("500")
  } 
 
}


const submitBtn = document.querySelector(".js-submitBtn")

submitBtn.addEventListener("click", async ()=> {
  commitedGuess = guess
  if (commitedGuess === null){return}
  stopCounter()
  guessingOver()
})


setSongSpecifics()
renderQuestion(questionNumber)
countdowner(timeContainer,15000,guessingOver)


/// next button actions::
const nextBtn = document.querySelector(".js-nextBtn")
nextBtn.addEventListener("click", ()=>{
  guess = null;
  label.textContent = ""
  slider.value = song.startValue

  scoreContainer.classList.add("hidden") 

  questionNumber++
  renderQuestion(questionNumber)

  guessingContainer.classList.remove("hidden")

  countdowner(timeContainer,15000,guessingOver)

  guess = null

})

function getHighscore(score, song){ // gets Highscore from local storage and maybe sets new
  const hsLocalStorage = localStorage.getItem(`${song.name}HS`)
  
    if (hsLocalStorage && Number(hsLocalStorage)>Number(score)){
      return `Highscore ${hsLocalStorage}`;
    }
    localStorage.setItem(`${song.name}HS`,`${score}`)
    return `New highscore ${score}!!!`
}

function renderFinalContainer(){

  finalContainer.innerHTML = `
  <div class="head">
    <div>
      <h2 class="songTitle js-songTitle">${song.name}</h2>
    </div>
  </div>
  <div class="finalScore js-finalScore">SCORE ${score}</div>
    <div class="Highscore js-highscore">
       ${getHighscore(score,song)} 
    </div>

  <button class="playAgainBtn js-playAgainBtn">Play Again</button>`
}


// setting finalScore container active
const finalContainer = document.getElementById("js-finalContainer")

document.querySelector(".js-finishBtn").addEventListener("click",()=>{
 
  scoreContainer.classList.add("hidden") 

  renderFinalContainer()

  finalContainer.classList.remove("hidden")


// play again
  const playAgainBtn = document.querySelector(".js-playAgainBtn")
  console.log(playAgainBtn)
playAgainBtn.addEventListener("click", async ()=>{
window.location.reload()
})

})




////// other shit than actual game code
// back to main menu
const backBtn = document.querySelector(".backBtn");
backBtn.addEventListener("click",  () => {
  
window.location.href = "localGameSelecter.html"

});