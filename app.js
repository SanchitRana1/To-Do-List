//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const _ =require("lodash");
const date = require(__dirname + "/date.js")

console.log(date.date() + " --|-- " + date.num());

//connecting to mongoose server
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin-Sanchit:Test1234@cluster0.yu1bxwd.mongodb.net/toDoList", { useNewUrlParser: true })

//Blog Schema
const blogSchema = new mongoose.Schema({
    name: String
})
const Blog = mongoose.model("Blog", blogSchema);
// var blog = new Blog();

const item1 = new Blog({
    name: "Welcome to the List"
})
const item2 = new Blog({
    name: "Hit + to add an item."
})
const item3 = new Blog({
    name: "<-- Hit this to delete an item."
})
const defItems = [item1, item2, item3];
// item.save();

// List Schema
const listSchema = new mongoose.Schema({
    name: String,
    items: [blogSchema]
})
const List = mongoose.model("List", listSchema);


const app = express();
var Items = [];
var workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", function (req, resp) {
    Blog.find().then(function (blogs) {

        resp.render("list", { listTitle: date.date(), newListItem: blogs })
    })
    //----> TO LOCALE DATE STRING
    // console.log(Items)
    // resp.render("days",{kindOfDay: day})
});

app.post("/", function (req, resp) {
    var item = req.body.newItem;
    var button = req.body.button; // gives the title
    // console.log(req.body);
    if (item.length !== 0) {
        // Items.push(item);
        var blog = new Blog({
            name: item
        });

        if(button===date.date()){
            blog.save();
            // console.log("inside date")
            resp.redirect("/");
        }else{
            // console.log("outside date")
            List.findOne({ name: button }).then(function (list) {
                list.items.push(blog);
                list.save();
                resp.redirect("/"+button);
                // console.log(list)
            })
        }

    }else{
        if(button===date.date()){
            // blog.save();
            // console.log("inside date")
            resp.redirect("/");
        }else{
            resp.redirect("/"+button);
        }
    }



});
// for checkbox
app.post("/delete", function (req, resp) {
    // resp.render("list", { listTitle: "Work List", newListItem: workItems })
    // console.log(req.body)
    var item = req.body.checkbox;
    var id = item.split("|")[0]
    var listName = item.split("|")[1]
    
    if (item.length !== 0) {

        if(listName === date.date()){
            Blog.findByIdAndRemove(id).then(function (res) {
                // console.log("Removed item : " + res);
            })
            resp.redirect("/");
        }
        else{
            List.findOneAndUpdate({name:listName},{$pull:{items:{_id:id}}}).then(function (list) {
                // console.log("Removed item : " + list);
            })

            resp.redirect("/"+listName);
        }
    }
});

app.get("/:customListName", function (req, resp) {
    // console.log(req.params.customListName);
    const customListName = _.capitalize(req.params.customListName);
    var new1  = new Blog({
        name: "Task completed !"
    })
    var first=[new1]

    List.findOne({ name: customListName }).then(function (docs) {
        // console.log(docs);
        if (!docs) {
            // create a new List
            var list = new List({
                name:customListName,
                items:first
            })
            list.save();
            // console.log("doesn't exist")
            resp.redirect("/"+customListName)
        }
        else{
            //show existing list 
            // console.log("Exists")
            resp.render("list", { listTitle: docs.name, newListItem: docs.items })
        }
    })

})

app.post("/:customListName",function(){
    // if(customListName)
})

app.get("/about", function (req, resp) {
    resp.render("about")
});
// app.post("/work", function (req, resp) {
//     var item = req.body.newItem;
//     if (item) {
//         workItems.push(item);
//     }
//     // console.log(newItem);
//     // resp.render("list",{newListItem:Item})
//     resp.redirect("/")
// });


app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000");
}); 
