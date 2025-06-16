import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('La variable de entorno MONGODB_URI no está definida');
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
  }
};

export default connection;
