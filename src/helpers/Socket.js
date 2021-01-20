import SocketIOClient from "socket.io-client";
const socketHelper = SocketIOClient(process.env.REACT_APP_API);

socketHelper.on("connect", (_) => {
    sessionStorage.setItem("SocketID", socketHelper.id);
});

window.addEventListener("beforeunload", (_) => {
    if (
        sessionStorage.getItem("userID") &&
        sessionStorage.getItem("SocketID")
    ) {
        socket.emit("userDisconect", {
            _id: sessionStorage.getItem("userID"),
            _socketID: sessionStorage.getItem("SocketID"),
        });
    }
});
export const socket = socketHelper;
