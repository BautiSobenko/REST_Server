// Validar que el usuario tenga el rol necesario para realizar la acción
const validarRole = ( ...roles ) => {

    return (req, res, next) => {

        const { role } = req.user;

        if( !roles.includes(role) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }

        next();

    }

}

export {
    validarRole
}