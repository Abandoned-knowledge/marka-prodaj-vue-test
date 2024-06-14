import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
}));

import leads from "./routes/leads";
app.use("/api/leads", leads);

app.listen(PORT, () => {
  // console.log(`server is working on port: ${PORT}`);
})
