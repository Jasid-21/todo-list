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
  
  export default {
    name: 'LoginView',
    setup() {
      
      const submit = () => {
        const url = `http://localhost:3000/login?username=${user.value}&password=${pass.value}`;
        fetch(url, {method: 'POST'})
        .then(resp => {
          if (resp.status != 200) {
            console.log(resp.status);  
          }
  
          return resp.json();
        }).then(data => {
          if (data.msg) {
            alert(data.msg);
            return;
          }
  
          localStorage.setItem('TODO_lst_token', data.token);
          localStorage.setItem('TODO_lst_user_id', data.user_id);
          localStorage.setItem('TODO_lst_username', user.value);
  
          router.replace('/');
        });
      }
  
      const router = useRouter();
      const user = ref('');
      const pass = ref('');
  
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
    width: 240px;
    padding: 10px;
    border-radius: 15px;
    box-shadow: 2px 2px 5px black;;
  }
  
  .loginForm > h2 {
    margin: 0px;
    margin-bottom: 20px;
    text-align: center;
  }

  .loginForm > span {
    font-size: 15px;
  }
  
  .loginForm > input {
    width: 100%;
    height: 25px;
  
    margin-bottom: 20px;
  
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
  }
  
  .loginForm > input[type='submit'] {
    width: 100%;
    background-color: rgb(55, 133, 55);
    border: 2px solid rgb(17, 54, 17);
    border-radius: 7px;
    color: white;
    font-weight: 700;
    text-shadow: 1px 1px 3px rgb(0, 36, 0);
  }
  </style>