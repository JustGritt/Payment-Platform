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

export { userState, login, logout };
