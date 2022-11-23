const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("Sifat Bikes Server is on Fire ........");
});
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})