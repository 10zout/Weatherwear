const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config({ path: './backend/.env' });

const app = express();


app.use(cors());

app.use(express.json());

const authRoutes = require('./routes/auth');
const outfitHistoryRoutes = require('./routes/outfitHistory');
app.use('/api/auth', authRoutes);
app.use('/api/outfitHistory', outfitHistoryRoutes);


const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
