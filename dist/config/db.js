"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `./${process.env.NODE_ENV}.env` });
mongoose_1.default.Promise = global.Promise;
let dbConnection;
const options = {
    useUnifiedTopology: true,
    connectTimeoutMS: 200000,
    socketTimeoutMS: 2000000,
    useNewUrlParser: true,
    dbName: process.env.DB_NAME
};
const connectDatabase = async () => {
    try {
        if (dbConnection) {
            console.log(`----DB----PREVIOUS-CONNECTION ${process.env.DB_NAME}----------------`);
            return 'connected';
        }
        else {
            await mongoose_1.default.connect(process.env.DB_STRING, options);
            dbConnection = mongoose_1.default.connection;
            console.log(`----DB----NEW-CONNECTION-INIT ${process.env.DB_NAME}---------------`);
            return 'connected';
        }
    }
    catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=db.js.map