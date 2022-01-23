import mongoose from "mongoose";
const db = mongoose.connection;

function connectDB() {
  mongoose.connect("mongodb+srv://sanuco:Andres1999@dbcluster.jbqs3.mongodb.net/sanuco?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db.on("open", (_) => {
    console.log("Base de datos conectada");
  });

  db.on("error", (err) => {
    console.log(err);
  });
}

connectDB();
