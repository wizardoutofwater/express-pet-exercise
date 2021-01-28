const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];

let idcount = 2

// GET /api/owners

app.get('/owners', (req, res,) => {
    res.json(owners);
});

// GET /api/owners/:id

app.get('/owners/:id', (req, res) => {
    let foundOwner = owners.find((element) => element.id === parseInt(req.params.id)) ;
    if (foundOwner !== undefined && foundOwner.length != 0){
        res.json(foundOwner);
        console.log (foundOwner.pets);
    } else {
        res.status(404).send('No Owner Found with ID: ' + req.params.id)  ;
    }
});

// POST /api/owners

app.post('/owners', (req, res) => {
    if(!req.body.todo || req.body.todo == ''){
        // send error 
        res.status(400).send('Please send a todo with a todo key');
        return;
    }
    // push new todo list w/ new id.  CHECK FOR SPREAD method {...}
    owners.push({owner: req.body.owner, id: ++idcount});
    res.json(owners);
});

// PUT /api/owners/:id
app.put('/owners/:id', (req, res) => {
    res.send('This is api/owners/:id')
});
// DELETE /api/owners/:id
app.delete('/owners/:id', (req, res) => {
res.send('This is delete api/owners/:id');
});
// GET /api/owners/:id/pets
app.get('/owners/:id/pets', (req, res) => {
    let foundOwner = owners.find((element) => element.id === parseInt(req.params.id)) ;
    if (foundOwner !== undefined && foundOwner.length != 0){
        res.json(foundOwner.pets);
        console.log (foundOwner.pets);
    } else {
        // is this correct?
        res.status(404).send('No Pets Found with for Owner ID: ' + req.params.id)  ;
    }
});
// GET /api/owners/:id/pets/:petId

// POST /api/owners/:id/pets

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})