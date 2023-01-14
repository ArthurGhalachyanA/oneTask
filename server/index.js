require('dotenv').config();
const socketService = require('./services/socketService');
const croneController = require('./controllers/cronController');
const cron = require('node-cron');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const router = require('./route/index');

const io = require('socket.io')(server, {
    cors: {
        withCredentials: true,
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true });

        io.on('connection', (socket) => socketService.addClient(socket));

        cron.schedule('*/10 * * * * *', () => croneController.insertRss());

        server.listen(PORT, () => console.log('server in ' + PORT))
    }catch (e) {
        console.log(e);
    }
};

start();