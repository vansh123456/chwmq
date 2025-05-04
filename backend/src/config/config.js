import { config } from "dotenv";

const configFile = "../.env";
config({ path: configFile });

const { MONGO_URI, PORT, JWT_SECRET, NODE_ENV,CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_SECRET_KEY } =
    process.env;

    export default {
        MONGO_URI,
        PORT,
        JWT_SECRET,
        CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY,
        CLOUDINARY_SECRET_KEY,
        env: NODE_ENV,
    };