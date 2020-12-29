import { Router, urlencoded } from 'express';
import { body, cookie, validationResult } from 'express-validator';
import { home, login, register, notfound404 } from '../controllers/login-register.mjs';

const ValidateInputs = (req, res, next) => {
    const status = validationResult(req).array();
    if( status.length === 0 ){
        next();
    }
    else{
        console.log('validation failed\n',req.body);
        console.error( status );
        res.status(400).send('Bad Request');
        //**some custom logger for such manipulated request */
    }
}

const PublicRouter = Router({ strict: true, caseSensitive: true });

PublicRouter.use(urlencoded({ extended: false, type: 'application/x-www-form-urlencoded', limit: '5kb' }));

PublicRouter.get('/home', home);

PublicRouter.post('/login',[
        body('l_email','invalid email').exists({ checkFalsy: true, checkNull: true }).notEmpty({ignore_whitespace: false})
        .isLength({ max: 30 }).isEmail(),
        body('l_pass','invalid password').exists({ checkFalsy: true, checkNull: true }).notEmpty({ignore_whitespace: false})
        .isLength({ min: 8, max: 20 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/).withMessage('regex match fail')
    ],
    ValidateInputs,login);

PublicRouter.post('/register',[
        body('r_email','invalid email').exists({ checkFalsy: true, checkNull: true }).notEmpty({ignore_whitespace: false})
        .isLength({ max: 30 }).isEmail(),
        body('r_pass','invalid password').exists({ checkFalsy: true, checkNull: true }).notEmpty({ignore_whitespace: false})
        .isLength({ min: 8, max: 20 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/).withMessage('regex match fail')
    ],
    ValidateInputs,register);

PublicRouter.use(notfound404);

export default PublicRouter;