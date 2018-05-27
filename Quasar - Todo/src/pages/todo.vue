<template>
  <div>
    <!-- <h1>Todo List {{task}}</h1> -->
    <q-toolbar color="primary">
      <q-btn @click="$router.push('/')" flat round dense icon="playlist_add_check" />
      <q-toolbar-title>
        Todo App
      </q-toolbar-title>
    </q-toolbar>
    <!-- <q-field
      icon="cloud"
      label="Add New Task"
      :error="!task.length"
    >
      <q-input v-model="task" />
    </q-field> -->
    <div class="wrapper" style="padding: 25px;">
    <div class="row" style="border: 1px solid #027be3; padding: 10px;">
      <div class="col-md-8">
        <q-input v-model="task" float-label="Add New Task" />
      </div>
      <div class="col-md-4 text-center">
        <q-btn :disabled="!task.length" label="Save New Task" @click="addTask" icon="save" color="blue" glossy rounded style="margin: 10px 0;"/>
      </div>
    </div>
    <!-- <input type="text" v-model="task"> -->
    <!-- <button @click="addTask">Add Task</button> -->
    <!-- <pre>{{tasks}}</pre> -->
    <q-list highlight>
      <q-item v-for="(t,i) in tasks" :key="i">
        <q-item-side>
          <q-checkbox :value="t.done" @input="updateTask(t)" />
        </q-item-side>
        <q-item-main :label="t.desc" />
        <q-item-side right>
          <q-btn @click="removeTask(t._id)" round icon="delete_forever" color="red" glossy />
        </q-item-side>
      </q-item>
    </q-list>
    <!-- <ul>
      <li v-for="(t,i) in tasks" :key="i">
        {{i+1}}: {{t.desc}}
        {{t.done ? '[DONE]':''}}
        <input type="checkbox" v-model="t.done"/>
        <button @click="removeTask(i)">Delete</button>
      </li>
    </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    // wingsJS is a normal feathers instance that has services. In this case, there's a service named "collection"
    this.$dbCon.services.todos.onDataChange(data => {
      this.tasks = data
    })
  },
  data () {
    return {
      task: '',
      tasks: []
    }
  },
  methods: {
    addTask () {
      let taskObj = {done: false, desc: this.task}
      // this.tasks.push(taskObj)
      this.$dbCon.services.todos.create(taskObj)
      this.task = ''
    },
    removeTask (index) {
      // this.tasks.splice(index, 1)
      this.$dbCon.services.todos.remove(index)
    },
    updateTask (t) {
      this.$dbCon.services.todos.patch(t._id, {done: !t.done})
    }
  }
}
</script>

<style>

</style>
