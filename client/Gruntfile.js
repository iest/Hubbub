module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // clean: ["../server/public/*"],

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      app: {
        src: [
          'src/app/helpers/*.js',
          'src/app/router.js',
          'src/app/mixins/*.js',
          'src/app/routes/*.js',
          'src/app/adapters/*.js',
          'src/app/controllers/*.js',
          'src/app/models/*.js',
          'src/app/components/*.js',
          'src/app/views/*.js'
        ],
        dest: '../server/public/js/app.js'
      },
      lib: {
        src: [
          'src/lib/jquery-1.10.2.min.js',
          'src/lib/handlebars-1.0.0.js',
          'src/lib/ember.js',
          'src/lib/jquery.transit.js',
          'src/lib/jquery.cookie.js',
          'src/lib/spin.min.js',
          'src/lib/moment.js'
        ],
        dest: '../server/public/js/libs.js'
      },
      prodLibs: {
        src: [
          'src/lib/jquery-1.10.2.min.js',
          'src/lib/handlebars-1.0.0.js',
          'src/lib/ember.prod.js',
          'src/lib/jquery.transit.js',
          'src/lib/jquery.cookie.js',
          'src/lib/spin.min.js',
          'src/lib/moment.js'
        ],
        dest: '../server/public/js/libs.js'
      }
    },

    copy: {
      main: {
        files: [{
            expand: true,
            cwd: 'src/fonts/',
            src: ['**'],
            dest: '../server/public/fonts/'
          }, // includes files in path and its subdirs
          {
            expand: true,
            cwd: 'src/images/',
            src: ['**'],
            dest: '../server/public/images/'
          }
        ]
      },
      ieShims: {
        files: [{
          expand: true,
          cwd: 'src/lib/',
          src: ['html5shiv.js'],
          dest: '../server/public/js/'
        }]
      }
    },

    cachebuster: '<%= pkg.version %>',

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      App: {
        src: '../server/public/js/app.js',
        dest: '../server/public/js/app.<%= cachebuster %>.min.js'
      },
      libs: {
        src: '../server/public/js/libs.js',
        dest: '../server/public/js/libs.<%= cachebuster %>.min.js'
      },
      templates: {
        src: '../server/public/js/templates.js',
        dest: '../server/public/js/templates.<%= cachebuster %>.min.js'
      }
    },

    stylus: {
      compile: {
        files: {
          '../server/public/css/insight2_<%= cachebuster %>.css': 'src/styles/insight2.styl',
          '../server/public/css/insight2_ie_<%= cachebuster %>.css': 'src/styles/insight2_ie.styl'
        }
      }
    },

    jade: {
      dev: {
        options: {
          pretty: true,
          data: {
            debug: true,
            // This needs to be the same variable that goes in App & libs
            cachebuster: '<%= cachebuster %>'
          }
        },
        files: {
          "../server/public/index.html": "src/index.jade"
        }
      },
      prod: {
        options: {
          data: {
            debug: false,
            // This needs to be the same variable that goes in App & libs
            cachebuster: '<%= cachebuster %>'
          }
        },
        files: {
          "../server/public/index.html": "src/index.jade"
        }
      }
    },

    watch: {
      copyables: {
        files: ['src/images/*', 'src/fonts/*'],
        tasks: ['copy']
      },
      libScripts: {
        files: ['src/js/lib/*.js'],
        tasks: ['concat:lib'],
        options: {
          livereload: true
        }
      },
      appScripts: {
        files: ['src/app/**/*.js'],
        tasks: ['concat:app'],
        options: {
          livereload: true
        }
      },
      stylus: {
        files: ['src/styles/*.styl'],
        tasks: ['stylus'],
        options: {
          paths: ["src/styles/"],
          compress: false,
          yuicompress: false
        }
      },
      stylesForReload: {
        files: ['../server/public/css/*.css'],
        options: {
          livereload: true
        }
      },
      jade: {
        files: ['src/*.jade'],
        tasks: ['jade:dev'],
        options: {
          livereload: true
        }
      },
      hbs: {
        files: ['src/templates/**/*.hbs'],
        tasks: ['emberTemplates'],
        options: {
          livereload: true
        }
      }
    },

    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /src\/templates\//
        },
        files: {
          "../server/public/js/templates.js": ["src/templates/**/*.hbs"]
        }
      }
    },

    clean: {
      options: {
        force: true
      },
      files: ['../server/public/']
    }



  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ember-templates');



  grunt.registerTask('default', ['copy', 'concat:app', 'concat:lib', 'jade:dev', 'emberTemplates', 'stylus']);

  grunt.registerTask('prod', ['clean', 'copy', 'concat:app', 'concat:prodLibs','emberTemplates', 'uglify', 'jade:prod', 'stylus']);


};