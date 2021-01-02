const express = require('express');
const router = express.Router();
const Product = require('../models/products.js')

// NEW
router.get('/new', (req, res)=>{
    res.render('new.ejs');
}); // Render the view

// SEED
router.get('/seed', (req, res) => {
   Product.create(
      [
        {
           name: 'Future Onsie',
           description: 'Baby onsie with simple text "FUTURE VOTER" available in multiple sizes/colors and can be customized',
           img: '/images/future_voter2.JPG',
           price: 15.99,
           quantity: 10
         },
         {
            name: 'Bear Onsie',
            description: 'Simple cute onsie. Black bear sillouette on a white onsie (customizable colors)',
            img: '/images/bear_onsie2.JPG',
            price: 15.99,
            quantity: 10
         },
         {
            name: 'BLM Baby Onsie',
            description: 'BLM baby/toddler onsie. Proceeds will be donated to NAACP and ACLU',
            img: '/images/BLM_onsie2.JPG',
            price: 15.99,
            quantity: 10
         },
         {
            name: 'I love my moms/dads',
            description: 'LGBTQ baby Onsie with pumpkin and customizable.',
            img: '/images/lgbt_pumpkins.JPG',
            price: 15.99,
            quantity: 10
         },
      ],
      (error, data) => {
      res.redirect('/products');
   });
});


// GET
router.get('/', (req, res)=>{
   Product.find({}, (error, allProducts) => {
      res.render('index.ejs', {
           products: allProducts
      });
   }); // Render the view
});

// EDIT
const main = '/';
router.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct
        });
    });
});


// PUT
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, foundProduct) => {
      res.redirect('/home');
  })
})

// POST
router.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
});

// BUY
router.put('/buy/:id', (req, res) => {
   Product.findByIdAndUpdate(req.params.id, {$inc: {qty: -1}}, {new: true}, (error, editInventory) => {
      res.redirect('/home')
   });
});

// SHOW
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
         res.render('show.ejs', {
            product: foundProduct
        });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (error, data) => {
    });
    res.redirect('/home');
});




module.exports = router;
