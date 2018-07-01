import axios from 'axios';


let ax = axios.create({
    baseURL:"http://localhost:8000/"
});

export default ax;