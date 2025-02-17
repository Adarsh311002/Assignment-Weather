const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    
    const hashedPassword = await bcrypt.hash(password, 12);
    
       const user = await User.create({
      username,
      email,
      password
    });

    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ user: { id: user._id, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        console.log('User not found for email:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      console.log('Stored hash:', user.password); // Checking stored hash
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch); //  Checking comparison result
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        },
        token
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

module.exports = { register,login};