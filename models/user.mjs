import { Schema, model } from "mongoose";

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

})

/**
 * Puedo sobrescribir metodos de mongoose como el findOne o el toJSON.
 * - Utilizo una funcion normal para poder utilizar el this y hacer referencia al objeto que se esta creando.
 * - Ahora no se estara mostrando el password, ni la version, ni el id, en la respuesta.
 */
UserSchema.methods.toJSON = function() {
    // Extraigo del objeto que me devuelve el modelo, el __v, el password y el resto lo guardo en usuario.
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id
    return usuario;
}

const User = model( 'User', UserSchema );

export {
    User
}