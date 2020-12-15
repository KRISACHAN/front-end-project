<template>
  <div id="app">
    <table class="table">
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><input type="checkbox" v-model="allChecked"/>全选{{allChecked}}</td>
        </tr>
        <tr v-for="item in list">
            <td><input type="checkbox" v-model="item.checked" /></td>
            <td>{{item.name}}</td>
            <td>{{item.age}}</td>
        </tr>
        </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      list: [
        { name: '小明', age: 23, checked: true },
        { name: '小红', age: 20, checked: true },
        { name: 'ddd', age: 30, checked: true }
      ]
    }
  },
  computed: {
    allChecked: {
      get: function () {
        return this.checkedCount === this.list.length
      },
      set: function (value) {
        this.list.forEach(function (e, i, a) {
          e.checked = value
        })
        return value
      }
    },
    checkedCount: {
      get: function () {
        var i = 0
        this.list.forEach(function (items) {
          if (items.checked === true) {
            i++
          }
        })
        return i
      }
    }
  }
}
</script>

<style>
</style>
