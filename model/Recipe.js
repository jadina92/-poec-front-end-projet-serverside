const mongoose = require('mongoose');


// schema for a recipe - name, description, imageUrl, ingredients, instructions
const RecipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    // ingredients: [{
    //     ingredientId: {
    //         type: Number
    //     },
    //     ingredientDescription: {
    //         type: String
    //     }
    // }],
    ingredients:{
        type: String
    },
    instructions: {
        type: String
    }
});
// export model user with RecipeSchema
module.exports = mongoose.model('recipe', RecipeSchema);