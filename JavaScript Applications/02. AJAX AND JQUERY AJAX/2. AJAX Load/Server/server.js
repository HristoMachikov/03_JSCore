//let NODE_PATH = "C:\Users\Mariela\AppData\Roaming\npm"
const express = require("express");
const app = express();
app.use(express.static('./public'));
app.listen(3000, () => console.log("Listening..."));