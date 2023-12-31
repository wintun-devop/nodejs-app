import { Router,Request, Response } from 'express';
import { makeHashing } from '../../utils/hasing';
import { UserRepo } from '../../repositories/user-repo';


// declare route
export const registerRoute = Router();

registerRoute.post("/",async (req:Request,res:Response) => {
    try {
        const reqBody = req.body
        const { password,email } = reqBody
        const searchUserByEmail =await UserRepo.selectByEmail(email)
        // checking already exist or not
        if (searchUserByEmail) {
            return res.status(400).json({"message":"user already exists on system!"});
        }
        const hashPassword =await makeHashing(password);
        const updatedReqBody = {...reqBody,password:hashPassword}
        const result = await UserRepo.create(updatedReqBody)
        return res.status(201).json({"message":"success",result:result});
    } catch (e) {
        return res.status(500).json({"message":"Internal server error!"})
    }
})