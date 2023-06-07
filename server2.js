const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cagnottesRoutes = require("./routes/cagnottes.routes");
const caregoriesRoutes = require("./routes/categories.routes");
const imagesRoutes = require("./routes/images.routes");
const participantCagnotte = require("./routes/participantCagnotte.routes");
const userRoutes = require("./routes/users.routes");
const participantsRoutes = require("./routes/particpants.routes");
const documentsRoutes = require("./routes/document.routes");

app.use("/api/cagnottes", cagnottesRoutes);
app.use("/api/categories", caregoriesRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/participants", participantCagnotte);
app.use("/api/users", userRoutes);
app.use("/api/participants", participantsRoutes);
app.use("/api/documents-admin", documentsRoutes);

app.use("/api/uploads", express.static('./uploads'));

app.listen(process.env.PORT, () => {
    console.log("Le serveur tourne sur le port ", + process.env.PORT);
});
