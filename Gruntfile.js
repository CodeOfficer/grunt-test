/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },

    qunit: {
      files: ['test/**/*.html']
    },

    concat: {
      vendor: {
        src: [
          'vendor/jquery.min.js',
          'vendor/handlebars.js',
          'vendor/ember.js',
          'vendor/ember-data.js'
        ],
        dest: 'dist/vendor.js'
      },
      app: {
        src: [
          'lib/<%= pkg.name %>.js',
          'lib/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    min: {
      app: {
        src: ['<config:concat.app.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },

      globals: {
        jQuery: true,
        Ember: true,
        Em: true
      }
    },

    uglify: {},

    ember_templates: {
      compile: {
        options: {
          templateName: function(sourceFile) {
            return sourceFile.replace(/path\/to\//, '');
          }
        },
        files: {
          "dist/templates.js": "templates/**/*.handlebars"
        }
      }
    }


  });

  // Default task.
  grunt.registerTask('default', 'ember_templates lint qunit concat min');

  grunt.loadNpmTasks('grunt-ember-templates');
};

