const {Firestore} = require('@google-cloud/firestore');
const firebase = require("firebase");
// const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const config = require('./todo_hooks.json');
const { ApolloServer } = require('apollo-server');

const { typeDefs } = require('./typeDef');
require("firebase/firestore");

const FS = {
    COLLECTION: {
      TODOS: "todos"
    }
  };

firebase.initializeApp(config);

const db = firebase.firestore();

const resolvers = {
    Query: {
        todos: () => {
            return new Promise((resolve) => {
                let result = [];
                db
                .collection(FS.COLLECTION.TODOS)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        result.push(doc.data().display);
                    });
                    resolve(result.filter(e => e));
                });
            });
        }
    }
}

const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    playground: true
});



// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());



// app.get('/getAllTodos', (req, res) => {
//     let result = {};
//     db
//         .collection(FS.COLLECTION.TODOS)
//         .get()
//         .then((snapshot) => {
//             snapshot.forEach((doc) => {
//                 result = {
//                     ...result,
//                     [doc.id]: doc.data().display
//                 }
//             })
//             res.send(result);
//         });
// });

// app.post('/createTodo', (req, res) => {
//     const text = req.body.text;
//     db
//         .collection(FS.COLLECTION.TODOS)
//         .add({
//             display: text
//         })
//         .then(function(docRef) {
//             console.log("Todo Added with ID: ", docRef.id);
//             res.send('Todo Added Successfully');
//         })
// });

// app.listen(9000, () => console.log("Server started on port 9000"));

apolloServer.listen().then(({ url}) => {
    console.log(`Server is listening at ${url}`);
});

