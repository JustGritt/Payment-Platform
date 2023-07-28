import { reactive } from 'vue';

const userState = reactive({
  user: localStorage.getItem('user'),
  token: localStorage.getItem('token'),
  role: "",
});

function logout() {
  userState.user = null;
  userState.role = null;
  userState.token = null;
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

export { userState, logout };