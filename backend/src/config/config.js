import { config } from "dotenv"

const configFile = "../.env";
config();

const { MONGO_URI, PORT, JWT_SECRET, NODE_ENV,CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET} =
    process.env;

    export default {
        MONGO_URI,
        PORT,
        JWT_SECRET,
        CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET,
        env: NODE_ENV,
    };