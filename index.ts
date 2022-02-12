import { firestore,rtdb } from "./db";
import { nanoid } from "nanoid";
import * as express from"express"
const cors =require("cors")
// UTILIZAR CORS ES NECESARIO SI O SI CUANDO MANTENEMOS BACK Y FRONT SEPARADOS
const app = express()

const port = process.env.PORT || 3000

const userCollection = firestore.collection("users")
const roomsCollection = firestore.collection("rooms")
app.use(express.json())
app.use(express.static("dist"))
app.use(cors())
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


app.post("/signin", (req, res) => {
  const { email } = req.body;
  userCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        res.status(404).json({
          message: "not found",
        });
      } else {
        res.json({
          /// colocar id porque la data que pedimos con fetch desde el state signin pide el id de la data y coincide con la
          ///la data que da este json respuesta
          ///si no funciona tengo que cambiar el userId por id
          id: searchResponse.docs[0].id,
        });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  userCollection
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + nanoid());
        roomRef
          .set({
            owner: userId,
            messages: ([] = []),
          })
          .then(() => {
            const longIdRoom = roomRef.key;
            const roomId = 1000 + Math.floor(Math.random() * 999);
            roomsCollection
              .doc(roomId.toString())
              .set({
                rtdbRoomId: longIdRoom,
              })
              .then(() => {
                res.json({
                  /// change userId por id
                  id: roomId.toString(),
                });
              });
          });
      } else {
        res.status(400).json({
          message: "no exist room",
        });
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;

  ///PROXIMO REVISA SI EL USERID CORRESPONDE ALGUN USUARIO DE USERS EN FIRESTORE
  userCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      ////SI EXISTE, VA A BUSCAR EL ROOM ID LARGO DENTRO DE FIRESTORE,USANDO EL ID CORTO
      if (doc.exists) {
        roomsCollection
          .doc(roomId)
          .get()

          .then((snap) => {
            /// VERIFICA QUE EL ROOM EXISTA
            if (snap.exists) {
              ///TERMINA DEVOLVIENDO EL ID LARGO QUE CORRESPONDE AL ROOM
              const data = snap.data();
              console.log("la datta de get room", data);
              res.json(data);
            }
          });
      } else {
        res.status(400).json({
          message: "no exist room",
        });
      }
    });
});

app.post("/messages/:roomId", (req, res) => {
  const { roomId } = req.params;
  const chatRoomsRef = rtdb.ref(`/rooms/${roomId}/messages`);
  chatRoomsRef.push(req.body, function () {
    res.json({
      message: "todo nice",
    });
  });
});

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

app.get("*",(req,res)=>{
  res.sendFile(__dirname + "/dist/.index.html")

})

app.listen(port,()=>{
  console.log(`Hola soy express en http://localhost:${port}`)
})