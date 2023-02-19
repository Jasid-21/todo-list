<template>
    <div class="task_card">
        <button class="delete" @click.prevent="deleteTask">x</button>
        <div class="upper">
            <h3 class="name">{{ name }}</h3>
            <h4 class="done_state" :class="{done: done_state == true}">
                {{ done_state?'Done':'Pending' }}
            </h4>
        </div>

        <div class="description">{{ desc != ''? desc:'...' }}</div>

        <div class="lower">
            <span class="max_date">{{ max_date != ""?max_date:'Not set' }}</span>
            <button class="mark_done" v-if="!done_state" @click.prevent="markAsDone" >
                Mark as done
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    name: 'TaskCard',
    props: ['task_id', 'name', 'done_state', 'max_date', 'desc'],
    setup(props) {
        const id = props.task_id;
        const user_id = localStorage.getItem('TODO_lst_user_id');
        const token = localStorage.getItem('TODO_lst_token');
        const store = useStore();

        const deleteTask = async () => {
            if (!confirm("Are you sure you want to delete this task?")) {
                return;
            }
            
            const url = `http://localhost:3000/delete_task?` + 
            `user_id=${user_id}&token=${token}&task_id=${id}`;

            const resp = await fetch(url, {method: 'POST'});
            const status = resp.status;

            if (status == 200) {
                alert("Task deleted successfully!");

                store.dispatch('deleteTask', id);
            } else {
                const data = await resp.json();

                if (data.msg) {
                    alert(data.msg);
                }
            }
        }

        const markAsDone = async () => {
            const url = `http://localhost:3000/update_task_state?` + 
            `user_id=${user_id}&token=${token}&task_id=${id}`;

            const resp = await fetch(url, {method: 'POST'});
            const status = resp.status;

            if (status == 200) {
                store.dispatch('markAsDone', id);
            } else {
                const data = await resp.json();

                if (data.msg) {
                    alert(data.msg);
                }
            }
        }

        return {deleteTask, markAsDone}
    }
}
</script>

<style scoped>
.delete {
    top: 2px;
    right: 2px;
    width: 18px;
    height: 18px;

    background-color: rgb(122, 122, 122);
    border: 1px solid rgb(85, 85, 85);
    border-radius: 5px;

    color: white;
    font-weight: 700;

    position: absolute;
}
.lower {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mark_done {
    border-radius: 5px;
    background-color: rgba(0, 0, 90, 0);
    border: 2px solid rgb(0, 0, 90);
    color: rgb(0, 0, 90);

    transition-property: background-color, color;
    transition-duration: 150ms;
}

.mark_done:hover {
    background-color: rgb(0, 0, 90);
    color: rgb(255, 255, 255);
}

.max_date {
    margin-left: auto;
    margin-right: auto;
    font-size: 14px;
    font-weight: 700;
}
.description {
    padding: 10px;
    font-style: oblique;
    color: rgb(65, 65, 65);
    margin-bottom: 10px;

    overflow: auto;
}

.description::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
}

.description::-webkit-scrollbar-track {
    width: 7px;
    background-color: rgb(187, 187, 187);
    border-radius: 10px;
}

.description::-webkit-scrollbar-thumb {
    width: 7px;
    background-color: rgb(0, 0, 102);
    border-radius: 10px;
}

.task_card {
    width: 200px;
    height: 250px;

    box-shadow: 2px 2px 5px black;
    border-radius: 10px;
    padding: 10px;

    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: justify;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: relative;
}

.upper {
    padding: 0px 10px;

    display: flex;
    justify-content: space-between;
}

.name {
    margin: 0px;
}

.done_state {
    color: rgb(145, 0, 0);
    margin: 0px;
}

.done_state.done {
    color: rgb(22, 158, 45);
}
</style>
