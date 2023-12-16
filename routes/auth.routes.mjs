import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar_campos.mjs";
import { login } from "../controllers/auth.mjs";
import { validarJWT } from "../middlewares/validar-jwt.mjs";


const authRouter = Router();

authRouter.post('/login', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login );

export {
    authRouter
}
