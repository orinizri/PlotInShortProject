import dotenv from "dotenv";
dotenv.config()


const CorsConfig = {
    origin:["http://localhost:3000", "https://localhost:3000"]
}

const { MONGOOSE_URI } = process.env

export { MONGOOSE_URI, CorsConfig }