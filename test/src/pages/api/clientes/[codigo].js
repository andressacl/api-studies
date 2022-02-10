export default function handler(req, res){
    const codigo = req.query.codigo
    console.log(req)
    res.status(200).json({
        id: codigo,
        nome: `Pessoa ${codigo}`,
        email: `pessoa${codigo}@gmail.com`
    })
}