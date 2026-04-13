import express from 'express'
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
import router from './routes/tasks.js';
import notFound from './middleware/not-found.js';  
import errorHandlerMiddleware from './middleware/error-handler.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


//middleware
app.use(express.json());
app.use(express.static('./public'))

app.use('/api/v1/tasks', router)

app.use(notFound)
app.use(errorHandlerMiddleware)




const startServer = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
    })
    } catch (error) {
        console.error(error);
    }
}

startServer();
