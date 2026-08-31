import express from "express";
import cors from 'cors'; 
import patternRoute from './routes/patternRoutes'; 

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json({ limit: "10mb" })); 
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use(patternRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app; 
