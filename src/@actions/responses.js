export const request = (type) => {
    return {
        type,
    };
};

export const callback = (type, response) => {
    return {
        type,
        response,
    };
};
