exports.getLogin = (req, res, next) => {
  console.log(req.session);
  console.log(req.session.isLoggedIn);

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isAuthenticated
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
};