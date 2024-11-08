import {Router, Request, Response} from "express";
import path from "path";


const authRouter = Router();

authRouter.get("/login", (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirname, "../../public/html", "secure", "login.html")
    );
});

authRouter.get("/register", (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirname, "../../public/html", "secure", "register.html")
    );
});

export default authRouter;