// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser').json();
// const Recipe = require('../model/recipes');

// router
//     .get('/', (req, res, next) => {
//         Recipe.find()
//             .then(recipes => res.send(recipes))
//             .catch(next);
//     })

//     .get('/:id', (req, res, next) => {
//         Recipe.findById(req.params.id)
//             .then(recipe => res.send(recipe))
//             .catch(next);
//     })
    
//     .post('/', bodyParser, (req, res, next) => {
//         new Recipe(req.body).save()
//             .then(saved => res.send(saved))
//             .catch(next);
//     })

//     .put('/:id', bodyParser, (req, res, next) => {
//         Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
//             .then(updated => res.send(updated))
//             .catch(next);
//     })
    
//     .delete('/:id', (req, res, next) => {
//         Recipe.findByIdAndRemove(req.params.id)
//             .then(deleted => res.send(deleted))
//             .catch(next);
//     });

// module.exports = router;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const router = require("express").Router();
// let Recipe = require("../model/recipe");

// router.route("/").get((req, res) => {
//     Recipe.find()
//     .then(rec => res.json(rec))
//     .catch(err => res.status(400).json("Error: "+err))
// })

// router.route("/add").post((req, res) => {
//     const name = req.body.name;
//     const description = req.body.description;
//     const imageUrl = req.body.imageUrl || "";
//     const ingredients = Array.from(req.body.ingredients);
//     const instructions = Array.from(req.body.instructions);
  

//     const newRecipe = new Recipe({
//         name,
//         description,
//         imageUrl,
//         ingredients,
//       instructions,
      
//     });

//     newRecipe.save()
//         .then(() => res.json("Recipe added"))
//         .catch(err => res.status(400).json("Error: " + err))
// })

// router.route("/:id").get((req, res) => {
//     Recipe.findById(req.params.id)
//     .then(rec => res.json(rec))
//     .catch(err => res.status(400).json("Error: "+err))
// })

// router.route("/:id").delete((req, res) => {
//     Recipe.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Recipe Deleted"))
//     .catch(err => res.status(400).json("Error: " + err))
// })

// router.route("/update/:id").post((req, res) => {
//     Recipe.findById(req.params.id)
//     .then(rec => {
//         rec.name = req.body.name;
//         rec.description = req.body.description;
//         rec.imageUrl = req.body.imageUrl;
//         rec.ingredients = Array.from(req.body.ingredients);
//         rec.instructions = Array.from(req.body.instructions);
      

//         rec.save()
//         .then(() => res.json("Recipe updated"))
//         .catch(err => res.status(400).json("Error: "+err))
//     })
//     .catch(err => res.status(400).json("Error: " + err))
// })


// module.exports = router
const express = require("express");
const {  check, validationResult } = require("express-validator");
const bodyParser = require('body-parser').json();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authrecipe = require("../middleware/authrecipe");

const Recipe = require("../model/Recipe");

//method - POST
//param - /add
//"http://localhost:3001/recipe/add"

router.post(
  "/add",
  [
    check("name", "Please Enter a Valid recipe name")
      .not()
      .isEmpty(),
      check("description", "Please Enter receipe description")
      .not()
      .isEmpty(),
     check("imageUrl", "Please Enter a Valid url")
    .not()
    .isEmpty(),
    check("ingredients", "Please Enter  ingredients")
    .not()
    .isEmpty(),
    check("instructions", "Please Enter descriptions")
    .not()
    .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, description, imageUrl, ingredients, instructions } = req.body;
    try {
      let recipe = await Recipe.findOne({
    description
      });
      if (recipe) {
        return res.status(400).json({
          msg: "Recipe Already Exists"
        });
      }

      recipe = new Recipe({
       name, 
       description,
       imageUrl,
       ingredients,
       instructions

      });


      await recipe.save();

      const payload = {
        recipe: {
          id: recipe.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);


// //method - POST
// //description - Get LoggedIn User
// //"http://localhost:3001/user/me"

// router.get("/me", auth, async (req, res) => {
//   try {
//     // request.user is getting fetched from Middleware after token authentication
//     const user = await User.findById(req.user.id);
//     res.json(user);
//   } catch (e) {
//     res.send({ message: "Error in Fetching user" });
//   }
// });

module.exports = router;