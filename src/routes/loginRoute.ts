import { Router, Request, Response } from "express";
import passport from "passport";

const router = Router();

router.post('/', (req: Request, res: Response) => {
    passport.authenticate('local', (err,profile) => {


        if(err) return res.status(500).send('Il y a eu une erreur');
        if(profile) {
            //creer Une session
        } else {
            return res.status(401).send('Il y a eu une erreur');
        }
    })

})

export default router;