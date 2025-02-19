import express from "express"
import mainRoute from "./Routes/index.js"
import cors from "cors"

const app = express();
app.use(express.json());    //body parser
app.use(cors())

//route requests that start with a substring over to another route 
app.use("/api/v1", mainRoute)


const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is listening on ${port} port`);
})