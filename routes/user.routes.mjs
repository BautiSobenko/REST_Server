import { Router } from "express";
import { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } from "../controllers/user.mjs";
import { check } from "express-validator";

import { validarCampos } from "../middlewares/validar_campos.mjs";
import { existsEmail, existsID, isInRole } from "../helpers/db-validatores.mjs";

/**
 * El router se configura en un middleware para poner un endpoint comun.
 */
const router = Router();

router.get('/', usuariosGet);

/** 
 * _express-validator
 * Si hay errores se almacenan en la request, luego se verifican todos juntos en el controller.
 */
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
    check('role').custom( isInRole ),
    check('correo').custom( existsEmail ),
    validarCampos
],usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsID ),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
    check('role').custom( isInRole ),
    check('correo').custom( existsEmail ),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existsID ),
    validarCampos
], usuariosDelete);

export {
    router
}
