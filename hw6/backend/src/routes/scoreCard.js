import { Router } from 'express';
import ScoreCard from '../models/ScoreCard';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// connection
const router = Router();
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once('open', (db) => console.log('Connected to MongoDB'));

// defined function
const deleteDB = async (res) => {
    try {
        await ScoreCard.deleteMany({});
        console.log('Database deleted');
        res.status(200).send({ message: 'Database cleared'} );
    }
    catch(err) {
        res.status(500).send({ message:'Database deletion error: ' + err });
    }
};

const addDB = async (name, subject, score, res) => {
    try {
        const existing = await ScoreCard.findOne({ name, subject });
        if (existing) {
            await ScoreCard.updateMany({name, subject}, {score});
            console.log('updated card', {name, subject});
            res.status(200).send({ message: `Updating (${name}, ${subject}, ${score})`, 
                                    card: {name, subject, score} });
            
        }
        else {
            const newCard = new ScoreCard({name, subject, score});
            console.log('created card', newCard);
            newCard.save();
            res.status(200).send({ message: `Adding (${name}, ${subject}, ${score})`, 
                                    card: {name, subject, score} });
        }
    }
    catch(err) {
        res.status(500).send({ message:'Card creation error: ' + err });
    }
}

const queryDB = async (type, queryString, res) => {
    const query = {};
    query[type] = queryString;
    console.log(query);

    const found = await ScoreCard.find(query);
    if(found.length !== 0) {
        res.status(200).send({ messages: found.map(
            (card) => {
                return `Found card with name: (${card.name}, ${card.subject}, ${card.score})`
            }
        )});
    }
    else {
        res.status(200).send({ message: `${type} (${queryString}) not found!`})
    }
}

// router operation
router.use(bodyParser.json());

router.delete('/cards', (req, res) => {
    deleteDB(res);
});

router.post('/card', (req, res) => {
    const { name, subject, score } = req.body;
    addDB(name, subject, score, res);
});

router.get('/cards', (req, res) => {
    const { type, queryString } = req.query;
    queryDB(type, queryString, res);
});

export default router;