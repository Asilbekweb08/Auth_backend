class AuthController  {

    login(req,res){
        return         res.status(200).json({message:"Auth login..."})

    }
}
module.exports=new AuthController()