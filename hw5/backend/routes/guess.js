import express from 'express'
import { getNumber, genNumber } from '../core/getNumber'

const router = express.Router()

router.post('/start', (_, res) => {
  genNumber()
  res.status(200).send({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber();
  const guessed = req.query.number;

  if (guessed < 1 || guessed > 100) {
    res.status(406).send({ msg: 'Not a legal number.' })
  }
  else {
    if (guessed == number)
      res.status(200).send({msg: 'Equal'});
    else if (guessed > number)
      res.status(200).send({msg: 'Bigger'});
    else if (guessed < number)
      res.status(200).send({msg: 'Smaller'});
  }
})

router.post('/restart', (_, res) => {
    genNumber();
    res.status(200).send({msg: 'The game has restarted.'});

})

export default router