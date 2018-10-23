<style>
  .index {
    width: 100%;
  }
  .i-profile {
    width: 100%;
  }
  .i-logo {
    width: 60%;
    display: block;
    margin: 0 auto;
    max-width: 180px !important;
    border: 3px solid rgba(250, 250, 250, 1);
    border-radius: 50%;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.17);
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
  .i-logo:hover {
    -webkit-transform: rotateZ(-360deg);
    transform: rotateZ(-360deg);
  }
  .i-name {
    color: rgba(162, 208, 205, 1);
    font-size: 2em;
    width: 100%;
    text-align: center;
  }
  .i-info {
    margin: 0 auto;
    width: 280px;
    height: 300px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.17);
  }
  .i-info > ul {
    width: calc(100% - 20px);
    padding: 10px;
  }
  .i-info > ul > li {
    list-style: none;
    padding-left: 0;
    width: 100%;
    position: relative;
  }
  .i-info > ul > li > span:nth-child(1) {
    display: inline-block;
    width: 34%;
    text-align: right;
  }
  .i-info > ul > li > span:nth-child(2) {
    position: absolute;
  }
</style>

<div class="index">
  <div class="i-profile">
    <img class="i-logo" src="/k-blog/img/logo.jpg" alt="">
    <div class="i-name">KRIS陈大文</div>
  </div>
  <div class="i-info">
    <ul>
      <li>
        <span>年龄：</span><span>23岁</span>
      </li>
      <li>
        <span>性别：</span><span>男</span>
      </li>
      <li>
        <span>职业：</span><span>前端工程师</span>
      </li>
      <li>
        <span>经验：</span><span>2016年7月7日至今</span>
      </li>
      <li>
        <span>掌握技能：</span><span>css3 html5 ecmascript各版本 nodeJs vue全家桶 http webpack sass</span>
      </li>
    </ul>
  </div>
</div>
