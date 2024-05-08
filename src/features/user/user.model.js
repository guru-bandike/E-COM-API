// Define User Model and Export as default
export default class UserModel {
  
  // Initialize idCounter varialbe to track user ids
  static idCounter = 0;

  // Constructor for creating user instance
  constructor(name, email, password, role) {
    this.id = ++UserModel.idCounter;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  // Method to create new user and add to the existing user list
  static signUp(name, email, password, role) {
    const newUser = new UserModel(name, email, password, role); // Create new user
    users.push(newUser); // Add new user to the existing users array
    return newUser; // Return newly created user
  }

  // Method to authenticate user
  static signIn(email, password) {
    // Find requested user
    const foundUser = users.find((u) => u.email == email && u.password == password);
    return foundUser; // Return found user
  }

  // Method to return specified user
  static get(email) {
    const foundUser = users.find((u) => u.email == email); // Find specified user
    return foundUser; // Return found user
  }

  // Method to check whether user exists
  static isExists(id) {
    return users.some((u) => u.id == id);
  }
}

// Existing users
let users = [
  new UserModel('seller name', 'seller@ecom.com', 'seller password', 'seller'),
  new UserModel('customer name', 'customer@gmail.com', 'customer password', 'customer'),
];
