import connectDb from "./db/connection.js";
import authRouter from "./module/auth/auth.route.js";
import carRouter from "./module/car/car.route.js";
import { globalErrorHandling } from "./utils/error/global-errorhandling.js";
import i18n from "./utils/i18n.js";


const bootstrap = async (express, app) => {
    //parse req
    app.use(express.json())

    app.use(i18n.init);

    //connect to db
    await connectDb()
    
    app.use('/auth', authRouter)
    app.use('/car', carRouter)
    
    app.use(globalErrorHandling)
}

export default bootstrap