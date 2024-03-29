import { eventPhotosRouter } from './routes/eventPhotosRouter';
import { ticketSalesRouter } from './routes/ticketSalesRouter';
import { ticketRouter } from './routes/ticketRouter';
import { showRouter } from './routes/showRouter';
import { userRouter } from './routes/userRouter';
import { bandRouter } from './routes/bandRouter';
import { loginRouter } from './routes/loginRouter';
import {app} from './app';


app.use('/', loginRouter);

app.use('/user', userRouter);

app.use("/band", bandRouter);

app.use('/show', showRouter);

app.use('/ticket', ticketRouter);

app.use('/ticketsSales', ticketSalesRouter);

app.use('/eventPhotos', eventPhotosRouter)