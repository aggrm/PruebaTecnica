const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crea un nuevo usuario
    user = new User({
      name,
      email,
      password
    });

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guarda el usuario en la base de datos
    await user.save();

    // Crea y asigna un token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

// Inicio de sesión de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica si el usuario existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crea y asigna un token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Excluye el campo contraseña
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password'); // Excluye el campo contraseña
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar parcialmente un usuario
exports.updateUserPartially = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, updates, { new: true }).select('-password'); // Excluye el campo contraseña
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar completamente un usuario
exports.updateUserCompletely = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updates = {
      name,
      email,
      password: hashedPassword
    };

    const user = await User.findByIdAndUpdate(req.params.userId, updates, { new: true }).select('-password'); // Excluye el campo contraseña
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verifica si el usuario tiene viviendas asociadas
    const houses = await House.find({ userId: req.params.userId });
    if (houses.length > 0) {
      return res.status(400).json({ message: 'El usuario tiene viviendas asociadas' });
    }

    await user.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};
