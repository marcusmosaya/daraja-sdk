let utils=require('./utils');
let {defaultConfig}=require('./configure');
let queryString=require('querystring');
module.exports=class HTTPClient {
    /**
     * A simple HTTP client wrapper for making requests.
     * Handles common headers, error handling, and JSON parsing.
     * @param {string} baseURL - The base URL for API requests.
     * @param {Object} [defaultHeaders={}] - Default headers to include with every request.
     */
    constructor(config) {
        this.baseURL =utils.getDefaultBaseUrl(config.mode)||config.host||defaultConfig.host;
        this.defaultHeaders = config.defaultHeaders;

    }

    /**
     * Wrapper for all the methods and requests
     * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
     * @param {string} endpoint - The API endpoint relative to the base URL.
     * @param {Object} [options={}] - Fetch options like body, headers, etc.
     * @returns {Promise<Object>} - A promise that resolves to the JSON response.
     * @throws {Error} If the HTTP request fails or the response is not OK.
     */
    async _request(method, endpoint,options) {
        const path = `${this.baseURL}${endpoint}`;
        const headers = { ...this.defaultHeaders, ...options.header };
        try {
            const response = await fetch(path, {
                method,
                headers,
                ...options,
            });
            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`HTTP Error ${response.status}: ${errorBody}`);
            }
            // Attempt to parse JSON. If not JSON, return response text or null.
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }

        } catch (error) {
            throw error; 
        }
    }

    /**
     * Performs a GET request.5
     * @param {string} endpoint - The API endpoint.
     * @param {Object} [params] - Query parameters.
     * @param {Object} [headers] - Additional headers for this request.
     * @returns {Promise<Object>}
     */
    get(endpoint, params, headers) {
        let url = endpoint;
        if (params) {
            const querystring = queryString.encode(params);
            url = `${endpoint}?${querystring}`;
        }
        return this._request('GET', url, { headers });
    }

    /**
     * Performs a POST request.
     * @param {string} endpoint - The API endpoint.
     * @param {Object} [data] - The data to send in the request body (will be stringified to JSON).
     * @param {Object} [headers] - Additional headers for this request.
     * @returns {Promise<Object>}
     */
    post(endpoint, data, header) {
        const defaultPostHeaders = { 'Content-Type': 'application/json' };
        return this._request('POST', endpoint, {
            headers: { ...defaultPostHeaders, ...header},
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * Performs a PUT request.Currently not in use
     * @param {string} endpoint - The API endpoint.
     * @param {Object} [data] - The data to send in the request body (will be stringified to JSON).
     * @param {Object} [headers] - Additional headers for this request.
     * @returns {Promise<Object>}
     */
    put(endpoint, data, headers) {
        const defaultPutHeaders = { 'Content-Type': 'application/json' };
        return this._request('PUT', endpoint, {
            headers: { ...defaultPutHeaders, ...headers },
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * Performs a DELETE request.Currently not in use
     * @param {string} endpoint - The API endpoint.
     * @param {Object} [headers] - Additional headers for this request.
     * @returns {Promise<Object>}
     */
    delete(endpoint, headers) {
        return this._request('DELETE', endpoint, { headers });
    }
}