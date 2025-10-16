const User = require("../model/User");

exports.userService = {
getUserByEmail: async (email) => {
    return await User.findOne({ where: { email, isDeleted: false } });
  },
createUser: async (email, password) => {
    return await User.create({ email, password });
  },
deleteUser: async (id) => {
    return await User.update(
        { isDeleted: true },
        { where: { id, isDeleted: false } }
    );
  }
}