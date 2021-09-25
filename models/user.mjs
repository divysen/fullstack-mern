let dbcon;

class User{
    constructor(param_email, param_password){
        this.email = param_email;
        this.password = param_password;
    }

    //**inject dbconnection to this model */
    static async inject_db(dbclient){
        if(dbcon){ console.log('Login Model Already Connected') }
        else{
            try{
                dbcon = await dbclient.db().collection(process.env.USERCOLL);
                console.log('Login Model Connected');
            }
            catch(e){console.error('Unable to establish connection handler to Login Model', e)}
        }
    }

    //**find user according to email */
    async signin(){
            if(dbcon){
                try{
                    const ack = await dbcon.findOne({ 'user_email': this.email });
                    if(ack){
                         if(ack.user_password === this.password){ return 'Login Successful' }
                         else{ return 'Incorrect Password' }
                    }
                    else{ return 'Email Not Registered' }
                }
                catch(e){ return e }
            }
            else{
                return new Error('Database connection lost in Login Model');
                //**try to reconnect */
            }
    }
}

export default User;