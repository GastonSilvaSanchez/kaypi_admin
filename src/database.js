const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kaypiAdmin:kaypiAdmin123@clusterkaypi.1nlh5.mongodb.net/kaypi', {
    useNewUrlParser: true
})
.then (db => console.log('DB is connected'))
.catch(err => console.error(err));