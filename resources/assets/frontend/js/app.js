window.$ = window.jQuery = require('./lib/jquery.min');

require('hammerjs');
require('moment');
require('./lib/classie');
require('./lib/bootstrap.min')
require('./lib/application-appear');
require('./lib/jquery.themepunch.plugins');
require('./lib/jquery.themepunch.revolution.min');
require('./lib/cs.script');
require('./lib/jquery.currencies.min');
require('./lib/linkOptionSelectors');
require('./lib/owl.carousel.min.js');
require('./lib/scripts');
require('./lib/social-buttons');
require('./lib/jquery.touchSwipe.min');
require('./lib/jquery.fancybox');


window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

require('./components/Index');

require('../images/1.jpg');
require('../images/2.jpg');
require('../images/3.jpg');
require('../images/4.jpg');
require('../images/5.jpg');
require('../images/6.jpg');
require('../images/7.jpg');
require('../images/8.jpg');
require('../images/9.jpg');
