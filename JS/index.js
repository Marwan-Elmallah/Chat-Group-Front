const loginName = document.getElementById("loginName")
const loginBtn = document.getElementById("loginBtn")
const usersList = document.getElementById("usersList")
const mainLogin = document.getElementById("mainLogin")
const chatRoom = document.getElementById("chatRoom")
const sendMsgBtn = document.getElementById("sendMsgBtn")
const message = document.getElementById("message")
const chatDisplay = document.getElementById("chatDisplay")
const chatRoomPrivate = document.getElementById("chatRoomPrivate")

const clientIO = io("https://chat-group-aqmx.onrender.com")

// const clientIO = io("http://localhost:5000")

clientIO.emit("connection")


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

        // console.log(msg);
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
        <li class="list-group-item px-4" onClick="chatTo('${user.id}')">${user.username}</li>
    `
    })
})
sendMsgBtn.addEventListener("click", () => {
    // console.log(message.value)
    clientIO.emit("sendMessage", message.value)
    message.value = ""
})

allChat()

// Private Chat

const usersListPrivate = document.getElementById("usersListPrivate")
const chatDisplayPrivate = document.getElementById("chatDisplayPrivate")
const messagePrivate = document.getElementById("messagePrivate")
const sendMsgBtnPrivate = document.getElementById("sendMsgBtnPrivate")


let chatTo = (id) => {
    console.log(id);
    clientIO.emit("chatWith", id)
    chatRoom.style.display = "none"
    chatRoomPrivate.style.display = "block"
}
clientIO.on("showUser", (data) => {
    console.log(data);
    usersListPrivate.innerHTML += `
    <li class="list-group-item px-4">${data}</li>
    `
})

sendMsgBtnPrivate.addEventListener("click", () => {
    clientIO.emit("sendMessagePrivate", messagePrivate.value)
    messagePrivate.value = ""
    chatPrivate()
})

const chatPrivate = () => {
    clientIO.on("displayMsgPrivate", (msg) => {
        chatDisplayPrivate.innerHTML = ""
        msg.map((m) => {
            chatDisplayPrivate.innerHTML += `
                <div class="card my-3 p-2">
                    <h6 class="card-subtitle mb-2 text-primary">From: ${m.user}</h6>
                    <p class="card-text">${m.message}</p>
                </div>
            `
        })
        chatDisplayPrivate.scrollTo(0, chatDisplayPrivate.scrollHeight)
        // console.log(msg);
    })
}

chatPrivate()


