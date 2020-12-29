//**Load environment variables from .env files */
import { config } from 'dotenv';
if( config().error ){
    console.error(`error parsing environment variables ${Dotenv.error.stack}`);
    process.exit();
}

//**Establish connection to Database */
// const ConnectToDb = require('./utils/mongodb-connection');

/**Import packages */
import Express from 'express';
import Helmet from 'helmet';
import ExpressRateLimit from'express-rate-limit';
import Timeout from 'connect-timeout';
import Morgan from 'morgan';
import ExpressSession from 'express-session';

//**Load Routing Files */
import PublicRoutes from './routes/login-register.mjs';
import ApiEndPoints from './routes/apis.mjs';

//**Creating Express App */
const app = Express();

app.set('views','views');
app.set('view engine','ejs');

//**Custom configuration for Express App */
app.use(
    Helmet(),
    ExpressRateLimit({windowMs: 1000, max: 100}),
    Timeout('3s'),
    Express.static('public')
);

//**Register routes to Express App */
app.use('/api',ApiEndPoints);
app.use(PublicRoutes);

export default app;