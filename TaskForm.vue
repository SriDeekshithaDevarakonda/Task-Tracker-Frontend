//Create TaskForm.vue:

<template>
  <div>
    <h1>Add Task</h1>
    <form @submit.prevent="addTask">
      <input v-model="title" type="text" placeholder="Task Title" required>
      <input v-model="description" type="text" placeholder="Task Description">
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: ''
    };
  },
  methods: {
    async addTask() {
      try {
        await axios.post('http://localhost:3000/task', {
          title: this.title,
          description: this.description
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.$emit('taskAdded');
        this.title = '';
        this.description = '';
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    }
  }
};
</script>
