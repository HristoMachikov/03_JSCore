//let NODE_PATH = "C:\Users\Mariela\AppData\Roaming\npm"
const express = require("express");
const app = express();
app.use(express.static('./3. Github Repos'));
app.listen(2000, () => console.log("Listening..."));