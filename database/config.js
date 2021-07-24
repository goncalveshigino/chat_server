const mongoose = require('mongoose');


const dbConnection = async () => {
    
    try {
      
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        
        console.log('DB_Online');
      
  } catch (error) {
      console.log(error);
      throw new Error('Erro na base de dados - entrar como admin');
  }

}

module.exports = {
    dbConnection
}