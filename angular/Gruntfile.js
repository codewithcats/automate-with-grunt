module.exports = function(grunt) {
    grunt.config.init({
        build: {
            angular: {
                src: ['bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js'],
                dest: 'dist/angular.js'    
            }       
        }
    });
    grunt.registerMultiTask('build', 'Concatenate files', function() {
        var output;
        output = '';
        this.files.forEach(function(fileGroup) {
            var sources;
            sources = fileGroup.src.map(function(file) {
                return (grunt.file.read(file));
            });
            output = sources.join(';');
            grunt.file.write(fileGroup.dest, output);
        });
    });
};
