const basicAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Autenticación requerida' });
    }

    // Decodifica el encabezado Authorization
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Aquí validas las credenciales (pueden venir de una base de datos o estar hardcodeadas)
    const user = process.env.AUTH_USER || 'FILESERBER_USER'; // Usuario esperado
    const pass = process.env.AUTH_PASS || 'OCTOBER20241022*'; // Contraseña esperada

    if (username === user && password === pass) {
        // Si la autenticación es correcta, continúa con la solicitud
        return next();
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
};

module.exports = basicAuth