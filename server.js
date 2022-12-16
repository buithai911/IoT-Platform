const express = require("express");
const { connectDB } = require('./database/dataBase');
connectDB();
const app = express();
const  port = 3000;
const authRoute = require('./Routers/authRoute');
const userRoute = require('./Routers/userRoute');
const deviceRoute = require('./Routers/deviceRoute');
const telemetryRoute = require('./Routers/telemetryRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('hiii'));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/device', deviceRoute);
app.use('/api/v1/device/telemetry', telemetryRoute);

//err
app.use('*', (err, req, res, next) => {
    const message = err.message || "Server is not respond";
    const status = err.status || 500;
    res.status(status).json({message});
})
app.listen(port, ()=>{
    console.log("ok");
})