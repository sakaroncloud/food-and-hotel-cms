export enum ENDPOINT {
    UPLOAD = "upload/images",
    BRANDS = "brands",
    CAR_TYPES = "car-types",
    USERS = "users",
    NEWSLETTERS = "newsletters",
    MODELS = "models",
    GENERAL_SETTINGS = "general-settings",
    SEO_SETTINGS = "seo-settings",
    COMPANY_INFORMATION = "companyinfo-settings",
    FAQ = "faqs",
    QUESTIONS = "contact-queries",
    ME = "users/me",
    RENTALS = "rentals",

    CREATE_ACCOUNT = "auth/register",
    FORGET_PASSWORD = "auth/forgetPassword",
    VERIFY_EMAIL = "auth/verifyEmail",
    CHANGE_PASSWORD = "auth/changePassword",
    RESET_PASSWORD = "auth/resetPassword",
    VERIFY_RESET_TOKEN = "auth/verifyResetToken",

    BLOGS = "blogs",
    DASHBOARD = "dashboard",
}

export type POST_METHOD = "post" | "patch" | "delete";
export type HTTP_METHOD = "post" | "get" | "patch" | "delete";