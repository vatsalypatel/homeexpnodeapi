/**================================================================ 
            History Of The File 
    Author          - Vatsaly Patel 
    purpose         - Writing - Login Related APIs Operation handling
==================================================================== **/
let CategoryModel = require("../app/models/category");
let ENV = require("../config/environment.js");
let config = require("../config/config-"+ENV.env+".json");

module.exports = {
    getCategories: function(req, res) {
        ///api/customers/:id
        CategoryModel.find({}, function(err, list) {
            if (err) {
                console.log(err);
                return res.status(400).send({ status: false, message: JSON.stringify(err) })
            }       
            return res.status(200).send({ status: true, data: list });
        });
    }
}