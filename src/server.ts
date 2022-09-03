import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/index';
dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

server.listen(process.env.PORT, () => console.log(`
    Server running on port ${process.env.PORT}.
`));