import mongoose from "mongoose";
const db = mongoose.connection;


function connectDB() {
  mongoose.connect("mongodb://localhost/sanuco", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  db.on("open", (_) => {
    console.log("Base de datos conectada");
  });

  db.on("error", (err) => {
    console.log(err);
  });
}

connectDB();
