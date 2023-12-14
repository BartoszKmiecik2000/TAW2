const express = require('express'),
cors = require('cors');
const apiRoutes = require('./server/routes/api.routes')

// zmienne środowiskowe
require('dotenv').config();

// baza danych
require('./server/config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
