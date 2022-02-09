import Role from "../models/role.js";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "Paciente" }).save(),
      new Role({ name: "Nutricionista" }).save(),
      new Role({ name: "Ninguno" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
