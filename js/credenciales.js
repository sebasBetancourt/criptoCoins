const ENV = async () => {
    try {
        let peticion = await fetch("../bseDatos/login.json");
        if (!peticion.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        let data = await peticion.json();
        return data;
    } catch (error) {
        console.error(error);
        alert("Hubo un problema al cargar los datos.");
    }
}

export const users = await ENV();

export const validation = (data) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === data.email) {  // Cambia USER por email
            if (users[i].password === data.password) {  // Cambia PWD por password
                const { email: email_user, type_user } = users[i];
                return { status: 200, email_user, type_user };
            } else {
                return { status: 401, message: "Contraseña incorrecta" };
            }
        }
    }
    return { status: 404, message: "Usuario incorrecto" };
}
