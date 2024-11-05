import axios from "axios"

// Create an instance of axios with default configurations
export const axiosInstance = axios.create({});

// Function to connect to an API using axios
export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        // Set the HTTP method (GET, POST, etc.)
        method: `${method}`,
        // Set the URL for the API endpoint
        url: `${url}`,
        // Set the request body data, defaulting to null if not provided
        data: bodyData ? bodyData : null,
        // Set custom headers, defaulting to null if not provided
        headers: headers ? headers : null,
        // Set URL parameters, defaulting to null if not provided
        params: params ? params : null,
    });
}
