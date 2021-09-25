//**import required packages */

//**import models */
import User from '../models/user.mjs';

//**homepage controller */
const home = (req, res, next) => {
    res.render('login-register');
}

//**login controller */
const login = async (req, res, next) => {
    const newUser = new User( req.body.l_email, req.body.l_pass )
    const result = await newUser.signin();
    if( result.includes('Login Successful') ) { res.redirect('http://localhost:3000') }
    else{ res.send(result) }
}

//**registration controller */
const register = (req, res, next) => {
    res.redirect('/home');
}

//**routing error 404 controller */
const notfound404 = (req, res, next) => {
    res.status(404).send('<h3>404 not found</h3>');
}

//**bad request 400 controller */
const badrequest400 = (req, res, next) => {
    res.status(400).send('<h3>400 bad request</h3>');
}

export { home, login, register, notfound404, badrequest400 };