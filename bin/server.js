const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();

const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
