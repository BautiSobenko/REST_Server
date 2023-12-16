import { Router } from "express";
import { check } from "express-validator";

import { validarCampos, validarJWT, validarRole } from "../middlewares/imports.mjs";

import { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } from "../controllers/user.mjs";
import { existsEmail, existsID, isInRole } from "../helpers/db-validatores.mjs";

/**
 * El router se configura en un middleware para poner un endpoint comun.
 */
const userRouter = Router();

userRouter.get('/', usuariosGet);

/** 
 * _express-validator
 * Si hay errores se almacenan en la request, luego se verifican todos juntos en el controller.
 */
userRouter.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
    check('role').custom( isInRole ),
    check('correo').custom( existsEmail ),
    validarCampos
],usuariosPost);

userRouter.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsID ),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
    check('role').custom( isInRole ),
    check('correo').custom( existsEmail ),
    validarCampos
], usuariosPut);

userRouter.delete('/:id', [
    validarJWT,
    validarRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsID ),
    validarCampos
], usuariosDelete);

export {
    userRouter
}
