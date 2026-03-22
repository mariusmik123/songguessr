const fs = require("fs")

const { scoreCalculator } = require("../public/js/helperFunctions/calculator.js");

function findOptionById(options, optionId) {
  return options.find((o) => o.id === Number(optionId));
}



const returnScore = (req, res)=> {

    const song = JSON.parse(
        fs.readFileSync(`./public/data/songs/${req.body.lyricsFile}.json`)
    );

    const lyric = findOptionById(song,req.body.lyricId)

    const guess = req.body.guess

    const middleTime = req.body.songMiddle

     let score = scoreCalculator(guess,lyric.start,lyric.slut,middleTime) ;
     
    res.json(score);

}


module.exports = { returnScore };