import { validationResult } from 'express-validator';

const validarCampos = (req, res, next) => {
    // Validacion completa de los checks
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    //Si no hay errores, se ejecuta el siguiente middleware.
    next();
}

export {
    validarCampos
}