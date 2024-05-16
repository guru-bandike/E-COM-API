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
    
    // Return success message with newly created user
    return { success: true, msg: 'User signed up successfully', user: newUser };
  }

  // Method to authenticate user
  static login(email, password) {
    // Find requested user
    const foundUser = users.find((u) => u.email == email && u.password == password);
    
    // If user found, Return success message with found user
    if (foundUser) return { success: true, msg: 'User logged in successfully', foundUser };
    // Otherwise, return failure message
    else return { success: false, msg: 'Unauthorized!, invalid credentials' };
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
  new UserModel('seller1 name', 'seller1@ecom.com', '@Seller1 Password', 'seller'),
  new UserModel('seller2 name', 'seller2@ecom.com', '@Seller2 Password', 'seller'),
  new UserModel('customer1 name', 'customer1@gmail.com', '@Customer1 Password', 'customer'),
  new UserModel('customer2 name', 'customer2@gmail.com', '@Customer2 Password', 'customer'),
];
