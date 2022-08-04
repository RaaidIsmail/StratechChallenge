//3/8/22
//Raa-id Ismail
//Stratech JS Assignment

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const fs = require('fs');

'use strict';

//Setting the URL on where to get the information from
const api_url = "https://api-testnet.bybit.com/v2/public/tickers";

//Creating the array to store the instrument data
var database = new Array();

//Asynchronous function to fetch information from the URL 
async function getapi(url) {

    //Fetching the information from the URL
    const response = await fetch(url);

    //storing the JSON data
    var data = await response.json();

    //Converting the JSON data so a string
    var info = JSON.stringify(data);


    //A while loop which ends once all symbols and their respective volumes have been stored
    while (info.includes('symbol')) {
        var length = info.length;

        //Getting the symbol and 24 hour volume from the info string
        var startS = info.indexOf("symbol");
        var endS = info.indexOf(",", startS);
        var symbol = info.substring(startS+9, endS-1);

        var startV = info.indexOf("total_volume");
        var endV = info.indexOf(",", startV);
        var volume24 = info.substring(startV + 14, endV);

        //Creating an instrument object with the symbol name and 24 hour volume
        let i = new Instrument(symbol, volume24);

        //Adding the object to the array
        database.push(i);

        //Slicing the string to remove the data that has been stored in the array
        info = info.slice(endV, length);
    }

    //Sorting the array descendingly by volume
    database.sort((a, b) => {
        return b.volume - a.volume;
    });

    //Printing out the array and using a to string method
    for (let i = 0; i < database.length; i++) {
        console.log(database[i].toString());
    }

    //Getting the current date and time
    var currentDate = new Date();
    var fileName = currentDate.getDate() + '_' + currentDate.getMonth() + '_' + currentDate.getFullYear()+ '_' + currentDate.getHours() + '-' + currentDate.getMinutes() + '.txt';
    console.log(fileName);

    //Printing all the data to a text file as the persistance 
    //The file name is the date and time it was created
    const writeStream = fs.createWriteStream(String(fileName));
    database.forEach(value => writeStream.write(value + '\n'));
    writeStream.on('error', (err) => {
        console.error('Error encountered in writing data to the txt file.');
    });
    writeStream.end();


}

//Calling the asynchronous function 
getapi(api_url);


//Creating an instrument class with a to string function
class Instrument {
    constructor(symbol, volume) {
        this.symbol = symbol;
        this.volume = volume;
    }
    toString() {
        return "The symbol " + this.symbol + " has volume " + this.volume;
    }
}
