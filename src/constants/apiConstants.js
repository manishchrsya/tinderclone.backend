const API_URL = {
    /**
     * Auth route
     * */
    SIGNUP: "/signup",
    LOGIN: "/login",
    LOGOUT: "/logout",

    /**
     * Profile route
     * */
    PROFILE_VIEW: "/profile/view",
    PROFILE_EDIT: "/profile/edit",
    PROFILE_PASSWORD: "/profile/password",

    /**
     * Request route
     * */
    REQUEST_SEND: "/request/send",
    REQUEST_SEND: "/request/send",
    REQUEST_REVIEW: "/request/review",

    /**
     * User route
     * */
    USER_REQUEST_RECEIVED: "/user/requests/received",
    USER_CONNECTIONS: "/user/connections",
    USER_FEED: "/user/feed"

    // SEND_CONNECTION_REQUEST: "/sendConnectionRequest"
};

module.exports = { API_URL };