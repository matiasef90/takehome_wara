const User = require('../model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ 
        where: { email, isDeleted: false } 
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas.'
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas.'
      });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET, 
        { expiresIn: '1h' }
    );

    res.status(200).json({ 
        status: 'success',
        token

      });
  } catch (error) {
    res.status(500).json({ 
        message: 'Error al iniciar sesión.', 
        error: error.message 
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ status: 'error', message: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ 
        status: 'success',
        id: newUser.id, 
        email: newUser.email,
        message: 'Usuario creado con éxito.' 
    });
  } catch (error) {
    res.status(500).json({ 
        message: 'Error al crear el usuario.', 
        error: error.message 
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    await User.update(
        { isDeleted: true },
        { where: { id, isDeleted: false } }
    );

    res.status(200).send({ message: 'Usuario eliminado.' }); 
  } catch (error) {
    res.status(500).json({ 
        message: 'Error al realizar el borrado del usuario.', 
        error: error.message 
    });
  }
};