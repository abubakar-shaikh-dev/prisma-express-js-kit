import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

//Config
import { Config } from "./config/index.js";

//Middlewares
import api_compression from "./middlewares/api_compression.middleware.js";
import global_error_handler from "./middlewares/global_error_handler.middleware.js";
import {
    decrypt_request,
    encrypt_response,
    skip_encryption,
} from "./middlewares/api_encryption.middleware.js";

//Routes Barrel File
import routes from "./routes/index.js";

//express init
const app = express();

//Middlewares Init
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(api_compression);
app.use(decrypt_request);
app.use(encrypt_response);

//Root Route
app.get("/", skip_encryption, (req, res) => {
    return res.status(200).json({
        status: true,
        message: "Welcome to prisma-express-js-kit, give a star ⭐ if you like it.",
        data: {
            server_timezone: Config.TZ,
            server_timezone_offset: new Date().getTimezoneOffset() + " minutes",
        },
    });
});

//Routes Init
app.use("/api", routes);

app.use(global_error_handler);

export default app;
