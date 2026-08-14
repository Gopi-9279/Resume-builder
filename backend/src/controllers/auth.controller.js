import { StatusCodes } from "http-status-codes";
import userModel from "../models/user.model.js";
import blackListModel from "../models/blacklist.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
/**
 * @name registerUserController
 * @description register a new user expects username, email, and password inn the request body
 * @access Public
 */

async function registerUserController(req, res) {
  const { email, username, password } = req.body;
  if (!username || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "please provide username,email and password",
    });
  }

  const isuserAlreadyexists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isuserAlreadyexists) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "user Already exists with either username or  email",
    });
  }

  /*Hasshing the password */
  const hashsedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashsedPassword,
  });
  /*generating tokens for user  */

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

res.cookie("token",token)

res.status(StatusCodes.CREATED).json({
    message : "user registered successfully",
    user:{
        id : user._id,
        username : user.username,
        email : user.email
    }
})


}
/**
 * @name loginUserController
 * @description Login a user expects email and password in the request body
 * @access Public
 */
async function loginUserController(req,res) {
    const {email,password} = req.body;
    
    const user = await userModel.findOne({email});
    
    if(!user){
        return res.status(StatusCodes.FORBIDDEN).json({
            message : "Invalid email or password"
        })
    }

    const isPasswordValid  = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(StatusCodes.FORBIDDEN).json({
            message : "password is incorrect"
        })
    }

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)
    res.status(StatusCodes.OK).json({
        message : "user loggedIn successfully ",
        user :{
            _id : user._id,
            username : user.username,
            email : user.email
        }
    })

}
/**
 * @name logoutUserController
 * @description clear token from user and add the token in blacklist 
 * @access Public
 */
async function logoutUserController(req,res){
    const token = req.cookies.token

    if(token){
        await blackListModel.create({token})
    }
    res.clearCookie("token");

    res.status(StatusCodes.OK).json({
        message : "user looged out successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details
 * @access private
 */
async function getMeController(req,res){


    const user = await userModel.findById(req.user.id)

    res.status(StatusCodes.OK).json({
        message : "user details fetch successfully",
        user :{
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}
export { registerUserController,loginUserController,logoutUserController ,getMeController};
