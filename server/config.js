import dotenv from "dotenv";
dotenv.config()


const CorsConfig = {
    origin:["http://localhost:3000", "https://localhost:3000", 'https://plot-in-short-project.herokuapp.com', 'http://plot-in-short-project.herokuapp.com', 'http://localhost:8080', 'https://localhost:8080']
}

const { MONGOOSE_URI } = process.env

export { MONGOOSE_URI, CorsConfig }