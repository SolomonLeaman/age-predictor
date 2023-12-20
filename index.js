
// Import Express, Axios, and ISO-3166 for Country Code Conversions
import express from "express";
import axios from "axios";
import {iso31661} from 'iso-3166'

// Set-up Express App and Port
const app = express();
const port = 3000;

// Connect Public Folder and Body-Parser
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Establish API URL as a Const
const API_URL = "https://api.agify.io";

// Get Route to Load Index.ejs
app.get('/', (req, res) => {
    res.render('index.ejs', {})
})

// Post Route to Handle Form Data, Convert Country Name to ID, Send GET request to API, and Return Results to EJS
app.post('/', async (req, res) => {

// Body-Parser to Get Form Data + Create Let Variable to be Used in For Loop
    const userName = req.body.name
    const countryName = req.body.country
    let countryCode;
    
// For Loop to Iterate Over ISO31661 Array and Find Object w/Matching Country Name to countryName and create countryCode from alpha2 Property
    for (var i = 0; i < iso31661.length; i++) {
        if (countryName === iso31661[i].name) {
            countryCode = iso31661[i].alpha2
            console.log(countryCode)
        } else {
            }
        }

// Try and Catch GET Request to API with name and country_ID Params. Send Result to EJS. 
    try {
        const result = await axios.get(API_URL, {
            params: {
                name: userName,
                country_id: countryCode
            }
        })
        console.log(result.data)
        res.render('index.ejs', {userAge: JSON.stringify(result.data.age)})
    } catch (error) {
        res.send(error)
    }
})

// Establish Server on Port
app.listen(port, () =>
    console.log(`Listening on port ${port}`)
)