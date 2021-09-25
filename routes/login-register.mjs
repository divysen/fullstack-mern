/**import required packages */
import { Router, urlencoded } from 'express';
import { body, cookie, validationResult } from 'express-validator';
import MongoDB from 'mongodb';
const { BSONType, Timestamp } = MongoDB;

//**import controllers */
import { home, login, register, notfound404, badrequest400 } from '../controllers/login-register.mjs';

//**input body/params/coockies validation middleware */
const ValidateInputs = (req, res, next) => {
    const status = validationResult(req).array();

    //**if validation passed, then call next() to pass req to respective controller */
    if( status.length === 0 ){
        next();
    }

    //**else send bad request status */
    else{
        console.log('validation failed\n',req);
        console.error( status );
        badrequest400(req, res, next);
        //**some custom logger for such manipulated request */
    }
}

//**ebable strict routing */
const PublicRouter = Router({ strict: true, caseSensitive: true });

PublicRouter.use(urlencoded({ extended: false, type: 'application/x-www-form-urlencoded', limit: '5kb' }));

//**home page route */
PublicRouter.get('/home', home);


//**login post data route */
PublicRouter.post('/login',[
        body('l_email','invalid email').exists({ checkFalsy: true, checkNull: true }).notEmpty({ignore_whitespace: false})
        .isLength({ max: 30 }).isEmail(),
        body('l_pass','invalid password').exists({ checkFalsy: true, checkNull: true }).notEmpty({ignore_whitespace: false})
        .isLength({ min: 8, max: 20 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/).withMessage('regex match fail')
    ],
    ValidateInputs,login);

//**registration post data route */
PublicRouter.post('/register',[
        body('r_email','invalid email').exists({ checkFalsy: true, checkNull: true }).notEmpty({ignore_whitespace: false})
        .isLength({ max: 30 }).isEmail(),
        body('r_pass','invalid password').exists({ checkFalsy: true, checkNull: true }).notEmpty({ignore_whitespace: false})
        .isLength({ min: 8, max: 20 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/).withMessage('regex match fail')
    ],
    ValidateInputs,register);

//**routing error route */
PublicRouter.use(notfound404);

export default PublicRouter;