const {createReadStream} = require('fs')
const {createServer} = require('http')

// configuramos con una variable de entorno el puerto
const {PORT = 3000} = process.env


const HTML_CONTENT_TYPE = 'text/html'


const requestListener = (req, res) => {

  res.writeHead(200, { 'Content-Type': HTML_CONTENT_TYPE })

  createReadStream('index.html').pipe(res)
}

// creamos un servidor con el requestListener
const server = createServer(requestListener)

// hacemos que el servidor escuche el puerto configurado
server.listen(PORT)