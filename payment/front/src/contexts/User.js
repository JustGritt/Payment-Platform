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

    // Set the JWT token here
    const token = generateNewToken({ username, role: 'user' });

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

  console.log('Impersonating user:', name, role);
}

// Function to generate a new JWT token with the updated user profile data
function generateNewToken(userProfileData) {
  const existingToken = localStorage.getItem('jwtToken'); // Change this to match how you store the token
  if(existingToken === null) return null;

  // Decode the existing token to get the payload
  const decodedToken = jwt.decode(existingToken);

  // Merge the existing payload with the updated user profile data
  const updatedPayload = {
    ...decodedToken,
    ...userProfileData,
  };

  // Sign the new token with the updated payload
  const newToken = jwt.sign(updatedPayload, process.env.JWT_SECRET, {
    expiresIn: '1h', // You can set the expiration time as per your requirements
  });

  // Store the new token in the local storage or cookie
  localStorage.setItem('jwtToken', newToken); // Change this to match how you store the token
}

function updateTokenJWT(userProfile) {
  const newToken = generateNewToken(userProfile);
  console.log('New JWT token:', newToken)
  // Store the new JWT token in the cookie or local storage
  storeToken(newToken);
}

export { userState, login, logout, impersonate, updateTokenJWT };
