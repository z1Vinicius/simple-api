import http from "http";

const PORT = 3000;
const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Texto de teste");
})

server.listen(PORT, () => {
	console.log(`API disponível em http://localhost:${PORT}`)
})