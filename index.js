const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const url = 'mongodb://127.0.0.1:27017/whatsaap';
const methodOverride = require("method-override");
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });



app.set("views", path.join(__dirname, "views"));
app.set("view engin", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extende: true }));
app.use(methodOverride("_method"));

main().then(() => {
    console.log("Connection succssesful");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(url);
}



// let chat1 = new chat({
//     from: "Naresh",
//     to: "Darshan",
//     msg: "Chal chai pine",
//     created_at: new Date(),
// });

// chat1.save().then((res) => {
//     console.log(res);
// });



app.get("/chats", async (req, res) => {
    let chats = await chat.find()
    //console.log(chats);
    res.render("index.ejs", { chats });
});


// New route

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
    // console.log(res);
})

// Create new chat route

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newchat = new chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });

    newchat.save().then(req => { console.log("Chat was saved") }).catch(err => { console.log(err) })
    res.redirect("/chats");
});


// Edit chat route

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chats = await chat.findById(id);

    res.render("edit.ejs", { chats });
});



//Update route

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedchat = await chat.findByIdAndUpdate(id,
        { msg: newMsg },
        { runValidators: true, new: true, },
    );
    console.log(updatedchat);
    res.redirect("/chats");
});


// Delete route

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedchat = await chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");

})



app.get("/", (req, res) => {
    res.send("Working");
});



const port = 8080;

app.listen(port, () => {
    console.log(`Server is listening on port:${port}`)
});