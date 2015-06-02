module.exports = function(grunt) {
	var config = {
		pkg : grunt.file.readJSON( 'package.json' ),

		uglify : {
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},

		watch: {
			script : {
				files : ['<%= uglify.build.src %>'],
				tasks : ['uglify']
			}
		}
	};

	grunt.initConfig( config );

	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
};