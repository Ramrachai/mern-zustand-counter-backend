const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require("dotenv")

const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config()

mongoose.connect(process.env.mongoDBURL)
    .then(res => console.log("mongodb connected successfully"))
    .catch(err => console.log("database connection failed", err))

const CounterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter6', CounterSchema);

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to MERN + Zustand counter app. only 1 route is available supports POST and get method '/counter' ")
})

app.get('/counter', async (req, res) => {
    try {
        const counter = await Counter.findOne();
        res.json(counter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
});

app.post('/counter', async (req, res) => {
    try {
        const clientData = req.body
        const serverData = await Counter.findOne();

        if (!serverData) {
            return res.status(404).json({ message: 'Counter not found in Database', success: false });
        }
        if (typeof clientData.count !== 'number') {
            return res.status(400).json({ message: 'Invalid count value', success: false });
        }

        const { operation, count } = clientData
        switch (operation) {
            case "inc":
                serverData.count += count
                break;
            case "dec":
                serverData.count -= count
                break;

            default:
                return res.status(400).json({ message: "Invalid operation", success: false });
        }

        await serverData.save();
        res.json(
            {
                success: true,
                message: `${clientData.count} has been ${clientData.operation}reased successfully`,
                count: serverData.count
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
