// File will be schema for user representing model of data
import mongoose from "mongoose";

// Establishing attributes for table defined as "transactions"
// Passes this schema into MongoDB to organized and structure Transactions data each time
const TransactionSchema = new mongoose.Schema(
    {
        userId: String,
        cost: String,
        products: {
            type: [mongoose.Types.ObjectId],
            of: Number,
        },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
