// console.log(module);

// const eventEmitter = require("events");

// module.exports = new eventEmitter();

module.exports.date= getDate;
module.exports.num= randomNum;



function getDate() {
    var today = new Date();
    var options = { weekday: "long", day: "numeric", month: "long" }

    var day = today.toLocaleDateString("en-US", options)
    return day;
}

function randomNum(){
    var a = Math.floor(Math.random()*100 + 1);
    return a;
}


// <%  for(var i = 0 ; i <newListItem.length ; i++ ){ %>
        
//     <div class="item">   
//         <input type="checkbox">
//         <p> <%= newListItem[i].item %> </p>
//     </div>
        
//     <% } %>

// <%  for(var i = 0 ; i <newListItem.length ; i++ ){ %>
        
//     <div class="item">   
//         <input type="checkbox" >
//         <p> <%= newListItem[i].name %> </p>
//     </div>
         
//     <% } %>

         
// <% listItem.then(function(blogs){ %>
//     <% blogs.forEach(blog=>{ %>
//          <div class="item">   
//              <input type="checkbox">
//              <p> <%= blog.item %> </p>
//          </div>
//     <% }) %>
//  <% }) %>
