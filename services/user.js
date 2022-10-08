const User = require('../models/User');
const { hash, compare } = require('bcrypt');

async function register(email, password, gender) {
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (existing) { throw new Error(`Username is taken!`); }

    const hashedPassword = await hash(password, 10);
    const user = new User({ email, hashedPassword, gender });

    await user.save();
    return user;
}

async function login(email, password) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user) { throw new Error(`Incorrect username or password!`); }

    const hasMatch = await compare(password, user.hashedPassword);
    if (!hasMatch) { throw new Error(`Incorrect username or password!`); }

    return user;
}

module.exports = {
    login,
    register,
};
