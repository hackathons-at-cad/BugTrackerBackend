let Bugs_Form= require('../models/bug_models');
const express =require('express')
const bugs_routes= express.Router();





bugs_routes.route('/').get(function(req, res) {
  Bugs_Form.find(function(err, bug) {
        if (err) {
            console.log(err);
        } else {
            res.json(bug);
        }
    });
});

bugs_routes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Bugs_Form.findById(id, function(err, bug) {
        res.json(bug);
    });
});

bugs_routes.route('/create_bug').post(function(req, res) {
    let bug = new Bugs_Form(req.body);
    bug.save()
        .then(bug=> {
            res.status(200).json({'bug': 'bug information added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new bug information failed');
        });
});

bugs_routes.route('/update/:id').post(function(req, res) {
   Bugs_Form.findById(req.params.id, function(err, bug) {
        if (!bug)
            res.status(404).send('data is not found');
        else
            

            bug.status=req.body.status
            bug.lable=req.body.lable
            bug.engineer_name=req.body.engineer_name
            bug.project=req.body.project
            bug.priority=req.body.priority
            bug.date=req.body.date
           info.save().then(bug => {
                res.json('Bug updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

bugs_routes.delete('/remove/:id', (req, res, next)=>{
    Bugs_Form.findOneAndDelete({"_id":req.params.id})
    .then(data=>res.json(data))
    .catch(next)
})

module.exports=bugs_routes