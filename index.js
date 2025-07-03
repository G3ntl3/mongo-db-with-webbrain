// init express and trigger
const express = require("express");
const app = express();
app.use(express.json());
    
const mongoose = require("mongoose");
// init dotenv and trigger
const dotenv = require("dotenv");
dotenv.config();
// fetch variables from env file
const port = process.env.port;
const MONGOURI = process.env.Mongouri;

mongoose.connect(MONGOURI)
  .then(() => console.log("mongo connected"))
  .catch((err) => {
    console.log(err);
  });

const myschema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique:true},
    pin: { type: Number, required: true },
//   img:{type:Image}
})

const userModel =mongoose.model("users", myschema)

app.post("/submit", async (req, res) => {
    
    try {
        const data = new userModel(req.body)
      await  data.save()
        res.status(201).json({ message: data })
        console.log(data);
        
    } catch (err) {
        res.status(501).json({ message: err });
        console.log(err)
        

    }

})

app.listen(port, (req, res) => {
  console.log(`server is running on ${port}`);
});
