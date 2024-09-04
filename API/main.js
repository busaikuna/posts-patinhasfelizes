import express, { json } from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import crypto, { hash } from "crypto";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFile = promisify(fs.readFile);
const updateFile = promisify(fs.writeFile);

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/pictures");
  },
  filename: (req, file, cb) => {
    const date = new Date();
    cb(null, `${date.getTime()}-${file.originalname}`);
  },  
});

const PORT = 8008;
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const data = await getFile("./src/users.json", "utf8");
  const users = JSON.parse(data);

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    return res.send(user);
  }
  return res.sendStatus(401);
});

app.post("/signup", async (req, res) => {
  const payload = req.body;
  const hashptfl = generateHash()
  payload.hash = hashptfl

  try {
    const data = await getFile("./src/users.json", "utf8");
    const users = JSON.parse(data);

    const user = users.find((user) => user.email === payload.email);
    if (user) {
      return res.sendStatus(409);
    }

    await updateFile(
      "./src/users.json",
      JSON.stringify([...users, { id: users.length + 1, ...payload }], null, 2)
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
  return res.sendStatus(400);
});

app.post("/posts", upload.single("image"), (req, res) => {
  try {
    const data = fs.readFileSync("src/posts.json", "utf-8");
    const jsonData = JSON.parse(data);

    const dataUsers = fs.readFileSync("src/users.json", "utf-8");
    const jsonUsersData = JSON.parse(dataUsers);

    const hashPub = req.body.hash;
    const user = jsonUsersData.find(user => user.hash === hashPub);

    const link = `${req.protocol}://${req.get("host")}/image/${hashPub}`;
    const id = uuidv4();

    const dados = {
      name: user.name,
      email: user.email,
      accountID: id,
      typeAnimal: req.body.typeAnimal,
      picture: req.file.filename,
      description: req.body.description,
      link,
      hash: hashPub,
    };

    jsonData.push(dados);
    fs.writeFileSync("src/posts.json", JSON.stringify(jsonData, null, 2));

    res.status(201).json({ message: "Post criado com sucesso!", post: dados });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    res.status(500).json({ error: "Erro ao processar a requisição." });
  }
});


app.get("/posts", (req, res) => {
  const data = fs.readFileSync("src/posts.json", "utf-8");
  const jsonData = JSON.parse(data);
  jsonData.reverse();
  res.send(jsonData);
});

app.get("/posts/:hash", (req, res) => {
  const hash = req.params.hash;
  const data = fs.readFileSync("src/posts.json", "utf-8");
  const jsonData = JSON.parse(data);
  const posts = jsonData.filter((post) => post.hash == hash);
  res.send(posts);
});

app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(`${__dirname}/src/pictures/${filename}`);
});

function generateHash() {
  return crypto.randomBytes(16).toString("hex");
}

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
