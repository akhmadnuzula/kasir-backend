const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Menggunakan rute langsung tanpa middleware
app.use("/", routes);

const port = 4000;
app.listen(port, () => {
  console.log("Server berjalan");
});
