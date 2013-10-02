module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      app: {
        src: [
          'client/src/helpers/*.js',
          'client/src/router.js',
          'client/src/mixins/*.js',
          'client/src/routes/*.js',
          'client/src/adapters/*.js',
          'client/src/controllers/*.js',
          'client/src/models/*.js',
          'client/src/components/*.js',
          'client/src/views/*.js'
        ],
        dest: 'server/public/javascripts/app.js'
      },
      lib: {
        src: [
          'client/lib/jquery-2.0.3.min.js',
          'client/lib/handlebars-1.0.0.js',
          'client/lib/ember.js',
          'client/lib/ember-data.js',
          'client/lib/jquery.transit.js',
          'client/lib/jquery.cookie.js',
          'client/lib/spin.min.js',
          'client/lib/moment.js'
        ],
        dest: 'server/public/javascripts/libs.js'
      },
      prodLibs: {
        src: [
          'client/lib/jquery-2.0.3.min.js',
          'client/lib/handlebars-1.0.0.js',
          'client/lib/ember.prod.js',
          'client/lib/jquery.transit.js',
          'client/lib/jquery.cookie.js',
          'client/lib/spin.min.js',
          'client/lib/moment.js'
        ],
        dest: 'server/public/javascripts/libs.js'
      }
    },

    cachebuster: '<%= pkg.version %>',

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      App: {
        src: 'server/public/javascripts/app.js',
        dest: 'server/public/javascripts/app.<%= cachebuster %>.min.js'
      },
      libs: {
        src: 'server/public/javascripts/libs.js',
        dest: 'server/public/javascripts/libs.<%= cachebuster %>.min.js'
      },
      templates: {
        src: 'server/public/javascripts/templates.js',
        dest: 'server/public/javascripts/templates.<%= cachebuster %>.min.js'
      }
    },

    stylus: {
      compile: {
        files: {
          'server/public/stylesheets/style.css':'client/styles/style.styl'
        }
      }
    },

    watch: {
      libScripts: {
        files: ['client/lib/*.js'],
        tasks: ['concat:lib'],
        options: {
          livereload: true
        }
      },
      appScripts: {
        files: ['client/src/**/*.js'],
        tasks: ['concat:app'],
        options: {
          livereload: true
        }
      },
      stylus: {
        files: ['client/src/styles/*.styl'],
        tasks: ['stylus'],
        options: {
          paths: ["src/styles/"],
          compress: false,
          yuicompress: false
        }
      },
      stylesForReload: {
        files: ['server/public/css/*.css'],
        options: {
          livereload: true
        }
      },
      hbs: {
        files: ['client/templates/**/*.hbs'],
        tasks: ['emberTemplates'],
        options: {
          livereload: true
        }
      }
    },

    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /client\/templates\//
        },
        files: {
          "server/public/javascripts/templates.js": "client/templates/**/*.hbs"
        }
      }
    },

    clean: {
      options: {
        force: true
      },
      files: ['server/public/']
    }



  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-ember-templates');



  grunt.registerTask('default', ['concat:app', 'concat:lib', 'emberTemplates', 'stylus']);

};