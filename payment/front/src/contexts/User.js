import { reactive, provide, inject } from 'vue';

const userState = reactive({
  user: null,
  role: 'admin',
  isLoggedIn: false,
});

function login(username, password) {
  // Simulate authentication logic here, you can use an API call or any authentication mechanism
  // For simplicity, let's assume there's a user with username "user" and password "password"
  if (username === 'user' && password === 'password') {
    userState.user = username;
    userState.role = 'user'; // Set the user role here
    userState.isLoggedIn = true;

    // TODO: Add JWT Token
    return true;
  } else {
    return false;
  }
}

function logout() {
  userState.user = null;
  userState.role = null;
  userState.isLoggedIn = false;
}

function impersonate(name, role) {
  userState.user = name;
  userState.role = role;
  userState.isLoggedIn = true;
}

export { userState, login, logout, impersonate };
