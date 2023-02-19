<template>
  <div class="home">
    <Navbar />
    <div class="body_container">
      <TaskCreator />
      <TaskCard v-for="(t, idx) of data" :key="idx" 
      :name="t.Task_name"
      :done_state="t.Done"
      :max_date="t.Max_date"
      :desc="t.task_desc"
      :task_id="t.Id" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import TaskCard from '@/components/TaskCard.vue';
import TaskCreator from '@/components/TaskCreator.vue'

import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    Navbar,
    TaskCard,
    TaskCreator
  },
  setup() {
    const store = useStore();
    const data = computed(() => store.state.filtered);

    onMounted(async () => {
      const user_id = localStorage.getItem('TODO_lst_user_id');
      const token = localStorage.getItem('TODO_lst_token');
      const url = `http://localhost:3000/home_info?user_id=${user_id}&token=${token}`

      const resp = await fetch(url, {method: 'GET'});
      const status = resp.status;

      if (status == 200) {
        const tasks = await resp.json();

        console.log(tasks);
        store.commit('setAll', tasks);  
      }
    });

    return {data}
  }
}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
}
.body_container {
  width: 100%;
  height: calc(100% - 80px);

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
