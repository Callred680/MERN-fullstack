// File will be schema for user representing model of data
import mongoose from "mongoose";

// Establishing attributes for table defined as "ProductStat"
// Passes this schema into MongoDB to organized and structure product stats data each time
const ProductStatSchema = new mongoose.Schema(
    {
        productId: String,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnits: Number,
            }
        ],
        dailyData: {
            date: String,
            totalSales: Number,
            totalUnits: Number,
        },
    },
    { timestamps: true }
);

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;