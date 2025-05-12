const Router=require('express')
const { login } = require('../controllers/auth-controller')

const router=new Router()
router.get('/',(req,res)=>{
    res.status(200).json({message:"Route ishlayabdi"})
})
router.post('/login',login)


module.exports  = router