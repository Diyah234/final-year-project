const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute');
const reminderRouter = require('./routes/reminderRoutes');
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connection successful");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};
connectDB();

app.use("/api/user", userRouter)
app.use("/api/reminders", reminderRouter)

app.listen( 4000, ()=>{
    console.log('Server running on port 4000')
})