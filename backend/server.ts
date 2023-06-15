import app from "./routes/routes";
import { DotenvConfigOptions } from "dotenv";
import SeedService from "./services/SeedService";

const port = process.env.PORT || 4000;


app.listen(port, () => {
    console.log(`backend running at http://localhost:${port}`);
    SeedService.feed();
});