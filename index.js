const path = require('path')
const {createReadStream} = require('fs')
const {createServer} = require('http')

const {PORT = 3000} = process.env

const HTML_CONTENT_TYPE = 'text/html'
const CSS_CONTENT_TYPE = 'text/css'
const JS_CONTENT_TYPE = 'text/javascript'

const PUBLIC_FOLDER = path.join(__dirname, 'public')

const requestListener = (req, res) => {
  const {url} = req
  let statusCode = 200
  let contentType = HTML_CONTENT_TYPE
  let stream

 
  if (url === '/') {
    stream = createReadStream(`${PUBLIC_FOLDER}/index.html`)
  } else if (url.match("\.css$")) { // para los archivos CSS
    contentType = CSS_CONTENT_TYPE
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`)
  } else if (url.match("\.js$")) { // para los archivos JavaScript
    contentType = JS_CONTENT_TYPE
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`)
  } else { // si llegamos aquí, es un 404
    statusCode = 404
  }


  res.writeHead(statusCode, {'Content-Type': contentType})

  if (stream) stream.pipe(res)

  else return res.end('Not found')
}

// creamos un servidor con el requestListener
const server = createServer(requestListener)

// hacemos que el servidor escuche el puerto configurado
server.listen(PORT)