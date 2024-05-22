import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.render('index.ejs', {content: ""})
})

app.post('/', async (req, res)=>{

    const ifscCode = req.body.ifsc;
    try {
        const data = await axios.get('https://ifsc.razorpay.com/'+ ifscCode);
        console.log(data.data);
        res.render('index.ejs', {content: data.data});
    } catch (error) {
        res.status(404).send(error.message);
    }

})

app.listen(port, ()=>{
    console.log('Server is running on port '+ port);
})