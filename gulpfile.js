const gulp=require('gulp')
const sass= require('gulp-sass')(require('sass'));
const minifyCSS=require('gulp-minify-css')

gulp.task('sass',async function(){
    return gulp.src('components/style/**/*.scss').pipe(sass()).pipe(minifyCSS()).pipe(gulp.dest('dist/css'))
})