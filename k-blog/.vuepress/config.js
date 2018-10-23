module.exports = {
  title: "k-dream",
  base: '/k-blog/',
  repo: 'https://github.com/KRISACHAN/k-blog',
  locales: {
    '/': {
      title: '听！这里有梦',
      description: 'kris\'s colorful dream'
    }
  },
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    nav: [
      {
        text: '围城',
        link: '/'
      },
      {
        text: '心晴漫谈',
        link: '/docs/mood/index.html'
      },
      {
        text: '前端碎碎语',
        link: '/docs/front-end/index.html'
      },
      {
        text: '异空间',
        link: '/docs/others/index.html'
      }
    ]
  }
}