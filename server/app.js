import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGOOSE_URI, CorsConfig } from "./config.js";
import authRouter from "./Routes/user.js";
import { cardRouter } from './Routes/card.js'
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "../client/build")


mongoose.connect(MONGOOSE_URI)
    .then(() => console.log('Mongoose Connected Successfully'))
    .catch((error) => console.error(error.message));

app.use(express.json());
app.use(cors(CorsConfig));
app.use(express.static(publicPath))

app.use(express.urlencoded({ extended: false }));

app.use('/users', authRouter);
app.use('/', cardRouter);


function handleError(req, res) {
    res.status(500).send("Error:", "server issue")
}

function serveClinetFileOnUnoneRoute(req, res) {
    res.sendFile(path.resolve(publicPath, "index.html"))
}
app.get("*", serveClinetFileOnUnoneRoute)
app.use("*", handleError)


const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

// import bcryptjs from 'bcryptjs';
// const bycriptjsHash = async () => {
//     const password = '1234'
//     const hashedPassword = await bcryptjs.hash(password, 8)

//     console.log(hashedPassword);
//     const isMatch = await bcryptjs.compare('1234', hashedPassword)
//     console.log(isMatch);
// }
// bycriptjsHash()

// import jwt from 'jsonwebtoken'
// const getToken = async () => {
//     const token = jwt.sign({ _id : 'abc'}, 'random', { expiresIn: '7 days'})
//     // token = header.payload(base 64 the object and when created).signature
//     console.log(token)
//     const data = jwt.verify(token, 'random') // with the right signature we receive the object back
//     console.log(data)
// }
// getToken()