const home = (req, res, next) => {
    res.render('login-register');
}

const login = (req, res, next) => {
    res.redirect('http://localhost:3000');
}

const register = (req, res, next) => {
    res.redirect('/home');
}

const notfound404 = (req, res, next) => {
    res.send('<h3>404 not found</h3>');
}

export { home, login, register, notfound404 };