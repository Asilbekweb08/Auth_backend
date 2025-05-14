const Router=require('express')
const { login, register, checkVerCode } = require('../controllers/auth-controller')

const router=new Router()
router.get('/',(req,res)=>{
    res.status(200).json({message:"Route ishlayabdi"})
})
router.post('/reg',register)
router.post('/login',login)
router.get("/verify/:verCode", checkVerCode);



module.exports  = router