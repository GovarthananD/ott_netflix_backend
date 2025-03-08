import jwt from "jsonwebtoken";
import { getUserById } from "../controllers/userControll.js";


const isAuthenticated = async (req, res, next) => {
    // const token = req.header("Authorization")?.replace("Bearer ", "");

    // if (!token) {
    //   return res.status(403).json({ message: "Access denied. No token provided." });
    // }
  // const token = req.header("Authorization");
  // if(!token) return res.status(401).send("Access Denied!");
  //    try {
  //         const verified = jwt.verify(token, process.env.SECRET_KEY);
  //         req.user= verified;
  //         next();
  //        } catch (error) {
  //            res.status(400).send({ message: "Invalid Token" });
  //        }
    let token;
    if(req.headers){
      try{
        token = await req.headers["x-auth-token"];
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await getUserById(decode.id);
        next();
      }catch(err){
        res.status(500).json({error:"Internal Server Error"});
      }
    }
};

export {isAuthenticated};