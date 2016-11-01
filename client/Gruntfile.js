module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'js/output.min.js': [
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular-route/index.js',
                        'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
                        'js/parameters.js',
                        'js/app.js',
                        'js/controller/app.js',
                        'js/controller/login.js',
                        'js/factory/oauth.js',
                        'js/factory/BoxFactory.js',
                        'js/directive/error.js',
                        'js/directive/box.js',
                        'js/directive/bookmark.js'
                    ]
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'css/output.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.css',
                        'css/design.css'
                    ]
                }
            }
        },

        watch: {
            js: {
                files: ['**/*.js', '!js/output.min.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['**/*.css', '!css/output.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false,
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'cssmin']);
};