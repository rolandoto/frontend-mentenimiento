const posibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

export const randomName = (total) => {
    let name = "";
    for (let i = 0; i < total; i++) {
        const randomIndex = Math.floor(
            Math.random() * (posibleChars.length - 0)
        );
        name += posibleChars[randomIndex];
    }
    return name;
};