const mongoose = require("mongoose");


const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_ACCESS, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
                   .then(() => console.log('DATABASE Connected'))
                    .catch(e => console.log('error db:', e))

    
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;

