<template>
  <div id="tooltip">
    <div class="main" @click="hide">
      <!-- @click.stop 事件修饰符 阻止事件冒泡 -->
      <div class="tooltip" v-show="show" @click.stop>
        <input type="text" v-model="text" />
      </div>
      <p @click.stop="toggle">{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tooltip',
  data () {
    return {
      show: false,
      text: 'Edit me.'
    }
  },
  methods: {
    hide: function () {
      this.show = false
    },
    toggle: function () {
      this.show = !this.show
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  [v-cloak] {
    display: none;
  }
  *{
      margin:0;
    padding:0;
  }
  body{
      font-family:Microsoft YaHei;
      text-align:center;
  }
  li{
      list-style:none;
  }
  .tooltip{
    background-color:#5c9bb7;
    border-radius:3px;
    width: 290px;
    padding: 10px;
    position: absolute;
    left:50%;
    margin-left:-150px;
    top: 80px;
  }
  .tooltip:after{
    content:'';
    position:absolute;
    border:6px solid #5190ac;
    border-color:#5190ac transparent transparent;
    width:0;
    height:0;
    bottom:-12px;
    left:50%;
    margin-left:-6px;
  }
  .tooltip input{
    border: none;
    width: 100%;
    line-height: 34px;
    border-radius: 3px;
    box-shadow: 0 2px 6px #bbb inset;
    text-align: center;
    font-size: 16px;
    font-family: inherit;
    color: #8d9395;
    font-weight: bold;
    outline: none;
  }
  p{
    font-size:22px;
    font-weight:bold;
    color:#6d8088;
    height: 30px;
    text-align: center;
    cursor:pointer;
  }
  p:before{
    content:'✎';
    display:inline-block;
    margin-right:5px;
    font-weight:normal;
    vertical-align: text-bottom;
  }
  .main{
    height:300px;
    position:relative;
    padding-top: 150px;
  }
</style>
