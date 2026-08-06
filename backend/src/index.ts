import express from "express";
import cors from 'cors'; 
import patternRoute from './routes/patternRoutes'; 

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use(patternRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app; 
