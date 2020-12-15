<template>
  <div class="addnum">
    <div class="main">
      <h1>Services</h1>
      <ul>
        <li v-for="item in items"
          @click="toggleActive(item)"
          :class="{'active':item.active}">
          {{item.name}}
          <span>{{ item.price }}</span>
        </li>
      </ul>
      <p>Total: <span>{{ total() }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addnum',
  data () {
    return {
      items: [
        {
          name: 'Web Development',
          price: 300,
          active: false
        },
        {
          name: 'Design',
          price: 400,
          active: false
        },
        {
          name: 'Integration',
          price: 250,
          active: false
        },
        {
          name: 'Training',
          price: 220,
          active: false
        }
      ]
    }
  },
  methods: {
    toggleActive: function (i) {
      i.active = !i.active
    },
    total: function () {
      var total = 0
      this.items.forEach(function (s) {
        if (s.active) {
          total += s.price
        }
      })
      return total
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
  body{
    font-family:Microsoft YaHei;
  }
  li{list-style:none;}
  .main{
    width:400px;
    background-color:#61a1bc;
    margin:50px auto;
    padding:35px 60px;
  }
  h1{
      font-size:44px;
      text-align:center;
  }
  ul{
    font-size:20px;
    text-align:left;
    margin:20px 0 15px;
  }
  ul li{
    padding:20px 30px;
    background-color:#e35885;
    margin-bottom:8px;
    cursor:pointer;
  }
  ul li span{float:right;}
  ul li.active{
    background-color:#8ec16d;
  }
  p{
    border-top:1px solid rgba(255,255,255,0.5);
    padding:15px 30px;
    font-size:20px;
    text-align: left;
  }
  p span{float:right;}
</style>
