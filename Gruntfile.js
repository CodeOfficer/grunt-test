/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    lint: {
      files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
    },

    concat: {
      lib: {
        src: [
          'lib/<%= pkg.name %>.js',
          'lib/**/*.js'
        ],
        dest: 'build/<%= pkg.name %>.js'
      },
      vendor: {
        src: [
          'vendor/jquery.min.js',
          'vendor/handlebars.js',
          'vendor/ember.js',
          'vendor/ember-data.js'
        ],
        dest: 'build/vendor.js'
      }
    },

    min: {
      lib: {
        src: ['<config:concat.lib.dest>'],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
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
            return sourceFile.replace(/lib\/templates\//, '');
          }
        },
        files: {
          "build/templates.js": "lib/templates/**/*.handlebars"
        }
      }
    }


  });

  // Default task.
  grunt.registerTask('default', 'lint concat min ember_templates');

  grunt.loadNpmTasks('grunt-ember-templates');
};

