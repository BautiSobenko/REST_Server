import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar_campos.mjs";
import { googleSignIn, login } from "../controllers/auth.mjs";


const authRouter = Router();

authRouter.post('/login', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login );

authRouter.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn );

export {
    authRouter
}
