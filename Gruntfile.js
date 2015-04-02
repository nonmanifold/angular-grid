module.exports = function(grunt) {
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Load requirejs support along with almond
    grunt.loadNpmTasks('grunt-requirejs');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    // *insert almond
                    almond: true,
                    paths: {
                        angular: "node_modules/angular/angular",
                        css: "node_modules/require-css/css",
                        'css-builder': "node_modules/require-css/css-builder",
                        'normalize': "node_modules/require-css/normalize",
                        text: "node_modules/requirejs-text/text"

                    },
                    include: ["css", "src/angularGrid"],
                    exclude: ["angular"],
                    wrap: {
                        startFile: "tools/wrap.start",
                        endFile: "tools/wrap.end"
                    },
                    baseUrl: '.',
                    out: "dist/<%= pkg.name %>.js",
                    optimize: "none"
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %>  Written by <%= pkg.author %>, <%= pkg.homepage %>  <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
    });



    // Default task(s).
    grunt.registerTask('default', ['requirejs:compile', 'uglify']);

};