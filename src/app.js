import express from 'express'
import db from './config/dbconect.js'
import livros from './models/Livro.js'

db.on("error", console.log.bind("Erro de conexão"))
db.once("open", () =>{
    console.log("Conexão estabelecida")
})
const app = express();
app.use(express.json())


//const livros=[
  //  {id : 1, "titulo:": "Senhor dos aneis"},
    //{id : 2, "titulo:": "O Hobbit"}
//]

app.get('/', (req,res) =>{
res.status(200).send('Bem vindo ao curso de node')
})

app.get('/livros', (req,res) =>{
    livros.find((err,livros) =>{
        res.status(200).json(livros)

    })

    
})
app.post('/livros', (req,res) =>{
    livros.push(req.body)
    res.status(201).send("Livro cadastrado com sucesso!")
})
app.put('/livros/:id', (req,res) =>{
    let id = buscaLivros(req.params.id)
    livros[id].titulo = req.body.titulo
    res.json(livros)

})
app.delete('/livros/:id', (req, res) =>{
    let {id} = req.params
    let index = buscaLivros(id)
    livros.splice(index, 1)
    res.send(`O livro ${index} foi removido da lista`)
})

function buscaLivros(id){
return livros.findIndex(livro => livro.id == id)
}

export default app
