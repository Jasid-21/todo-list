<template>
  <nav>
    <h1>My Tasks</h1>
    <ul v-if="size >= 480">
        <li v-for="(o, idx) of options" :key="idx" 
        @click="setFilter(o.done)"
        :class="{active: o.active}" >
            {{ o.name }}
        </li>
        <li>
            <router-link v-if="logged" to="/login" @click="logout" >Logout</router-link>
            <router-link v-else to="'/login'">Login</router-link>
        </li>
    </ul>
    <CollapseIcon  v-if="size < 480" :options="options" />
  </nav>
</template>

<script>
import { onMounted, ref } from 'vue';
import CollapseIcon from './CollapseIcon.vue';
import { useStore } from 'vuex';

export default {
    name: 'Navbar',
    components: {
        CollapseIcon
    },
    setup() {
        const store = useStore();
        const options = ref([
            {name: 'All', done: null, active: true},
            {name: 'Pending', done: false, active: false},
            {name: 'Done', done: true, active: false}
        ]);
        const size = ref(0);

        const setFilter = (value) => {
            store.commit('setFilter', value);

            options.value.forEach((item) => {
                console.log(item);
                console.log(value);
                if (item.done == value) {
                    console.log("Enter");
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
        }

        const onResize = () => {
            window.addEventListener('resize', () => {
                updateSize();
            });
        }

        const updateSize = () => {
            size.value = window.innerWidth;
        }

        
        const logged = ref(false);
        const user_id = localStorage.getItem('TODO_lst_user_id');
        const token = localStorage.getItem('TODO_lst_token');

        const logout = () => {
            const url = `http://localhost:3000/logout?token=${token}`;
            fetch(url, {method: 'POST'})
            .then(resp => {
                if (resp.status == 200) {
                    localStorage.removeItem('TODO_lst_user_id');
                    localStorage.removeItem('TODO_lst_token');
                    localStorage.removeItem('TODO_lst_username');
                }
            });
        }

        if (user_id && token) {
            logged.value = true;
        }

        onMounted(() => {
            onResize();
            updateSize();
        });

        return {options, size, logged, setFilter, logout}
    }
}
</script>

<style scoped>
@media (max-width: 800px) {
    nav > ul {
        width: calc(100% - 200px);
    }
}

a {
    color: rgb(175, 99, 0);
    text-decoration: none;
}

nav {
    height: 80px;
    margin: 0px;
    padding: 0px;
    background-color: #6096B4;

    display: flex;
    align-items: center;
    position: relative;
}

nav > h1 {
    width: 150px;
    margin: 0px;
    margin-left: 50px;
}

nav > ul {
    width: 50%;
    margin: 0px;
    padding: 0px;
    list-style: none;
    display: flex;
    justify-content: space-around;
}

nav > ul > li {
    margin-right: 20px;
}

li.active {
    font-weight: 700;
    color: rgb(80, 0, 80);
}

nav > ul > li:hover {
    cursor: pointer;
    font-weight: 700;
    color: rgb(80, 0, 80);
}
</style>
