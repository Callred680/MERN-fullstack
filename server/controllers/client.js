import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async(req, res) => {
    try{
        const products = await Product.find();  // Grab all products that can be found
        const productsWithStats = await Promise.all(    // Waits till all calls are complete and populates an array with results
            products.map(async (product) => {   // Maps stats to specifc product stats
                const stat = await ProductStat.find({   // Finds stat for particular product id
                    productId: product._id
                })
                return{ // return array of objects with product information and stat information
                    ...product._doc,
                    stat,
                }
            })
        )

        res.status(200).json(productsWithStats);    // Sends the combined products and products stats
    }catch(error){
        res.status(404).json({ message: error.message });   // Generic error for simplicity sake
    }
};

export const getCustomers = async (req, res) => {
    try{
        const customers = await User.find({ role: "user"}).select("-password");  // Does not select password when retrieving each user info
        res.status(200).json(customers);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
};

// This will perform server side pagination compared to client side pagination used for getCustomers
// Involves sorting data on server/backend side and sending data in segments
export const getTransactions = async (req, res) => {
    try {
        // Sort should look like this: { "field": "userId", "sort": "desc"} [ example search sent by MUI from front-end ]
        const { page = 1, pageSize = 20, sort = null, search = ""} = req.query;  // Sets default values for search/sort parameters and grabs current values from front-end
        
        // Formatted sort should look like: { userId: -1 } [ this is what MongoDB will be able to read ]
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);    // Parses search string sent from front-end into an object
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };

            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};  // only calls function if there is a sort value given

        const transactions = await Transaction.find({
            $or:[   // $or allows for list of possible search parameters (only cost and userId due to issues with object type for id)
                { cost: { $regex: new RegExp(search, "i") }},
                { userId: { $regex: new RegExp(search, "i") }}
            ],
        })
            .sort(sortFormatted)
            .skip(page * pageSize)  // Skips to proper page for query
            .limit(pageSize);   // Limits search results

        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i" },  // Finds all objects (Transactions) with given parameters, either specifc search or other options
        });

        res.status(200).json({transactions, total});  // Return page of transactions and total count based on given search
    }catch(error){
        res.status(404).json({ message: error.message });
    };
};

export const getGeography = async (req, res) => {
    try{
        const users = await User.find();

        const mappedLocations = users.reduce((acc,{ country }) => {
            const countryISO3 = getCountryIso3(country);    // Grabs country value for each user, converts to new format, add to 'acc' object
            if(!acc[countryISO3]){
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++; // Represents number of users in that country
            return acc;
        }, {}); 

        const formattedLocations = Object.entries(mappedLocations).map( // Maps country with respective count
            ([country, count]) =>{
                return { id: country, value: count };    // Places data into correct format for nivo chart display to use
            }
        );

        res.status(200).json(formattedLocations);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
};
