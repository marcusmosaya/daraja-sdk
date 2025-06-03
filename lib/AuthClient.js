
const utils=require('./utils');
const {defaultConfig}=require('./configure');
const queryString=require('querystring');
module.exports=class AuthClient {
    /**
     * Handles authentication and access token management.
     * Assumes OAuth 2.0 Client Credentials Grant.
     * @param {Object} [config] - Configuration credentials, the vital credentials being the mode,consumerKey,consumerSecret 
     */
    constructor(config) {
        this.baseURL = utils.getDefaultBaseUrl(config.mode)||config.host||defaultConfig.host;
        this.consumerKey = config.ConsumerKey;
        this.consumerSecret = config.ConsumerSecret;
        this._accessToken = null;
        this._expiresAt = 0; // Unix timestamp in milliseconds
    }

    /**
     * Checks if the current token is expired or close to expiration.
     * @returns {boolean}
     */
    _isTokenExpired() {
        // we use a buffer of 60 seconds.
        return Date.now() >= this._expiresAt - (60 * 1000);
    }

    /**
     * Obtains a new access token or returns the existing valid one.
     * @returns {Promise<string>} - The access token.
     * @throws {Error} If unable to obtain an access token.
     */
    async getAccessToken() {
        if (this._accessToken && !this._isTokenExpired()) {
            return this._accessToken;
        }

        console.log("Access token is expired or not available. Requesting new token...");
        let base64EncodedConsumerKeyConsumerSecret=new Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
        const headers = { 
            'Authorization':`Basic ${base64EncodedConsumerKeyConsumerSecret}`
        };
        const payload ={
            grant_type: 'client_credentials',
        };
        let request_data=queryString.encode(payload);

        try {
            let endpoint='/oauth/v1/generate'
            let path=this.baseURL+endpoint+"?"+request_data;
            const response = await fetch(path,{
                method: 'GET',
                headers,
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Failed to get access token: ${response.status} - ${errorBody}`);
            }

            const tokenData = await response.json();

            this._accessToken = tokenData.access_token;
            const expiresIn = tokenData.expires_in;
            this._expiresAt = Date.now() + (expiresIn * 1000); // Convert seconds to milliseconds

            if (!this._accessToken) {
                throw new Error("Access token not found in the response.");
            }

            console.log("Successfully obtained new access token.");
            return this._accessToken;
        } catch (error) {
            console.error("Error obtaining access token:", error.message);
            throw error;
        }
    }
}
