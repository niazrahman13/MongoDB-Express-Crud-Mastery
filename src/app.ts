import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors from 'cors'
import { userRouter } from './user/users.router';

const app:Application = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Hello')
})
// application routes

app.use('/api/user',userRouter)


export default app;
