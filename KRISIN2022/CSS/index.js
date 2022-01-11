const express = require('express')
const cors = require('cors')
const os = require('os')
const path = require('path');

const getIPAddress = () => {
    const interfaces = os.networkInterfaces();
    const matchedItem = Object
        .keys(interfaces)
        .map(item => {
            const interface = interfaces[item];
            const matchedData = interface.
                find(alias => alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal);
            return matchedData;
        }).find(Boolean);
    return matchedItem.address;
};

const app = express();
app.all('*', cors());
app.use('/demos', express.static(path.join(`${__dirname}/demos`)))
app.get('/wind', (req, res) => {
    res.send(req.query);
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Your proxy app is runnings in ${getIPAddress()}:${PORT}`)
});
