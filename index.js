const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.get('/', (req, res) => {
    res.send("Sifat Bikes Server is on Fire ........");
});
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dzhzyda.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://Sifat-Bikes:aNpdMigH6wLXH3IW@cluster0.dzhzyda.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

        const Category = client.db('Sifat-Bikes').collection('Bikes-category');
        const Users = client.db('Sifat-Bikes').collection('Users');
        const Products = client.db('Sifat-Bikes').collection('Products');
        // const Review = client.db('lawyer').collection('reviews');


        app.post('/setUser', async (req, res) => {
            const user = req.body;
            const email = user.email;
            const query = { email };
            const cursor = Users.find(query);
            const find = await cursor.toArray();

            // console.log(find.length)
            if (find.length) {
                res.send(find);
            } else {
                const result = await Users.insertOne(user)
                res.send(result);
            }


        })
        app.post('/products', async (req, res) => {
            const user = req.body;
            // const email = user.email;
            // const query = { email };
            // const cursor = Users.find(query);
            // const find = await cursor.toArray();

            // console.log(find.length)
            const result = await Products.insertOne(user)

            res.send(result);


        })

        app.get('/category', async (req, res) => {
            const query = {}
            const cursor = Category.find();
            const services = await cursor.toArray();
            res.send(services);
        });


    } catch (error) {
        console.error(error.name, error.message);
    }
}
run();
