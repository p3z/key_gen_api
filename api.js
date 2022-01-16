function randomQuery(o,r,n="false"){let t=Math.floor(Math.random()*(r-o+1)+o);return 1==n?(console.log("String mode set to true"),t.toString()):t}function randomAlpha(o="false"){return["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"][randomQuery(0,25)].toLowerCase()}function coinFlip(){return randomQuery(0,1)}


//const { getLicenseCharacter, build_license, key_length, delimiter, delimiter_step } = require('./app.js'); // This is the code that spits out license keys
const express = require('express');
var router = express.Router();
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public')); // Media assets are located here


// Config settings
app.set('title', 'PWS_KEY_GEN')
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended:true}));

////////////////////////////////////////////////////////////////////////////////



// Requires some dependent code from shay-libs

// Return format looks like this: 0A0M-937M-KS31-PR4V (each character is randomly generated)




const key_length = 16; // Entire length of license key required
const delimiter = "-"; //
const delimiter_step = 4; // Make sure this is a factor of key_length for symmetrical keys

exports.key_length = key_length;
exports.delimiter = delimiter;
exports.delimiter_step = delimiter_step;

// Gets a single character
function getLicenseCharacter(){
    var character = null;

    switch(coinFlip()){
        case 0: // letter
            character = randomAlpha();
            break;

        case 1: // number
            character = randomQuery(0, 9);
            break;
    }

    // console.log("Before")
    // console.log(character)

    if(character === undefined || character === null){
        character = 0;
    }

    // console.log("After")
    // console.log(character)

    return character;

}



function build_license(delimiter, step, length){
    var licenseStr = "";

    for(var i = 1; i < length + 1 ; i++){
        licenseStr += getLicenseCharacter();

        if (i % delimiter_step === 0 && i !== length){

            licenseStr += delimiter;
        
        }
    }

    return licenseStr;
    
}


    
    // // Really the index file is irrelevant, it just shows the results of one generation
    // var display_el = document.getElementsByTagName("h1")[0];

    // var btn = document.getElementsByTagName("button")[0];

    // btn.addEventListener("click", ()=> {
    //     display_el.textContent = build_license(delimiter, delimiter_step, key_length);
    // })

    // display_el.textContent = build_license(delimiter, delimiter_step, key_length);
 

 
   





// What are the routes needed

// Get new key
// get multiple keys as json
// get multiple keys as file? (needed?)


app.get('/key/:qty?', (req, res) => {

  var qty = 1;

  if(req.params.qty){
    var qty = req.params.qty;
  }

  var keys = [];

  for(var i = 1; i <= qty; i++){
      keys.push(build_license(delimiter, delimiter_step, key_length));
  }
  
  var return_obj = {
    keys: keys
  }




res.send(JSON.stringify(return_obj));
});

app.get('*', (req, res) => {
      res.send('permission denied') ;
    });



app.listen(port, () => {
  
  console.log(`App listening at http://localhost:${port}`);

})

