import { generateJWT } from "../helpers/generate-jwt.mjs";
import { googleVerify } from "../helpers/google-verify.mjs";
import { User } from "../models/user.mjs";
import bcryptjs  from "bcryptjs";

const login = async(req, res) => {

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

const googleSignIn = async(req, res) => {

  const { id_token } = req.body;

  try {
    
    const { nombre, img, correo } = await googleVerify( id_token );

    let user = await User.findOne({ correo });

    if( !user ) {
      // Creo el usuario
      const data = {
        nombre,
        correo,
        password: 'x',
        img,
        google: true
      };

      user = new User( data );
      await user.save();
    }

    // Verifico estado:false (borrado logico)
    if( !user.estado ) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar JWT
    const token = await generateJWT( user.id );

    return res.json({
      user,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token de Google no es valido",
    });

  }

}

export {
  login,
  googleSignIn
}
