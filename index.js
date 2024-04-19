import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import ejs from 'ejs';

// create port to watch
const port = 3000;

// instansiate express
const app = express();

app.use(bodyParser.json());

// lets bring static files into the mix
app.use(express.static('public'));

// lets set the view engine to use ejs
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

// create the home route
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://secrets-api.appbrewery.com/random');
        res.render('index.ejs', {joke: response.data.secret});
        console.log(response.data);
    }catch(err) {
        console.log(err);
    }
    
})

app.get('/refresh', (req, res) => {
    res.redirect('/');
})

// create server
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
})