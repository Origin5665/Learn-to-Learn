import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import del from 'del';
import autoprefixer from 'gulp-autoprefixer';
import ghPages from 'gulp-gh-pages';

gulp.task('deploy', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});


export const clean = async () => {
    del.sync('dist')
};

gulp.task('styles', async function () {

    gulp.src('app/css/style.min.css')

        .pipe(replace(replace('url("../../../images/', 'url("' + 'images')))
        .pipe(gulp.dest('./dist/css'))

})

// SCSS

export const scss = () => {

    return gulp.src('app/scss/style.scss')

        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 version'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
};

// CSS

export const css = () => {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({ stream: true }))
};


// HTML

export const html = () => {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
};

// Script

export const script = () => {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }))

};
// JavaScript

export const js = () => {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',

    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))

};

// EXPORT

export const exp = async () => {
    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));

    let buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    let buildJs = gulp.src('app/js/**/*.js')

        .pipe(gulp.dest('dist/js'));

    let buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    let buildImg = gulp.src('app/images/**/*.*')
        .pipe(gulp.dest('dist/images'));
}


//watcher

export const watch = () => {
    gulp.watch('app/blocks/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
};

// browser-sync
export const browser = () => {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
};

gulp.task('build', gulp.series(clean, exp))
gulp.task('default', gulp.parallel(css, scss, js, browser, watch))