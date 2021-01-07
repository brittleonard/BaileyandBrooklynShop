const express = require('express');
const router = express.Router();
const Product = require('../models/products.js')
const about = require('../models/about.js')



// NEW
router.get('/new', (req, res)=>{
    res.render('new.ejs');
}); // Render the view

router.get('/aboutUs', (req, res)=>{
    res.render('./controllers/about.js');
}); // Render the view


//SEED
router.get('/home', (req, res) => {
   Product.create(
      [
        {
           name: 'All Hallows Eve Onesie',
           description: 'Baby onsie with glitter design All Hollows Eve in pumpkin. Display image is in gold glitter but color can also be in black or purple. Can be customized/personalized.',
           img: '/images/all-hallows-eve.jpg',
           price: 17.99,
           quantity: 10
         },
         {
            name: 'Bear Onsie',
            description: 'Simple cute onsie. Black bear sillouette on a white onsie (customizable colors)',
            img: '/images/bear_onsie2.JPG',
            price: 17.99,
            quantity: 10
         },
         {
            name: 'BLM Baby Onsie',
            description: 'BLM baby/toddler onsie. Proceeds will be donated to NAACP and ACLU',
            img: '/images/BLM_onsie2.JPG',
            price: 17.99,
            quantity: 10
         },
         {
            name: 'I love my moms/dads',
            description: 'LGBTQ baby Onsie with pumpkin and customizable.',
            img: '/images/lgbt_pumpkins.JPG',
            price: 17.99,
            quantity: 10
         },
         {
            name: 'Future Onsie',
            description: 'Baby onsie with simple text "FUTURE VOTER" available in multiple sizes/colors and can be customized',
            img: '/images/future_voter2.JPG',
            price: 17.99,
            quantity: 10
         },
         {
            name: 'Future Onsie',
            description: 'Baby onsie with simple text "FUTURE VOTER" available in multiple sizes/colors and can be customized',
            img: '/images/future_voter2.JPG',
            price: 17.99,
            quantity: 10
         }
      ],
      (error, data) => {
      res.redirect('/');
   });
});


// GET
router.get('/', (req, res)=>{
   Product.find({}, (error, allProducts) => {
      res.render('index.ejs', {
           products: allProducts,
           // currentUser: req.session.currentUser
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
      res.redirect('/products');
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
      res.redirect('/products')
   });
});

// SHOW
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
         res.render('show.ejs', {
            product: foundProduct,
            // currentUser: req.session.currentUser,
        });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (error, data) => {
    });
    res.redirect('/products');
});




module.exports = router;
