const fs = require("fs");
const {parse} = require("csv-parse");


const cleanWord = (word) => word[0].toUpperCase() + word.slice(1).toLowerCase();


module.exports = function handleGetDefinition(req, res) {
    let {word} = req.params;
    word = cleanWord(word);  
    const responses = [];  

    let foundWord = false;
    const readStream = fs.createReadStream("./dictionary.csv")

    readStream
    .on("close", (e) => { // NOTE: this statement must come before the pipe and on-data statements
      res.status(200).json({ok: true, word, definitions: responses})
    })
    .on("error", (error) => {
      console.log(error);
      res.status(500).json({ok: false, error})
    })
    .on("end", () => {
      res.status(200).json({ok: true, word, definitions: responses})
    })
    .pipe(parse({ delimiter: ',', columns: true, ltrim: true}))
    .on("data", (row) => {
      if (row.word === word) {
          foundWord = true;
          delete row.word;
          responses.push(row);
      } else if (foundWord) readStream.destroy();
    })
}
