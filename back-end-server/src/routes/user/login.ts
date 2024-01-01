import { Router,Request, Response } from 'express';
import { makeChecking } from '../../utils/hasing';
import { UserRepo } from '../../repositories/user-repo';
import { generateAccessToken,generateRefreshToken } from '../../utils/jwt';
// import token function

// declare route
export const loginRoute = Router();

loginRoute.post("/",async (req:Request,res:Response) => {
    try {
        const reqBody = req.body
        const { password,email } = reqBody
        const searchUserByEmail =await UserRepo.selectByEmail(email)
        // email correct
        if(searchUserByEmail){
            const {id,password:hash,profileurl,email}= searchUserByEmail
            const isPasswordCorrect = await makeChecking(password,hash)
            // password correct
            if(isPasswordCorrect){
                const accessToken = generateAccessToken({id,email,profileurl })
                const refreshToken = generateRefreshToken({id,email,profileurl})
                return res.status(201).json({
                    status:"success",
                    id,profileurl,email,
                    accessToken,
                    refreshToken,
                    login_status:true,
                });
            }else{
                return res.status(400).json({status:"fail",message:"user name or password invalided!"});
            };
        }else{
            return res.status(400).json({status:"fail",message:"user name or password invalided!"}); 
        };
    } catch (e) {
        return res.status(500).json({"message":"Internal server error!"});
    };
});

