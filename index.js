import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import userroutes from "./routes/user.js";

const app = express();
dotenv.config();
app.use(express.json());  // For parsing application/json


app.use(cors());
app.use("/user", userroutes);  // Corrected route
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

app.get('/', (req, res) => {
    res.send("Codequest is running perfectly");
});

const PORT = process.env.PORT || 5000
const database_url="mongodb+srv://admin:test@codequest.zxzi5.mongodb.net/?retryWrites=true&w=majority&appName=codequest"

mongoose.connect(database_url)
    .then(() => app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); }))
    .catch((err) => console.log(err.message));