var router = require('express').Router();
var path = require('path');
var notification = require('../notification/notification');
var accountService = require('../services/account_services');
var bcrypt = require('bcryptjs');
router.post('/',(req,res)=>{
  var obj = {};
  if(req.body.username) obj.username = req.body.username;

  if(req.body.phone) obj.phone = parseInt(req.body.phone);
  accountService.findLogin(obj.username).then(data=>{
      if(data.length==0){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                obj.password = hash;
                accountService.createAccount(obj).then(data=>{
                    res.json({
                        error : true,
                    });
                })
            });
        });
      }else{
          res.json({
              error :false
          });
      }
  })
})

router.put('/',(req,res)=>{
    var id = req.body.id;
    var obj = {};
  if(req.body.username) obj.username = req.body.username;
  if(req.body.password) obj.password = req.body.password;
  if(req.body.phone) obj.phone = req.body.phone;
  accountService.updateById(id,obj).then(data=>{
      return res.json(notification(true,"cap nhat thanh cong",data));
  }).catch(err=>{
      res.json("khong tim thay id");
  })
})
router.delete('/',(req,res)=>{
    var id = req.body.id;
    accountService.deleteById(id).then(data=>{
      accountService.getAll().then(data=>{
          res.json(data);
      })
    }).catch(err=>{
        res.json("khong tim thay id");
    })
})
router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/login.html"));
})
router.post('/login',(req,res)=>{
    var obj ={
        username : req.body.username,
        password : req.body.password
    }
    accountService.findLogin(obj.username).then(data=>{
        if(data.length!=0){
            bcrypt.compare(obj.password, data[0].password, function(err, value) {
               if(value){
                res.json(notification(true,"dang nhap thanh cong",data))
               }else{
                res.json(notification(false,"tai khoan hoac mat khau khong chinh xac",data)); 
               }
            });
           
        }else{
            res.json(notification(false,"tai khoan hoac mat khau khong chinh xac",data));
        }
    })
})
router.get('/list',(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/list.html"));
})
router.get('/',(req,res)=>{
    accountService.getAll().then(data=>{
         res.json(data)
    })
})
router.get('/list/:index',(req,res)=>{
    accountService.getBypaging(req.params.index).then(data=>{
         res.json(data)
    })
})
router.get('/list/:id',(req,res)=>{
    var id = req.params.id
    accountService.getById(id).then(data=>{
        return res.json(data)
    }).catch(err=>{
        res.json("khong tim thay id");
    })
})
router.get('/detail/:username',(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/detail.html"));
});
router.get('/detail2/:idUser',(req,res)=>{
  
    accountService.findLogin(req.params.idUser).then(data=>{
        console.log(data);
        res.json(data);
    })
});
module.exports = router;