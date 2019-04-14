import axios from "axios";

//10.0.0.191 local ip address
const api = axios.create({
    baseURL:"http://10.0.0.191:4500"
});

export default api;