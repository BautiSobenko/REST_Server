import { Role } from "../models/role.mjs";
import { User } from "../models/user.mjs";

export const isInRole = async(role = '') => {
  const existeRol = await Role.findOne({ role }); // Busca en la BD el rol que se esta enviando.
  if( !existeRol ){
      throw new Error(`El rol ${role} no esta registrado en la BD`);
  }
}

export const existsEmail = async(correo = '') => {
  const existeCorreo =  await User.findOne({ correo });
  if( existeCorreo ){
      throw new Error(`El correo ${correo} ya esta registrado`);
  }
}

export const existsID = async(id) => {
  const existeID =  await User.findById(id);
  if( !existeID ){
      throw new Error(`No existe un usuario con ID ${id} registrado en la base de datos`);
  }
}