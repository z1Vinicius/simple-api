import app from "./src/app";
require("dotenv").config();

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`API disponível em http://localhost:${PORT}`);
});
