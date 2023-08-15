<template>
    <div class="masterContainer">
      <form class="loginForm" @submit.prevent="submit">
        <h2>Login Form</h2>
        <label for="user">Username:</label>
        <input type="text" name="user" placeholder="Ex: sefirot123" v-model="user">
        <br>
        <label for="pass">Password:</label>
        <input type="password" name="pass" v-model="pass">
        <br>
        <input type="submit" value="Login!">
        <br>
        <span>
          Do not have an account? <router-link to="/register">Signup!!</router-link>
        </span>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from '@vue/reactivity';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'LoginView',
    setup() {
      const store = useStore();
      const router = useRouter();
      const base_url = store.state.base_url;
      const user = ref('admin');
      const pass = ref('admin');

      const submit = async () => {
        const url = `${base_url}/login?username=${user.value}&password=${pass.value}`;
        const resp = await fetch(url, {method: 'POST'});
        const ok = resp.ok;

        if (!ok) {
          Swal.fire('Login Error', resp.statusText, 'error');
          return;
        }

        const data = await resp.json();
        localStorage.setItem('TODO_lst_token', data.token);
        localStorage.setItem('TODO_lst_user_id', data.user_id);
        localStorage.setItem('TODO_lst_username', user.value);

        router.replace('/');
      }
  
      return {user, pass, submit}
    }
  }
  </script>
  
  <style scoped>
  .masterContainer {
    height: 100vh;
  
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .loginForm {
    width: 280px;
    height: 300px;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 2px 2px 5px black;
  }
  
  .loginForm > h2 {
    margin: 0px;
    margin-bottom: 20px;
    text-align: center;
  }

  .loginForm > label {
    font-style: italic;
    font-weight: 600;
  }
  .loginForm > span {
    font-size: 15px;
  }
  
  .loginForm > input {
    width: 100%;
    height: 25px;
  
    margin-bottom: 20px;
    border-radius: 7px;
    border: 1px solid gray;
  
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
  }
  
  .loginForm > input[type='submit'] {
    width: 100%;
    height: 30px;
    background-color: rgb(55, 82, 133);
    border: 2px solid rgb(17, 24, 54);
    color: white;
    font-weight: 700;
    text-shadow: 1px 1px 3px rgb(17, 24, 54);

    transition-property: background-color, color, text-shadow;
    transition-duration: 180ms;
  }

  .loginForm > input[type='submit']:hover {
    background-color: rgba(55, 82, 133, 0);
    color: rgb(17, 24, 54);
    text-shadow: none;
  }
  </style>
