import bcrypt from 'bcrypt';

// make hashing
export const makeHashing =async (input: string) => {
    return bcrypt.hash(input, 10).then( (hash: string)=> {
      return hash;
    });
}

// checking hash
export const  makeChecking =async (unHashInput: string | Buffer, hashInput: string )=>{
    return bcrypt.compare(unHashInput, hashInput).then( (result: Boolean)=> {
        return result;
    });
}