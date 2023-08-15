<template>
    <div class="taskCreator" @click="() => formActive = !formActive">
        <div class="circle" v-if="!formActive">
            <span>+</span>
        </div>

        <form v-else @click.stop>
            <button class="close_btn" @click.prevent="() => formActive = false">x</button>
            <h4>New task form</h4>
            <input type="text" placeholder="Type a task name..." v-model="name">
            <textarea 
            cols="30" rows="10" 
            v-model="desc"
            placeholder="Type a description (optional)..."></textarea>
            <input type="date" v-model="date">
            <input type="submit" value="Create!" @click.prevent="createTask">
        </form>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: 'taskCreator',
    setup() {
        const store = useStore();
        const base_url = store.state.base_url;
        const formActive = ref(false);
        const name = ref('');
        const desc = ref('');
        const date = ref(new Date().toISOString().slice(0,10));

        const createTask = async () => {
            const token = localStorage.getItem('TODO_lst_token');
            const user_id = localStorage.getItem('TODO_lst_user_id');
            const url = `${base_url}/new_task?` + 
            `token=${token}&user_id=${user_id}&name=${name.value}&desc=${desc.value}&date=${date.value}`;

            const resp = await fetch(url, {method: 'POST'});
            const ok = resp.ok;
            const data = await resp.json();

            if (!ok) {
                Swal.fire({
                    title: 'App error',
                    text: data.msg,
                    icon: 'error',
                });
                return;
            }

            const task = {
                Id: data.task_id,
                Task_name: name.value,
                task_desc: desc.value,
                Max_date: date.value,
                User_id: user_id,
                Done: false
            }

            store.dispatch('newTask', task);

            name.value = '';
            desc.value = '';
        }

        return {formActive, name, desc, date, createTask}
    }
}
</script>

<style scoped>
.close_btn {
    top: -10px;
    right: -8px;

    width: 20px;
    height: 20px;

    border-radius: 50%;
    border: 1px solid rgb(216, 0, 0);
    background-color: rgb(110, 0, 0);

    color: white;
    font-weight: 700;
    text-align: center;

    position: absolute;
}

form {
    width: 100%;
    position: relative;
}

form > * {
    width: 100%;

    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

form > h4 {
    margin: 0px;
    text-align: center !important;
}

form > input, form > textarea {
    border-radius: 3px;
    border: 1px solid gray;
}

form > input[type="submit"] {
    background-color: #356e8d;
    color: white;
    font-weight: 700;
}

form > input[type="text"], 
form > input[type="date"] {
    margin-bottom: 5px;
}

.taskCreator {
    width: 200px;
    height: 250px;

    box-shadow: 2px 2px 5px black;
    border-color: rgb(80, 80, 80);;
    border-radius: 10px;
    padding: 10px;

    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: justify;

    display: flex;
    justify-content: center;
    align-items: center;
}

.taskCreator:hover {
    border-color: rgb(19, 81, 131);
    box-shadow: 2px 2px 5px rgb(19, 81, 131);
    color: rgb(19, 81, 131);
    cursor: pointer;
}

.circle {
    width: 100px;
    height: 100px;

    border: 4px solid rgb(80, 80, 80);
    border-color: inherit;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.circle > span {
    font-size: 50px;
    color: inherit;
}
</style>
