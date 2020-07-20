var accoutModel = require('../modal/account_modal');
function getAll(){
    return accoutModel.find();
}
function getBypaging(index){
    return accoutModel.find().skip((index-1)*5).limit(5);
}
function getById(id){
    return accoutModel.find({
        _id:id
    })
}
function findLogin(accout){
    return accoutModel.find({
        username : accout.username,
        password : accout.password
    })
}
function createAccount(accout){
    return accoutModel.create({
        username : accout.username,
        password : accout.password,
        phone : accout.phone
    })
}
function updateById(id,account){
    return accoutModel.updateOne({
        _id : id
    },{
        username : account.username,
        password : account.password,
        phone : account.phone
    })
}
function deleteById(id){
    return accoutModel.deleteOne({
        _id: id
    })
}
module.exports = {
    findLogin,
    createAccount,
    updateById,
    deleteById,
    getAll,
    getById,
    getBypaging
}