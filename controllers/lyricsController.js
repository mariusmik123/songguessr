const fs = require("fs")

const getLyrics = (req, res)=> {

const songFile = req.query.song;

const song = JSON.parse(
    fs.readFileSync(`./public/data/songs/${songFile}.json`)
);

let lineNumbers = new Set ()
while(6>lineNumbers.size){
  let n = Math.floor(Math.random()*song.length)
  lineNumbers.add(song[n])
}

res.json([...lineNumbers])

}


module.exports = { getLyrics };