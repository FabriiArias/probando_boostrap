const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3002;

// Middleware para procesar el body de las solicitudes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura la carpeta 'styles' como estática
app.use('/styles', express.static(path.join(__dirname, 'styles')));

// -> pug como motor de plantillas
app.set('view engine', 'pug');
// -> cambiar directorio de vista a la carpeta views
app.set('views', path.join(__dirname, 'views'));
// -> fijamos la carpeta public para archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));



// -----------------------------------------------------> renderizar en index pug
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/pag2', (req, res) => {
    res.render('pag2');
});

app.get('/pag3', (req, res) => {
    res.render('pag3');
});

app.get('/pag4crear', (req, res) => {
    res.render('pag4crear');
})
// ----------------------------------------------------------------------------------------------------


// Crear conexión con MySQL
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'int_bd_1'
});

conexion.connect((err) => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

// Login - Validar usuario y contraseña
app.post('/login', (req, res) => {
    try {
        const { matricula, password } = req.body;

        // Verifica si 'matricula' y 'password' no son undefined o null
        if (!matricula || !password) {
            return res.status(400).json({ success: false, message: '' });
        }

        const query = `SELECT * FROM medico WHERE matricula_medico = ? AND password = ?`;

        conexion.query(query, [matricula, password], (err, result) => {
            if (err) {
                console.error('Error en la consulta SQL:', err);
                return res.status(500).json({ success: false, message: 'Error en la consulta' });
            }

            if (result.length > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false});
            }
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// ESCUCHAR
app.listen(port, () => {
    console.log(`Server corriendo en http://localhost:${port}`);
});
