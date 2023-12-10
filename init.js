const mongoose = require("mongoose");
const chat = require("./models/chat.js");
const url = 'mongodb://127.0.0.1:27017/whatsaap';


main().then(() => {
    console.log("Connection succssesful");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(url);
}

let allchats = [
    {
        from: "Naresh",
        to: "Vivek",
        msg: "Good morning",
        created_at: new Date(),
    },
    {
        from: "Darshan",
        to: "Vivek",
        msg: "Good night",
        created_at: new Date(),
    },
    {
        from: "Joy",
        to: "Kaushal",
        msg: "Hello bro",
        created_at: new Date(),
    },
    {
        from: "Deep",
        to: "Keval",
        msg: "Where are you going?",
        created_at: new Date(),
    },
    {
        from: "Darshan",
        to: "Naresh",
        msg: "Chal chai pine",
        created_at: new Date(),
    }
]

chat.insertMany(allchats);