import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import app from "./app.js";

const port = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server running on port http://localhost:${port}`);
        })
    } catch (error) {
        console.log("Failed to start server", error)
    }
}
startServer();


