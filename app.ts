const path = require('path');
const fs = require('fs');

import express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect('***PASSWORD REMOVED***');;
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const errorController = require('./controllers/error');
const shopController = require('./controllers/shop');
const isAuth = require('./middleware/is-auth');
const User = require('./models/user');

const MONGODB_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.7uqja.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
    cb(null, 'images');
  },
  filename: (req: any, file: { originalname: string; }, cb: (arg0: null, arg1: string) => void) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const accessLogSteam = fs.createWriteStream(
  path.join(__dirname, 'access.log'), 
  { flags: 'a' }
);

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogSteam }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(flash());

app.use((req:any, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use((req:any, res, next)  => {
  // throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next(undefined);
  }
  User.findById(req.session.user._id)
    .then((user: any) => {
      if (!user) {
        return next(undefined);
      }
      req.user = user;
      next(undefined);
    })
    .catch((err: string | undefined) => {
      next(new Error(err));
    });
});

app.post('/create-order', isAuth, shopController.postOrder);

app.use(csrfProtection);
app.use((req:any, res, next)  => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((req:any, res, next)  => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

mongoose
  .connect('***PASSWORD REMOVED***');
  .then((result: any) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err: any) => {
    console.log(err);
  });
