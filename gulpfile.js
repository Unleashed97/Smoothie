const { src, dest, parallel, series, watch } = require('gulp');
const sync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');

// HTML
const html = () => {
    return src('app/**/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
        .pipe(sync.stream())
}

// Styles
const styles = () => {
    return src(['app/less/main.less'])
    .pipe(less())
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], cascade: false }))
    .pipe(cleancss(({ level: { 1: { specialComments: 0}}})))
    .pipe(rename({
        basename: 'style',
        suffix: '.min'
      }))
    .pipe(dest('app/css/'))
    .pipe(dest('dist/css/'))
    .pipe(sync.stream())
}

// Scripts
const scripts = () => {
    return src(['app/js/script.js', 'app/js/preloader.js', 'app/js/**/*.js', '!app/js/script.min.js'])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(dest('dist/js/'))
    .pipe(sync.stream())
}

// server
const server = () => {
    sync.init({
        server: { baseDir: 'app'},
        notify: false,
        online: true
    })
}

// Copy
const copy = () => {
    return src([
        'app/fonts/**/*',
        'app/images/**/*'
    ], {
        base: 'app'
    })
    .pipe(dest('dist/'))
    .pipe(sync.stream());
}

// cleandist
const cleandist = () => {
    return del('dist/**/*', { force: true })
}

// build copy
// function buildcopy() {
//     return src(['app/css/**/*.min.css',
//         'app/js/**/*.min.js',
//         'app/images/**/*',
//         'app/fonts/**/*',
//         'app/**/*.html',
//         ], { base: 'app' })
//     .pipe(dest('dist'))
// }

// Watch
const startwatch = () => {
    watch(['app/*.html', 'app/pages/*.html'], html);
    watch('app/**/*.less', styles);
    watch(['app/**/*.js', '!app/js/script.min.js'], scripts);
    watch(['app/images/**/*', 'app/fonts/**/*'], copy);
    watch('app/**/*.html').on('change', sync.reload);
}

exports.server = server;
exports.html = html;
exports.scripts = scripts;
exports.styles = styles;
exports.copy = copy;
exports.cleandist = cleandist;

exports.build = series(cleandist, parallel(html, styles, scripts));

exports.default = parallel(startwatch, server);