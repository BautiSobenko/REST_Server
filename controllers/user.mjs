import { User } from "../models/user.mjs";
import bcryptjs  from "bcryptjs";

const usuariosGet = async(req, res) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    /*
    Promise.all ejecuta todas las promesas que le pasemos en paralelo. 
    Usamos el await para esperar a que se resuelvan todas.
    Si una falla, todas fallan.

    Se utiliza deseestructuracion de arreglos para obtener los resultados de cada promesa en el orden en que fueron pasadas.
    */
    
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({ 
        total,
        users
    });
}

const usuariosPost = async(req, res) => {
    const { nombre, correo, password, role } = req.body;
    const usuario = new User( { nombre, correo, password, role } );

    // Encripto password
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Save en mongoDB. Previo a esto debo haber validado todos los atributos del schema.
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuariosPut = async(req, res) => {
    const { id } = req.params;
    const { password, google, ...resto } = req.body;

    console.log(resto);

    if( password ){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate( id, resto );

    res.status(200).json({
        usuario
    });
}

const usuariosDelete = async(req, res) => {
    
    const { id } = req.params;

    // Borrado fisico
    // const user = await User.findByIdAndDelete( id );

    // Borrado logico
    const user = await User.findByIdAndUpdate( id, { estado: false })
    
    res.json({
        user
    });
}

export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}