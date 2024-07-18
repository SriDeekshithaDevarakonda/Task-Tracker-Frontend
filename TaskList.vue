//Create TaskList.vue:

<template>
  <div>
    <h1>Tasks</h1>
    <TaskForm @taskAdded="fetchTasks" />
    <ul>
      <li v-for="task in tasks" :key="task._id">{{ task.title }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import TaskForm from './TaskForm.vue';

export default {
  components: {
    TaskForm
  },
  data() {
    return {
      tasks: []
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:3000/task', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.tasks = response.data;
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    }
  }
};
</script>
