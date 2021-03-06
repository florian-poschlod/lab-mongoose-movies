const router = require("express").Router();
const Celebrity = require('../models/Celebrity.js');


// Add celeb form
router.get('/celebrities/new', (req, res) => {
  res.render('celebrities/new')
})


// Access edit celeb view
router.get('/celebrities/:id/edit', (req, res) => {
  const id = req.params.id;

  Celebrity.findById(id)
    .then(celebrity => {
      res.render('celebrities/edit', { celebrity: celebrity })
    })
    .catch(err => {
      console.log(err);
    })
})


// Edit celeb post
router.post('/celebrities/:id', (req, res) => {
  const {name, occupation, catchPhrase} = req.body

  Celebrity.updateOne({ name, occupation, catchPhrase })
    .then(celebrity => {
      res.redirect('/celebrities')
    })
    .catch(err => {
      console.log(err);
    });
})


// Delete a celeb
router.post('/celebrities/:id/delete', (req, res) => {
  const id = req.params.id;

  Celebrity.findByIdAndRemove(id)
    .then(celebrity => {
      res.redirect('/celebrities')
    })
    .catch(err => {
      console.log(err);
    });
})


// Add celeb to db
router.post('/celebrities', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(celebrity => {
      console.log(celebrity, 'was successfully added.');
      res.redirect(`/celebrities/${celebrity._id}`)
    })
    .catch(err => {
      console.log(err);
      res.render('/celebrities/new')
    })
})


//Get all celebs
router.get('/celebrities', (req, res) => {
  Celebrity.find()
    .then(allCelebs => {
      res.render('celebrities/index', { celebs: allCelebs })
    })
    .catch(err => {
      console.log(err);
    })
})


//Get celeb details
router.get('/celebrities/:id', (req, res) => {
  const celebId = req.params.id;
  Celebrity.findById(celebId)
    .then(celebrity => {
      res.render('celebrities/show', { celebrity: celebrity })
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;