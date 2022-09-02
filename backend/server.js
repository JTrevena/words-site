const express = require("express");
const app = express();
const handleGetDefinition = require("./handlerFunctions/handleGetDefinition")
PORT = 8000;



app.get("/example", (req,res) => {
    const {text} = req.query;
    const msg = "This is an example response.\nYou entered the text: " + (text ? text : "");
    const instructions = "Use the query parameter 'text' to send some text";

    res.status(200).json({instructions, msg})
})
app.get("/definition/:word", (req, res) => handleGetDefinition(req, res))
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});
