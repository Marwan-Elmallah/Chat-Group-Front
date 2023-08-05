const loginName = document.getElementById("loginName")
const loginBtn = document.getElementById("loginBtn")
const usersList = document.getElementById("usersList")
const mainLogin = document.getElementById("mainLogin")
const chatRoom = document.getElementById("chatRoom")
const sendMsgBtn = document.getElementById("sendMsgBtn")
const message = document.getElementById("message")
const chatDisplay = document.getElementById("chatDisplay")

const { Server } = require("socket.io");

const io = new Server({
    serveClient: false
});

const clientIO = io("https://chat-group-aqmx.onrender.com")

clientIO.emit("connection")

// clientIO.emit("disconnect")

let allChat = () => {
    clientIO.on("displayMsg", (msg) => {
        chatDisplay.innerHTML = ""
        msg.map((m) => {
            chatDisplay.innerHTML += `
                <div class="card my-3 p-2">
                    <h6 class="card-subtitle mb-2 text-primary">From: ${m.user}</h6>
                    <p class="card-text">${m.message}</p>
                </div>
            `
        })
        // console.log(msg, userMsg);
    })
}

let loginPage = () => {
    clientIO.emit("loginName", loginName.value)
    usersList.classList.add("card")
    usersList.classList.add("p-2")
    // console.log(mainLogin);
    mainLogin.style.display = "none"
    chatRoom.style.display = "block"
}


loginBtn.addEventListener("click", () => {
    loginPage()
    allChat()
})

clientIO.on("showUsers", (users) => {
    // console.log(users);
    usersList.innerHTML = ""
    users.map((user) => {
        usersList.innerHTML += `
        <li class="list-group-item px-4">${user.username}</li>
    `
    })
})
sendMsgBtn.addEventListener("click", () => {
    // console.log(message.value)
    clientIO.emit("sendMessage", message.value)
    message.value = ""
})



allChat()


