import { Router, Request, Response } from 'express';
import {Profile} from '../models/profiles';
import profilesController from '../controller/profilesController';

const router = Router();

router.get("/", async (req: Request, res: Response) => {

    const profiles = await profilesController.find();

    if (profiles == null) { console.log('No profiles.') }
    else {
        res.send(profiles);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const profileId = req.params['id'];

    await Profile.findById(profileId, '_id email', (err, profile) => {
        if (err) { console.log('Woops, error', err); }
        if (profile == null) { console.log('No profile found') }

        res.send(profile);
    })
});

router.post('/', (req: Request, res: Response) => {
    const { email, firstname, lastname, password } = req.body;

    const newProfile = new Profile({ email: email, firstname: firstname, lastname: lastname })
    newProfile.setPassword(password);
    newProfile.save();
    res.status(200).send('User created !');
})

router.patch('/:id', (req: Request, res: Response) => {
   
    const { email, firstname, lastname } = req.body;
    console.log('body', req.body);

    const profileId = req.params['id'];
    const updatedProfile = profilesController.findByIdAndUpdate(profileId);
//  pas d'utilisateur
    if (!profileId) { res.status(404).send("Profile non trouvé"); return; }
    // pas d'info dans le body
    if (!firstname && !lastname && !email) {
        res.status(400).send("Il me faut au moins un prenom, un nom ou un email")
    }
    // updatedProfile.lastname = lastname || updatedProfile.lastname;
    // updatedProfile.firstname = firstname || updatedProfile.firstname;
    // updatedProfile.email = email || updatedProfile.email;
    res.send('User updated');
})

router.delete('/:id', (req: Request, res: Response) => {
    const profileId = req.params['id'];

    const profileDeleted = profilesController.findByIdAndDelete(profileId);
    res.status(200).send('User deleted !');
})

export default router;