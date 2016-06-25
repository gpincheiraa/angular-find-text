var fs = require('fs');

module.exports = function(grunt) {

  //Variables que representan aspectos de la estructura de la aplicación
  var ANGULAR_MAIN_MODULE  = 'gp.findText',
      
      ANGULAR_TEMPLATES    = ['assets/views/**/*.html'],
      TEMPLATE_CACHE_DEST  = 'src/templates.js',
      
      WIREDEP_TEST_DEST    = 'karma.conf.js',

      JAVASCRIPT_ARRAY_SRC = ['src/**/*.js'],

      COVERAGE_URL = 'http://localhost:9001',
      COVERAGE_BASE = './test/coverage/report-html',

      FILES_FOR_WATCH = {
                          'JS'    : [ 'src/**/*.js','test/**/*.js'],
                          'GRUNT' : [ 'gruntfile.js' ]
                        },

      TASKS_WHEN_FILES_CHANGE = {
                                  'JS'    : [ 'shell:test' ],
                                  'GRUNT' : [ 'shell:test' ],
                                },
     
      // Tasks
      DEFAULT_TASKS        = [ 'jade',
                               'ngtemplates',
                               'inject:angularTemplate',
                               'wiredep',
                               'shell:test',
                               'watch'],

      COVERAGE_TASKS = [  'wiredep',
                          'shell:test',
                          'open:coverage',
                          'connect:coverage',
                          'watch'];

  //Cargar paquetes de grunt
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  //Generates a template for directive
  grunt.registerTask('inject:angularTemplate', 'Generate a template in angular module', function() {
    var srcFileContent = grunt.file.read('src/templates.js'),
        dstFileContent = grunt.file.read('src/angular-find-text.js');

    srcFileContent = '\n\t//directive:template\n\t' + srcFileContent + '\n\t\/\/endtemplate';
    dstFileContent = dstFileContent.replace(/(([\s\t]*)\/\/\s*directive:template*(\S*))(\n|\r|.)*?(\/\/\s*endtemplate)/gm, srcFileContent);

    grunt.file.write('src/angular-find-text.js', dstFileContent);

  });

  //Tareas de grunt
  grunt.registerTask('default', DEFAULT_TASKS);
  grunt.registerTask('coverage', COVERAGE_TASKS);


  //Configuracion de tareas
  grunt.initConfig({
    wiredep: {

      test: {
        devDependencies: true,
        src: WIREDEP_TEST_DEST,
        ignorePath:  /\.\.\//,
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },
    shell: {
      test: {
        command: 'karma start'
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: grunt.file.expandMapping(['**/*.jade'], 'assets/views/', {
          cwd: 'src',
          ext: '.html',
          rename: function(destBase, destPath) {
            return destBase + destPath.replace(/views\//, '');
          }
        })
      }
    },
    ngtemplates: {
      app: {
        src: ANGULAR_TEMPLATES,
        dest: TEMPLATE_CACHE_DEST,
        options: {
          module: ANGULAR_MAIN_MODULE,
          quotes: 'single',
          htmlmin: {
            collapseBooleanAttributes:      false,
            collapseWhitespace:             false,
            removeAttributeQuotes:          false,
            removeComments:                 true,
            removeEmptyAttributes:          false,
            removeRedundantAttributes:      false,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  false
          }
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: '.',
          open: false
        }
      },
      coverage: {
        options: {
          keepalive: true,
          port: 9001,
          base: COVERAGE_BASE ,
          open: false
        }
      }
    },
    watch: {

      js: {
        files: FILES_FOR_WATCH.JS,
        options: {livereload:true},
        tasks: TASKS_WHEN_FILES_CHANGE.JS
      },
      grunt: {
        files: FILES_FOR_WATCH.GRUNT,
        options: {livereload:true},
        tasks: TASKS_WHEN_FILES_CHANGE.GRUNT
      }
    },
    open: {
      coverage: {
        options: {delay: 1000},
        url: COVERAGE_URL,
        app: function() {
          return process.platform === "linux"? 'Chromium' : 'Google Chrome';
        }
      }
    },
  });
};