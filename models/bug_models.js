const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Bugs = new Schema({
    status: {
        type: String
    },
    lable: {
        type: String
    },
    project_title: {
        type: String
    },
    engineer_name: {
        type: String
    },
    priority: {
        type: String
    },
    posted_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Bugs', Bugs);