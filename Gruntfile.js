module.exports = function(grunt){
    grunt.initConfig({
        express: {
            dev:{
                options:{
                    script: "./bin/www"
                }
            }
        },
        watch:{
            express:{
                files:['./bin/www', './routes/*.js', './app.js'],
                tasks:['express'],
                options:{
                    spawn: false
                }
            },
            grunt:{
                files:['./Gruntfile.js'],
                tasks: [],
                options:{
                    reload: true
                }
            },
            html:{
                files:['./views/*.jade', './views/**/*.jade', './public/stylesheets/*.css'],
                tasks:[],
                options:{
                    livereload: 35730
                }
            },
            adminhtml:{
                files:['./views/*.jade', './views/**/*.jade', './public/stylesheets/*.css'],
                tasks:[],
                options:{
                    livereload: 35730
                }
            },
            html2js:{
                files:['./public/templates/*.tpl.html', './public/templates/*.jade'],
                tasks:['html2js:main']
            },
            adminhtml2js:{
                files:['./public/templates/adminka/*.tpl.html', './public/templates/adminka/*.jade'],
                tasks:['html2js:admin']
            },
            concat:{
                files:['./public/javascripts/app.js', './public/javascripts/ng-modules/*.js', './tmp/templates.js'],
                tasks:['concat:main', 'uglify:main'],
                options:{
                    livereload: 35730
                }
            },
            adminconcat:{
                files:['./public/javascripts/app.admin.js', './public/javascripts/ng-modules/adminka/*.js', './tmp/adminka-templates.js'],
                tasks:['concat:admin', 'uglify:admin'],
                options:{
                    livereload: 35730
                }
            }
        },
        jshint:{
            all:['./public/javascripts/app.js', './public/javascripts/ng-modules/*.js', './routes/*.js']
        },
        concat:{
            options: {
                separator: ";"
            },
            main: {
                src: ['./public/javascripts/app.js', './public/javascripts/ng-modules/*.js', './tmp/templates.js'],
                dest: './public/javascripts/app.concat.js'
            },
            admin:{
                src: ['./public/javascripts/app.admin.js', './public/javascripts/ng-modules/adminka/*.js', './tmp/adminka-templates.js'],
                dest: './public/javascripts/app.admin.concat.js'

            }
        },
        uglify:{
            main:{
                options:{
                    mangle:false
                },
                files:{
                    './public/javascripts/app.min.js': ['./public/javascripts/app.concat.js']
                }
            },
            admin:{
                options:{
                    mangle:false
                },
                files:{
                    './public/javascripts/app.admin.min.js': ['./public/javascripts/app.admin.concat.js']
                }
            }
        },
        html2js:{
            main:{
                options:{
                    base: 'public',
                    module: 'templates',
                    jade:{
                        doctype: 'html'
                    }
                },
                src: ['./public/templates/*.tpl.html', './public/templates/*.jade'],
                dest: './tmp/templates.js'
            },
            admin:{
                options:{
                    base: 'public',
                    module: 'adminTemplates',
                    jade:{
                        doctype: 'html'
                    }
                },
                src: ['./public/templates/adminka/*.tpl.html', './public/templates/adminka/*.jade'],
                dest: './tmp/adminka-templates.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('default', ['express:dev', 'watch']);
    grunt.registerTask('admin', ['html2js:admin', 'concat:admin', 'uglify:admin']);
    grunt.registerTask('main', ['html2js:main', 'concat:main', 'uglify:main']);
};
