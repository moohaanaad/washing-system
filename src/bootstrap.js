import connectDb from "./db/connection.js";
import i18n from "./utils/i18n.js";


const bootstrap = async (express, app) => {
 //parse req
    app.use(express.json())

    app.use(i18n.init);

    //connect to db
    await connectDb()
app.use(globalErrorHandling)
}