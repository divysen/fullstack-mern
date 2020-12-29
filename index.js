//**Import Server File */
import Server from './server.mjs';

//**Start Server */
Server.listen(process.env.PORT)
.on('listening',() => console.log(`Server Started on PORT ${process.env.PORT}`))
.on('close',() => console.error(`Server Stopped...`))
.on('error',() => console.error(`Error Starting Server.`));

//**Hanlers for process conditions */
process.on('beforeExit', () => console.log(`Stopping Process..`));
process.on('uncaughtException', (error) => console.log(`Uncaught Exception ${error}`));
process.on('unhandledRejection', (error) => console.log(`Unhandled Promise Rejection ${error}`));