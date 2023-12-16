import express from 'express';
import cors from 'cors';

import { userRouter } from '../routes/user.routes.mjs';
import { authRouter } from '../routes/auth.routes.mjs';

import { dbConnection } from '../database/config.mjs';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use( cors() );

        // Seralizacion del body a JSON
        this.app.use( express.json() );

        // El static sirve el index.html en la ruta base ./
        this.app.use( express.static('public') );

    }
    
    // Metodo de configuracion de endpoints
    async routes() {
    
        this.app.use( this.authPath, authRouter );
        this.app.use( this.usersPath, userRouter );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto",this.port);
        });
    }

}

//? Default export
/**
 * - Puedo usar cualquier nombre al importar
 * - Un solo default por archivo por eso es que podemos renombrar el import
 * - No podemos exportar una variable asignada
 */

//? Named export
/**
 * - Mismo nombre al importar
 * - import {} from .js porque los named exports pueden ser multiples
 */
export {
    Server
}
