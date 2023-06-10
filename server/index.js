import express from "express";  // Minimalist web framework that provides robust set of features for web and mobile applications
import bodyParser from 'body-parser';   // Middleware mp module that processes data sent in an HTTP request body 
import mongoose from 'mongoose';    // Object modeling tooling for ansynchronous environments
import cors from 'cors';    // Middleware providing Connect/Express middleware to enable CORS with various options
import dotenv from 'dotenv';    // Allows the creation of .env file for custom environemnt files
import helmet from 'helmet'; // Secures Node.js Express apps by setting various HTTP headers
import morgan from 'morgan';    // Provides tokens

// Viewing routes for the application's variaous screens/features
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"

// DATA IMPORTS
import User from "./models/User.js";    // Import schema
import Product from "./models/Product.js"   // Import schema
import ProductStat from "./models/ProductStat.js";  // Import schema
import Transaction from "./models/Transaction.js";
import { dataUser, dataProduct, dataProductStat, dataTransaction } from "./data/index.js";   // Import data to be used by each schema


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));    // Allows API calls from another server
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);   // Represents the client specific actions tabs
app.use("/general", generalRoutes); // Represents the user profile and dashboard screen 
app.use("/management", managementRoutes);   // Represents the specific management view tabs
app.use("/sales", salesRoutes);     // Represents the various sales view tabs

/* MONGOOSE SETUP */ 
/* Following code connects the application (app) to the mongoDB being used by using the
   inputted mongo URL and port number in the .env file
   Produuces either a console.log message stating the connected port number upon successful connection
   - OR -
   Catches an error in connecting and produces a console.log message for the error
   Continously updates and runs any changes made to the app because of the 'app.listen' command
*/
const PORT = process.env.PORT || 9000;   // process.env allows us to access the vairables created in .env (database connection and port), otherwise port 9000 is used
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);

}).catch((error) => console.log(`{error} did not connect`));