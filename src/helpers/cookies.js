import cookie from "react-cookies";

export const cookieHelper = {
    createCookie,
    getCookie,
    deleteCookie,
};

function createCookie(name, value) {
    cookie.save(name, value, { path: "/" });
}

function getCookie(name) {
    return cookie.load(name);
}

function deleteCookie(name) {
    cookie.remove(name, { path: "/" });
}
