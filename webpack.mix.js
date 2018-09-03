let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/restaurant/js/app.js', 'public/dist/restaurant/js/app.js')
    .sass('resources/assets/restaurant/sass/app.scss', 'public/dist/restaurant/css/app.css');

mix.react('resources/assets/frontend/js/app.js', 'public/dist/frontend/js/app.js')
    .sass('resources/assets/frontend/sass/app.scss', 'public/dist/frontend/css/app.css');


if (mix.inProduction()) {
    mix.version();
    mix.disableNotifications();
} else {
    mix.webpackConfig({
        devtool: 'source-map'
    });
}