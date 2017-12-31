/**================================================================ 
            History Of The File 
    Author          - Gunjan Patel 
    purpose         - Writing - Login Related APIs Operation handling
==================================================================== **/
let async = require("async");
let crypto = require('crypto');
let User = require("../app/models/user.js");
let ENV = require("../config/environment.js");
let config = require("../config/config-"+ENV.env+".json");

module.exports = {
    getUser: function(req, res) {
        ///api/customers/:id
        User.findOne({ email: req.body.email },{password : 0}, function(err, user) {
            if (err) {
                console.log(err);
                return res.status(400).send({ status: false, message: JSON.stringify(err) })
            }else{

            }            
            return res.status(200).send({ status: true, data: user });
        });
    },
    // updateUsers: function(req, res){
    //     try{
    //         let where = req.body.id;
    //         if(where){
    //             User.findOne({ _id : where }, function(err, user) {
    //                 if (!user) {
    //                     return res.status(500).send({ status: false, message: globalError.USER_NOTEXIST });
    //                 }
    //                 // set the user's local credentials
    //                 user.firstName = req.body.firstName;
    //                 user.lastName = req.body.lastName;
    //                 user.title = req.body.title;
    //                 user.phone = req.body.phone;
    //                 user.accessLevel = req.body.accessLevel;
    //                 let companyId = req.body.company,
    //                     departmentId = req.body.department;
    //                 // if(companyId)
    //                 //     user._idCompany = { _id : companyId };
    //                 if(departmentId)
    //                     user._idDepartment = { _id : departmentId };                    
    //                 user.date_Modified = Date.now();

    //                 user.save(function(err) {
    //                     if (err)
    //                         return res.status(400).send({ status: false, message: JSON.stringify(err) })
    //                     return req.res.status(200).send({status:true, data: req.user});
    //                 });
    //             });
    //         }else{
    //             return res.status(400).send({ status: false, message: globalError.INPUT_NOT_VALIDATE })
    //         }
    //     }catch(e){
    //         console.log(e);
    //         return res.status(400).send({ status: false, message: e })
    //     }
    // },
    deleteUser: function(req, res) {
        let where = req.body.id;
        if(where){
            User.findOneAndUpdate(
                    {_id: where}, 
                    {
                        $set:{
                            display : false
                        }
                    }, function(err, doc){
                if(err)
                    return res.status(400).send({ status: false, message: JSON.stringify(err) });
                return req.res.status(200).send({status: true, data: doc});
            });
        }else{
            return res.status(400).send({ status: false, message: globalError.INPUT_NOT_VALIDATE })
        }
    },
    logoutUser: function(req, res) {
        req.logout();
        res.status(200).send({ status: true, message: "Successful logout." })
    }
}