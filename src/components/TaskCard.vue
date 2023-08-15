<template>
    <div class="task_card">
        <div class="card-header">
            <span class="max_date">{{ max_date != ""?max_date:'Not set' }}</span>
            <h4 class="done_state" :class="{done: done_state == true}">
                {{ done_state?'Done':'Pending' }}
            </h4>
        </div>
        <h3 class="name-title">{{ name }}</h3>

        <div class="description">{{ desc != ''? desc:'No description available' }}</div>
        <div class="btn-options">
            <button class="delete-btn" @click.prevent="deleteTask">
                x
            </button>
            <button class="mark_done" v-if="!done_state" @click.prevent="markAsDone" >
                Mark as done
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: 'TaskCard',
    props: ['task_id', 'name', 'done_state', 'max_date', 'desc'],
    setup(props) {
        const id = props.task_id;
        const user_id = localStorage.getItem('TODO_lst_user_id');
        const token = localStorage.getItem('TODO_lst_token');

        const store = useStore();
        const base_url = store.state.base_url;

        const deleteTask = async () => {
            const confirm = await Swal.fire({
                title: 'Delete confirmation',
                text: 'Are you sure you want to delete this task?',
                icon: 'warning',
                showCancelButton: true,
                focusCancel: true,
            });
            if (!confirm.isConfirmed) return;
            
            const url = `${base_url}/delete_task?` + 
            `user_id=${user_id}&token=${token}&task_id=${id}`;

            const resp = await fetch(url, {method: 'POST'});
            const ok = resp.ok;

            if (ok) {
                Swal.fire({
                    title: 'Delete confirmed',
                    text: 'Task deleted successfully!',
                    icon: 'success',
                });
                store.dispatch('deleteTask', id);
            } else {
                const data = await resp.json();
                if (!data.msg) return;

                Swal.fire({
                    title: 'App error',
                    text: data.msg,
                    icon: 'error',
                });
            }
        }

        const markAsDone = async () => {
            const confirm = await Swal.fire({
                title: 'Done confirmation',
                text: 'Have you done this task alredy?',
                icon: 'question',
                showCancelButton: true,
                focusCancel: true,
            });
            if (!confirm.isConfirmed) return;

            const url = `${base_url}/update_task_state?` + 
            `user_id=${user_id}&token=${token}&task_id=${id}`;

            const resp = await fetch(url, {method: 'POST'});
            const ok = resp.ok;

            if (!ok) {
                const data = await resp.json();
                if (!data.msg) return;

                Swal.fire({
                    title: 'App error',
                    text: data.msg,
                    icon: 'error',
                });
                return;
            }

            Swal.fire({
                title: 'App message',
                title: 'Status updated',
                icon: 'success',
            });
            store.dispatch('markAsDone', id);
        }

        return {deleteTask, markAsDone}
    }
}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn-options {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.delete-btn {
    color: red;
    border: 2px solid red;
    border-radius: 10px;
    font-size: 25px;
    font-weight: 500;

    display: flex;
    justify-content: center;
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
    font-size: 14px;
    font-weight: 700;
}
.description {
    padding: 10px;
    font-style: oblique;
    color: rgb(65, 65, 65);

    margin-bottom: 10px;
    border: 1px dashed gray;
    border-radius: 5px;

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

    display: grid;
    grid-template-rows: 20px 35px calc(100% - 80px) 25px;
}

.name-title {
    text-align: center;
    margin: 0px;
    align-self: flex-end;
}

.done_state {
    color: rgb(145, 0, 0);
    margin: 0px;
}

.done_state.done {
    color: rgb(22, 158, 45);
}
</style>
