import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.PORT as string, 10) || 3001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
