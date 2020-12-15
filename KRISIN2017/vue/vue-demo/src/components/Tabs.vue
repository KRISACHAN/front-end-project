<template>
  <div class="tabs">
    <div class="main">
      <!-- .prevent阻止默认事件,这里主要是为了阻止a标签的点击自动跳转或者刷新页面的默认事件 -->
      <nav @click.prevent>
        <a v-for="(item,index) in items" :class="{'show': item.active}" @click="makeActive(item,index)">
            {{ item.name }}
        </a>
      </nav>
      <p>You choose <b>{{ active }}</b></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  data () {
    return {
      active: 'HTML',
      items: [
        {name: 'HTML', active: true},
        {name: 'CSS', active: false},
        {name: 'JavaScript', active: false},
        {name: 'Vue.js', active: false}
      ]
    }
  },
  methods: {
    makeActive: function (item, index) {
      this.active = item.name
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].active = false
      }
      this.items[index].active = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin:0;
    padding:0;
  }
  .main{
    width:432px;
    margin:0 auto;
    text-align:center;
  }
  nav{
    display:inline-block;
    margin:60px auto 45px;
    background-color:#5597b4;
    box-shadow:0 1px 1px #ccc;
    border-radius:2px;
  }
  nav a{
    display:inline-block;
    padding: 18px 30px;
    color:#fff !important;
    font-weight:bold;
    font-size:16px;
    text-decoration:none !important;
    line-height:1;
    background-color:transparent;
    -webkit-transition:background-color 0.25s;
    -moz-transition:background-color 0.25s;
    transition:background-color 0.25s;
      cursor:pointer;
  }
  b{
    display:inline-block;
    padding:5px 10px;
    background-color:#c4d7e0;
    border-radius:2px;
    font-size:18px;
  }
  .show{
    background-color:#e35885;
  }
</style>
