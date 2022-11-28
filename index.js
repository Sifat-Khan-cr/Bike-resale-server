const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.get('/', (req, res) => {
    res.send("Sifat Bikes Server is on Fire ........");
});
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dzhzyda.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

        const Category = client.db('Sifat-Bikes').collection('Bikes-category');
        const Users = client.db('Sifat-Bikes').collection('Users');
        const Products = client.db('Sifat-Bikes').collection('Products');


        app.post('/setUser', async (req, res) => {
            const user = req.body;
            const email = user.email;
            const query = { email };
            const cursor = Users.find(query);
            const find = await cursor.toArray();

            if (find.length) {
                res.send(find);
            } else {
                const result = await Users.insertOne(user)
                res.send(result);
            }


        })
        app.get('/product/:email', async (req, res) => {
            const email = req.params.email;
            const query = { sellerEmail: email }
            const cursor = Products.find(query);
            const products = await cursor.toArray();
            res.send(products);

        })
        app.post('/products', async (req, res) => {
            const user = req.body;

            const result = await Products.insertOne(user)

            res.send(result);


        })

        app.get('/buyer', async (req, res) => {
            const query = { seller: false }
            const cursor = Users.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/seller', async (req, res) => {
            const query = { seller: true }
            const cursor = Users.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/category', async (req, res) => {
            const query = {}
            const cursor = Category.find();
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = Products.find();
            const products = await cursor.toArray();
            res.send(products);
        })
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category: id }
            const cursor = Products.find(query);
            const products = await cursor.toArray();
            res.send(products);
            console.log(products);
        })
        app.get('/authorization/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const cursor = Users.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
        app.get('/advertized', async (req, res) => {
            const query = { advertized: true }
            const cursor = Products.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
        app.patch('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const updatedDoc = {
                $set: {
                    booked: true
                }
            }
            const result = await Products.updateOne(query, updatedDoc);
            res.send(result);
        })


    } catch (error) {
        console.error(error.name, error.message);
    }
}
run();
