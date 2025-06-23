
const express = require("express"); //retourne function qu'on peut l'utiliser et pour extraire cette bibliothèque 
const app = express(); // on va utiliser app pour réaliser tt demande 
app.get("/hello", function(req,res){
    res.send("hello");

})

app.post("/addCommenthello", function(req,res){
    res.send("helloPost");

})

app.listen(3000, () => {
    console.log("I am listening in port 3000");
})