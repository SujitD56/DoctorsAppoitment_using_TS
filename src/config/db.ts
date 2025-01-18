import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: `./${process.env.NODE_ENV}.env` });

mongoose.Promise = global.Promise;

let dbConnection: any;

const options = {
    useUnifiedTopology: true,
    connectTimeoutMS: 200000,
    socketTimeoutMS: 2000000,
    useNewUrlParser: true,
    dbName: process.env.DB_NAME
  };

export const connectDatabase = async () => {
  try {
    if(dbConnection){
        console.log(`----DB----PREVIOUS-CONNECTION ${process.env.DB_NAME}----------------`);
        return 'connected'
    }else{
      await mongoose.connect(process.env.DB_STRING as string, options);
      dbConnection = mongoose.connection;
      console.log(`----DB----NEW-CONNECTION-INIT ${process.env.DB_NAME}---------------`);
      return 'connected'
    }
  }
    catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};