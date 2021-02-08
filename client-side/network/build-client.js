import axios from "axios";

const buildClient = ({req}) => {
    // console.log(req.headers.cookie)
    if (typeof window === 'undefined') {
        // we are on the server
        return axios.create({
            baseURL: 'http://localhost:5000/api/v1',
            headers: req.headers
        })
    } else {
        // we are on the browser
        return axios.create({
            baseURL: 'http://localhost:5000/api/v1',
        })
    }
}

export default buildClient