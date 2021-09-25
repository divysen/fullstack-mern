//**import required packages */
import MongoDB from 'mongodb';
const { connect } = MongoDB;

//**import Models */
import Login from '../models/user.mjs';

//**connect to mongodb database */
const ConnectToDb = () => {
    const ConnectionString = process.env.CONNSTRING;
    
    connect( ConnectionString ,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        wtimeout: 2000,
        connectTimeoutMS: 5000,
        poolSize: 10
    })
    .then( async conn => {
        //**inject db connection to models */
        await Login.inject_db(conn);
    } )
    .catch( err => {
        //**log error */
        console.error('Database Connection Error\n', err);
    } );
}

export default ConnectToDb;