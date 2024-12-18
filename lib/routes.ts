export const API_ROUTES = {
    login: "/auth/login",
    logout: "/auth/signout",
    signUp: "/auth/signup",
    cuisine: "/cuisine",
    restaurant: "/restaurant",
    singleCusineRestaurants: "/restaurant/cuisine",
    restImage: "/restaurant-image",
};


/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

/**
 * An array of routes tha are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

/**
 * The prefix for API authenticcation routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string[]}
 *
 */

/**
 * The default redirect path after logging out
 * @type {string[]}
 *
 */

export const authRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
];

export const DEFAULT_LOGIN_REDIRECT = "/";

export const LOGGED_OUT_REDIRECT = "/auth/login";
