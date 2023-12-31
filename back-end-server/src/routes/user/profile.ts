import { Router,Request, Response } from 'express';
import { UserRepo } from '../../repositories/user-repo';

// declare route
export const profileRoute = Router();

profileRoute.get('/:id',async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const result = await UserRepo.selectById(id)
        if (result) {
            const {password,...rest}  = result
            res.status(200).json({"message":"success",result:rest});
        }else{
            res.status(400).json({"message":"Not Found!"})
        }
    } catch (e) {
        console.log("error",e);
        res.status(500).json({"message":"Internal server error!"})
    }
})


profileRoute.put('/:id',async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const reqBody = req.body
        const search = await UserRepo.selectById(id)
        if (search) {
            const updateData = {...search,...reqBody,updatedAt:new Date().toISOString()}
            const result = await UserRepo.update(id,updateData)
            res.status(200).json({"message":"success",result:result});
        }else{
            res.status(400).json({"message":"Not Found or Already deleted!"})
        } 
    } catch (e) {
        console.log("error",e);
        res.status(500).json({"message":"Internal server error!"})
    }
})

// delete
profileRoute.delete("/:id",async (req:Request, res:Response) => {
    try{
        const {id} = req.params;
        const search = await UserRepo.selectById(id)
        if (search) {
            const result = await UserRepo.remove(id)
            const {password,...rest} = result
            res.status(200).json({"message":"success",result:rest});
        }else{
            res.status(400).json({"message":"Not Found or Already deleted!"})
        } 
    }catch(e){
        console.log("error",e);
        res.status(500).json({"message":"Internal server error!"})
    }
})