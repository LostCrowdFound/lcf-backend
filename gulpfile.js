const gulp    = require("gulp"),
      cache   = require("gulp-cached"),
      jshint  = require("gulp-jshint");

const jshintConfig = {
    curly:     true,
    esversion: 6,
    eqeqeq:    true,
    eqnull:    true,
    node:      true
};

gulp.task("lint", function() {
    return gulp.src(["*.js", "config/*.json", "config/*.js", "client/*.js", "server/*.js, server/*/*.js"])
        .pipe(cache("linting"))
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(jshint.reporter("fail", {
            ignoreWarnings: false
        }));
});

gulp.task("test", ["lint"]);
