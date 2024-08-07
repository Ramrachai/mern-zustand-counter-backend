const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require("dotenv")

const app = express();
const PORT = process.env.PORT || 8000;
const mongoDBURL = process.env.mongoDBURL || "mongodb://localhost:27017/test"
dotenv.config()

mongoose.connect(mongoDBURL)
    .then(res => console.log("mongodb connected successfully"))
    .catch(err => console.log("database connection failed", err))

const CounterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter6', CounterSchema);

app.use(express.json());
app.use(cors())

app.get('/api/get', async (req, res) => {
    res.json({ message: "API is working" })
})
app.get('/api/test', async (req, res) => {
    res.json({ name: "ramrachai", email: "ramrachaim@gmail.com", phone: "8801732900565" })
})

app.get("/", (req, res) => {
    res.send("Welcome to Updated code ")
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
