import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
//this configures the app to allow cross-origin requests
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
//this configures the app to allow json and urlencoded requests
app.use(express.json({
    limit: "50mb"
}));
app.use(express.urlencoded({
    limit: "50mb"
}));
//this configures the app to serve static files e.g. images from the public folder
app.use(express.static("public"));
//this configures the app to parse cookies
//needed for authentication
app.use(cookieParser());

//import routes
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";
// BASE ROUTES
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
//optional server test route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is working"
    });
    console.log("Test route hit");
});

export default app