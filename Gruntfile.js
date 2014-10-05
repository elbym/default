/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "js/site.min.js": ["js/site.js"]
        }
      }
    },

    // compass: {
    //   global: {
    //     options: {
    //       // style: "compressed"
    //       cssPath: "css",
    //       sassPath: "scss"
    //     },
    //     files: {
    //       "css/global-unprefixed.css": "scss/global.scss"
    //     }
    //   }
    // },

    compass: {
      dev: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },

    // autoprefixer: {
    //   global: {
    //     src: "css/global-unprefixed.css",
    //     dest: "css/global.css"
    //   }
    // },

    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl="
      },
      jekyllBuild: {
        command: "jekyll build --config _config-dev.yml"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ["index.html", "writing.html", "about.html", "_layouts/*.html", "_posts/*.md", "_projects/*.md", "_includes/*.html"],
        tasks: ["shell:jekyllBuild"]
      },
      js: {
        files: ["js/*.js"],
        tasks: ["uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["scss/*.scss"],
        tasks: ["compass", /*"autoprefixer",*/ "shell:jekyllBuild"]
      },
      svgIcons: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },

    svgstore: {
      options: {
        prefix : "shape-",
        cleanup: false,
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "_includes/svg-defs.svg": ["svg/*.svg"]
        }
      }
    }

  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("serve", ["shell:jekyllServe"]);
  grunt.registerTask("default", ["compass", /*"autoprefixer",*/ "svgstore", "shell:jekyllBuild", "watch"]);

};
