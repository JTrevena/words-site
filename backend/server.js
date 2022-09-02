const express = require("express");
const app = express();
const cors = require("cors");
const handleGetDefinition = require("./handlerFunctions/handleGetDefinition")

PORT = 8000;
CORS = {
    "origin": "http://localhost:3000",
    "content-type": "application/json"
}

app.use(cors(CORS))
app.get("/definition/:word", (req, res) => handleGetDefinition(req, res))
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});
