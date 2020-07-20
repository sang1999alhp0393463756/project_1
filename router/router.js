var router = require('express').Router();
var path = require('path');
var notification = require('../notification/notification');
var accountService = require('../services/account_services');
const { error } = require('console');
router.post('/',(req,res)=>{
  var obj = {};
  if(req.body.username) obj.username = req.body.username;
  if(req.body.password) obj.password = req.body.password;
  if(req.body.phone) obj.phone = parseInt(req.body.phone);
  accountService.findLogin(obj).then(data=>{
      if(data.length==0){
        accountService.createAccount(obj).then(data=>{
            res.json({
                error : true,
            });
        })
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
    accountService.findLogin(obj).then(data=>{
        if(data.length!=0){
            res.json(notification(true,"dang nhap thanh cong",data))
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
router.get('/:index',(req,res)=>{
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

module.exports = router;