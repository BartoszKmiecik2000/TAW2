const express = require('express');
const httpStatusCodes = require('http-status-codes');
const router = express.Router();

const task = require('../models/task.model');

router.get('/', (req, res) => { // Zwróć wszystkie taski
    task.find().then(docs => {
        res.send(docs);
    }).catch(e => {
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    });
});

router.get('/:id', (req, res) => { // Zwróć task na podstawie ID
    let id = req.params.id;
    task.findById(id).then(docs => {
        res.send(docs);
    }).catch(e => {
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
    })
});

router.post('/', (req, res) => { // Stwórz task
    const obj = req.body;
    task.create(obj).then(doc => {
        res.status(httpStatusCodes.StatusCodes.CREATED).send(doc);
    }).catch(e => {
        res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).send(e);
    });
});

router.put('/:id', (req, res) => { // Modyfikuj task na podstawie ID
    const id = req.params.id;
    const obj = req.body;

    task.findOneAndUpdate(
      { _id: id },
      { name: obj.name, date: obj.date, content: obj.content },
      { new: true }
    )
      .then(doc => {
        if (!doc) {
          return res
            .status(httpStatusCodes.StatusCodes.NOT_FOUND)
            .send('Task not found');
        }
        res.status(httpStatusCodes.StatusCodes.OK).send(doc);
      })
      .catch(e => {
        res
          .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
          .send(e);
      });
  });

// router.delete('/:id', (req, res) => { // Usuń task na podstawie ID
//     let id = req.params.id;
//     user.findByIdAndDelete(id).then(docs => {
//         res.send(docs);
//     }).catch(e => {
//         res.status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR);
//     })
// });
router.delete('/:id', (req, res) => { // Usuń task na podstawie ID
    const id = req.params.id;

    task.findOneAndDelete({ _id: id })
      .then(docs => {
        if (!docs) {
          return res
            .status(httpStatusCodes.StatusCodes.NOT_FOUND)
            .send('Task not found');
        }
        res.status(httpStatusCodes.StatusCodes.OK).send(docs);
      })
      .catch(e => {
        res
          .status(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
          .send(e);
      });
  });

module.exports = router;
