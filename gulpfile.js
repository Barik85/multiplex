let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cssnano = require('gulp-cssnano');
let mmq = require('gulp-merge-media-queries');
let pug = require('gulp-pug');
let del = require('del');
let htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

gulp.task('del-dist', function(){
    return del.sync('dist');
})

gulp.task('pug-compile', function buildHTML() {
    return gulp.src('src/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
        stream: true
    }))
  });

gulp.task('html', function(){
    return gulp.src("src/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task("watch", function(){
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.pug', ['pug-compile']);    
    gulp.watch('src/Sass/**/*.scss', ['css']);
    gulp.watch('src/img/**/*.*', ['img']);
    gulp.watch('src/fonts/**/*.*', ['fonts']);
    
});

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('css', function (){
    return gulp.src('src/Sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(mmq({
        log: false
      }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('img', function (){
    return gulp.src('src/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('fonts', function(){
    return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('build', ['img', 'pug-compile', 'html', 'css', 'fonts']);

gulp.task('start', ['del-dist', 'build', 'server', 'watch']);