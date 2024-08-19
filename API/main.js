import express, { json } from "express"
import cors from "cors"
import fs from "fs"
import multer from "multer"
import crypto from "crypto"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "src/pictures")
    },
    filename: (req, file, cb)=>{
        const date = new Date()
        cb(null, `${date.getTime()}-${file.originalname}`)
    }
})

const PORT = 8000
const upload = multer({ storage })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())


app.post("/newPost", upload.single("image"), (req, res)=>{
    const data = fs.readFileSync("src/posts.json", "utf-8")
    const jsonData = JSON.parse(data)
    const HASH = generateHash()
    const link = `${req.protocol}://${req.get('host')}/publications/${req.body.hash}`;
    const id = uuidv4()
    const dados = {
        accountID: id,
        typeAnimal: req.body.typeAnimal,
        picture: req.file.filename,
        description: req.body.description,
        link,
        HASH
    }
    jsonData.push(dados)
    fs.writeFileSync("src/posts.json", JSON.stringify(jsonData))
    console.log(link)
})


app.get("/posts", (req, res)=>{
    const data = fs.readFileSync("src/posts.json", "utf-8")
    const jsonData = JSON.parse(data)
    jsonData.reverse()
    res.send(jsonData)
})

app.get("/my-posts/:HASH", (req, res) =>{
    const HASH = req.params.HASH 
    const data = fs.readFileSync("src/posts.json", "utf-8")
    const jsonData = JSON.parse(data)
    const posts = jsonData.filter((post) => post.accountID == HASH)
    res.send(posts)
})

app.get("/image/:filename", (req, res)=>{
    const filename = req.params.filename
    res.sendFile(`${__dirname}/src/pictures/${filename}`)
})


function generateHash() {
    return crypto.randomBytes(16).toString('hex');
  }

app.get('/publications/:hash', (req, res) => {
    const { hash } = req.params;
    const data = fs.readFileSync("src/posts.json", "utf-8")
    const jsonData = JSON.parse(data)
    let publication = jsonData.find(posts => posts.HASH == hash)
    console.log(publication)
    res.status(201).send(publication)
})

  

app.listen(PORT, ()=>{
    console.log(`Server rodando em http://localhost:${PORT}`)
})