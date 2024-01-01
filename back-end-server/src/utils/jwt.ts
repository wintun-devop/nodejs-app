import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  profileurl:any;
}

const jwtSecret = process.env.JWT_SECRET as string;


// Function to generate JWT token
export const generateAccessToken = (inputData:TokenPayload): string => {
  return jwt.sign({ ...inputData }, jwtSecret, { expiresIn: '30h' });
};

// Function to generate JWT refresh token
export const generateRefreshToken = (inputData:TokenPayload)=> {
  return jwt.sign({ ...inputData }, jwtSecret, { expiresIn: '30d' });
};

// vertify token
export const verifyToken = (token: string)=> {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (e) {
    return null;
  }
};