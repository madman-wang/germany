//引入插件
var gulp = require('gulp');
var connect = require('gulp-connect');
var px2rem = require('gulp-px3rem');


//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        port: 8888,
        livereload: true
    });
});
//创建watch任务去检测文件,其定义了当文件改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
    gulp.watch(['./*.html', 'src/css/*.css', 'src/js/*.js'], ['file', 'pxrem']);
});

gulp.task('file', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});

gulp.task('pxrem', function() {
    gulp.src('src/css/*.css')
.pipe(px2rem({
        remUnit: 64
    }))
        .pipe(gulp.dest('src/css'))
});

px2rem({
    baseDpr: 2,             // 基于设备的Dpr
    threeVersion: true,    // 是否生成 @1x, @2x and @3x 三个版本(默认: false)，打开后
    remVersion: true,       // 是否生成rem版本(默认: true)
    remUnit: 64,            // rem转换比例 (默认: 75)
    remPrecision: 5         // rem保留几位数 (默认: 5)
});

//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch']);