import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * Stores the access token in a browser cookie.
 *
 * @function setAccessToken
 * @param {string} token - The access token string (e.g., JWT or API token).
 * @description
 * Saves the access token under the cookie name `accessToken` with an expiration of 15 minutes (1/96 of a day).
 * 
 * - **secure**: Enabled only in production, ensuring the cookie is sent over HTTPS.  
 * - **sameSite: 'lax'**: Helps prevent CSRF while allowing cookies on top-level navigation from the same site.  
 * - **path: '/'**: Makes the cookie accessible to all routes within the domain.
 */
export const setAccessToken = (token: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, token, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
};

/**
 * Retrieves the stored access token from cookies.
 *
 * @function getAccessToken
 * @returns {string | null} The stored access token, or `null` if not found.
 * @description
 * Reads the `accessToken` cookie and returns its value if it exists.
 */
export const getAccessToken = (): string | null => {
    const token = Cookies.get(ACCESS_TOKEN_KEY);
    return token || null;
};

/**
 * Removes the stored access token from cookies.
 *
 * @function clearAccessToken
 * @description
 * Deletes the `accessToken` cookie from the browser, effectively logging the user out.
 */
export const clearAccessToken = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
};


/**
 * Checks whether an access token exists in cookies.
 *
 * @function hasAccessToken
 * @returns {boolean} `true` if an access token is present, otherwise `false`.
 * @description
 * Uses {@link getAccessToken} to verify if an access token is currently stored in the browser cookies.
 */
export const hasAccessToken = () => {
    return !!getAccessToken();
}