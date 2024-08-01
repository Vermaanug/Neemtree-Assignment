import { User } from '../model/User.js'; 

const Register = async (req, res) => {
  try {
    console.log(req.body)
    const { firstName, lastName, phone, email, role, location, department } = req.body;

    if (!firstName || !lastName || !phone || !email || !role || !location || !department) {
      return res.status(409).json({
        message: 'Please provide all required fields',
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'This email is already registered.',
        success: false,
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
      role,
      location,
      department,
    });

    await newUser.save(); 

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { Register, getUsers };
