<template>
  <div class="search">
    <div class="bar">
      <input type="text" v-model="searchStr" placeholder="Enter your search terms"/>
    </div>
    <ul>
      <li v-for="a in articles1">
        <a :href="a.url"><img :src="a.image"/></a>
        <p>{{ a.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      searchStr: '',
      articles: [
        {
          'title': 'What You Need To Know About CSS Variables',
          'url': 'http://tutorialzine.com/2016/03/what-you-need-to-know-about-css-variables/',
          'image': 'http://cdn.tutorialzine.com/wp-content/uploads/2016/03/css-variables-100x100.jpg'
        },
        {
          'title': 'Freebie: 4 Great Looking Pricing Tables',
          'url': 'http://tutorialzine.com/2016/02/freebie-4-great-looking-pricing-tables/',
          'image': 'http://cdn.tutorialzine.com/wp-content/uploads/2016/02/great-looking-pricing-tables-100x100.jpg'
        },
        {
          'title': '20 Interesting JavaScript and CSS Libraries for February 2016',
          'url': 'http://tutorialzine.com/2016/02/20-interesting-javascript-and-css-libraries-for-february-2016/',
          'image': 'http://cdn.tutorialzine.com/wp-content/uploads/2016/02/interesting-resources-february-100x100.jpg'
        },
        {
          'title': 'Quick Tip: The Easiest Way To Make Responsive Headers',
          'url': 'http://tutorialzine.com/2016/02/quick-tip-easiest-way-to-make-responsive-headers/',
          'image': 'http://cdn.tutorialzine.com/wp-content/uploads/2016/02/quick-tip-responsive-headers-100x100.png'
        },
        {
          'title': 'Learn SQL In 20 Minutes',
          'url': 'http://tutorialzine.com/2016/01/learn-sql-in-20-minutes/',
          'image': 'http://cdn.tutorialzine.com/wp-content/uploads/2016/01/learn-sql-20-minutes-100x100.png'
        },
        {
          'title': 'Creating Your First Desktop App With HTML, JS and Electron',
          'url': 'http://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron/',
          'image': 'http://cdn.tutorialzine.com/wp-content/uploads/2015/12/creating-your-first-desktop-app-with-electron-100x100.png'
        }
      ]
    }
  },
  computed: {
    articles1: function () {
      if (!this.searchStr) {
        return false
      }
      var s = this.searchStr.trim().toLowerCase()
      var result = this.articles.filter(function (i) {
        if (i.title.toLowerCase().indexOf(s) !== -1) {
          return i
        }
      })
      return result
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
