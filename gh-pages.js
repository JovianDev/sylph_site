var ghpages = require('gh-pages');

ghpages.publish(
  './public', // path to public directory
  {
    branch: 'gh-pages',
    repo: 'https://joviandev.github.io/sylph_site.git', // Update to point to your repository
    user: {
      name: 'Nick Andreala',
      email: 'nandreala@gmail.com',
    },
    // dotfiles: true
  },
  () => {
    console.log('Deploy Complete!');
  }
);
