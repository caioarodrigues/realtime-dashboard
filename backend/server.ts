import app from "./routes/routes";
import { DotenvConfigOptions } from "dotenv";

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`backend running at http://localhost:${port}`);
});