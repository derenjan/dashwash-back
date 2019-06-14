var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/dashwash', {useNewUrlParser: true } );
mongoose.set('useCreateIndex', true)

