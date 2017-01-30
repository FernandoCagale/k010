module.exports = function(grunt) { 

	grunt.initConfig({ 
		copy: { 
			project: { 
				expand: true, cwd: '.', 
				src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'], 
				dest: 'dist' 
			} 
		}, 
		clean: { 
			dist: { 
				src: 'dist' 
			} 
		},
		usemin : { 
			html: 'dist/app/**/*.html' 
		}, 
		useminPrepare: { 
			options: { 
				root: 'dist/app', 
				dest: 'dist/app' 
			}, 
			html: 'dist/app/**/*.html' 
		},
		ngAnnotate: { 
			scripts: { 
				expand: true, 
				src: ['dist/app/src/**/*.js'] 
			} 
		}

	});

	grunt.registerTask('default', ['dist', 'minifica']);
	grunt.registerTask('dist', ['clean', 'copy']);	
	grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'usemin']);

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat'); 
	grunt.loadNpmTasks('grunt-contrib-uglify'); 
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-ng-annotate');

}