import jwt from 'jsonwebtoken';
import { User } from '../models/user.mjs';

const validarJWT = async( req, res, next ) => {
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la request'
        });
    }

    try {
        // Verifico el token y obtengo el uid del payload.uid
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await User.findById( uid );

        // Verifico que el usuario exista
        if( !user ){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }

        if( !user.estado ){
            return res.status(401).json({
                msg: `El usuario ${user.nombre} no tiene permisos para realizar esta accion`
            });
        }

        // Agrego el usuario a la request para que los siguientes middlewares lo puedan utilizar
        req.user = user;

        next();
        
    } catch (error) {

        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }

}

export {
    validarJWT
}