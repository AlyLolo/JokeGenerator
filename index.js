import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app= express();
const port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.listen(port,(req,res)=>{
    console.log(`Server starting on port ${port}`);
})
app.get("/", async (req,res)=>{
    res.render('index.ejs');
})
app.post("/submit", async (req,res)=>{
    const keyword = req.body.keyword;
    console.log(keyword)
    if(keyword != ""){ 
        try{
            const result = await axios.get(`https://v2.jokeapi.dev/joke/Dark?contains=${keyword}`);
            const joke = {
                setup: result.data.setup,
                delivery: result.data.delivery
            }
                res.status(200).render('index.ejs',{joke: joke})
        }
        catch(error){
            console.log(error.result.data);
            res.status(500);
        }
        
    }
    else{
        try{
        const result = await axios.get("https://v2.jokeapi.dev/joke/Dark");
        const joke = {
        setup: result.data.setup,
        delivery: result.data.delivery
        }
        res.status(200).render('index.ejs',{joke: joke})}
        catch (error){
            console.log(error.result.data);
            res.status(500);
        }
    }
})