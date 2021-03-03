require('dotenv').config();
import cors from "cors";
import express from "express";//require('express');
import apiRouter from './api/index';

const app = express();
const PORT = process.env.PORT || 8000;


//Middlewares
app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(cors() as express.NextFunction);

//Router
app.use("/api", apiRouter );
app.use('/files', express.static('uploads'))


app.listen(PORT, () => console.log(`Listening on PORT: ${process.env.PORT}`));





