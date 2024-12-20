export const API_ROUTES = {
    login: {
        endpoint: "/auth/login" as const,
        queryKey: "login" as const,
    },
    logout: {
        endpoint: "/auth/signout" as const,
        queryKey: "logout" as const,
    },
    signUp: {
        endpoint: "/auth/signup" as const,
        queryKey: "signUp" as const,
    },
    cuisine: {
        endpoint: "/cuisine" as const,
        queryKey: "cuisine" as const,
    },
    city: {
        endpoint: "/city" as const,
        queryKey: "city" as const,
    },
    restaurant: {
        endpoint: "/restaurant" as const,
        queryKey: "restaurant" as const,
    },
    singleCusineRestaurants: {
        endpoint: "/restaurant/cuisine" as const,
        queryKey: "singleCusineRestaurants" as const,
    },
    restImage: {
        endpoint: "/restaurant-image" as const,
        queryKey: "restImage" as const,
    },
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
