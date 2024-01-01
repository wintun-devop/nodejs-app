import { prisma } from "../utils/prismaSingletone"
import {User} from "@prisma/client"

export namespace UserRepo{
  // create
  export const create = async (user:User) =>{
    return await prisma.user.create({
    data: {
        ...user,
    },
    });
  }
  // update
  export const update= async (id: string, user: User)=> {
  // console.log(id, product);
  return await prisma.user.update({
      where: {
      id,
      },
      data: {
      ...user,
      },
  });
  }
  // delete
  export const remove = async (id: string) =>{
  return await prisma.user.delete({
  where: {
      id: id,
  },
  });
  }
  // get a single row by unique id
  export const selectById = async (id: string) =>{
    return await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }
  // get a single row by email
  export const selectByEmail = async (email: string) =>{
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
  // find all
  export const findMany =async () => {
    return await prisma.user.findMany({
    });
  }
}