module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-auth.json'),
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/main.css': 'scss/main.scss'
        }
      }
    },
    aws_s3: {
      options: {
        accessKeyId: '<%= aws.key %>', // Use the variables
        secretAccessKey: '<%= aws.secret %>', // You can also use env variables
        region: '<%= aws.region %>',
        access: 'public-read',
        debug: false,
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
        options: {
          bucket: '<%= aws.bucket %>',
          //params: {
          //  ContentEncoding: 'gzip' // applies to all the files!
          //},
          differential: true // Only uploads the files that have changed
        },

        files: [
          {
            src: 'index.html',
            dest: 'index.html'
          },
          {
            expand: true,
            cwd: 'hello.js/src',
            src: ['**'],
            dest: 'hello.js/src'
          },
          {
            expand: true,
            cwd: 'hello.js/src/modules',
            src: ['**'],
            dest: 'hello.js/src/modules'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.registerTask('default', ['aws_s3']);
};
