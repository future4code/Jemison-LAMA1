import { userRouter } from './routes/userRouter';
import {app} from './app';
import { bandRouter } from './routes/band.Router';


app.use('/user', userRouter)
app.use("/band", bandRouter);