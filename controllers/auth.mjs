import { generateJWT } from "../helpers/generate-jwt.mjs";
import { User } from "../models/user.mjs";
import bcryptjs  from "bcryptjs";

export const login = async(req, res) => {

  const { correo, password } = req.body; 

  try {

    // Verificar email y password
    const user = await User.findOne({ correo });
    const validPassword = bcryptjs.compareSync( password, user.password );

    /*
    Si no existe el usuario, o si esta borrado logicamente, o si el password no es correcto retorno un 400
    */

    if( !user || !user.estado || !validPassword ) {
      return res.status(500).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      msg: "Algo salio mal",
    });

  }
};
