import jwt from "jsonwebtoken";

const decodeToken = (token: string) => {
    try {
      return jwt.decode(token);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
};

export default decodeToken;