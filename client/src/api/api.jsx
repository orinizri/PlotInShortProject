import axios from "axios";
let myUrl = "http://localhost:8080/";

if (process.env.NODE_ENV === "production") {
    myUrl = "/";
}
export default axios.create({
    baseURL: myUrl,
});