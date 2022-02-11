import { firestore,rtdb } from "./db";
import { nanoid } from "nanoid";
import * as express from"express"
const cors =require("cors")
// UTILIZAR CORS ES NECESARIO SI O SI CUANDO MANTENEMOS BACK Y FRONT SEPARADOS
const app = express()

app.use(cors())
const port = process.env.PORT || 3000

const userCollection = firestore.collection("users")
const roomsCollection = firestore.collection("rooms")
// console.log(userCollection)


app.post("/signup", (req,res)=>{
  const email = req.body.email
  const nombre = req.body.nombre

  userCollection.where("email","==",email).get().then((searchResponse)=>{
    if(searchResponse.empty){
      userCollection.add({
        email,
        nombre
      }).then((newUserRef)=>{
        res.json({
          message: "user created",
          id:newUserRef.id,
          new:true,
        })
      })
    }else {
      res.status(400).json("user already exists")
    }
  })
})
app.get("/env",(req,res)=>{
  res.json({
    enviroment:process.env.NODE_ENV,
  })
})

app.get("/db-env",(req,res)=>{
  res.json({
    "db-host": process.env.DB_HOST,
  })
})

app.get("/hola", (req,res)=>{
  res.json({
    message:"Soy el servidor, heroku"
  })
})

app.use(express.static("dist"))
app.get("*",(req,res)=>{
  res.sendFile(__dirname + "/dist/.index.html")

})

app.listen(port,()=>{
  console.log(`Hola soy express en http://localhost:${port}`)
})