var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var cssnano = require('gulp-cssnano');
var rename  = require('gulp-rename');
var  del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');

gulp.task('sass', function(){
    return gulp.src('app/sass/style.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('css-min', ['sass'], function() {
    return gulp.src('app/css/style.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src([
        'app/js/сopybuffer.js',
        'app/js/burger-menu.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch',['browser-sync', 'css-min', 'scripts'], function() {
    gulp.watch('app/sass/**/*.scss', ['css-min'], browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch(['app/js/**/*.js', '!app/js/main.min.js'], ['scripts'], browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'img', 'css-min', 'scripts'], function() {

    var buildCss = gulp.src('app/css/style.min.css')
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/main.min.js')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));

    var buildBubble = gulp.src('app/bubble_sorting/**/*')
        .pipe(gulp.dest('dist/bubble_sorting'));

});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);