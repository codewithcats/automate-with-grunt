module.exports = function(grunt) {
    var recursiveCopy;
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        copyFiles: {
            options: {
                workingDirectory: 'working',
                files: [
                    'index.html', 'css/', 'js/'    
                ]
            },
        }
    });
    grunt.registerTask('createWorkingDirectory', 'create working directory',  function() {
        grunt.config.requires('copyFiles.options.workingDirectory');
        grunt.file.mkdir(grunt.config.get('copyFiles.options.workingDirectory'));
    });
    grunt.registerTask('clean', 'remove working directory', function() {
        grunt.config.requires('copyFiles.options.workingDirectory');
        grunt.file['delete'](grunt.config.get('copyFiles.options.workingDirectory'));
    });
    recursiveCopy = function(src, dest) {
        if(grunt.file.isDir(src)) {
            grunt.file.recurse(src, function(file) {
                recursiveCopy(file, dest);
            });
        } else {
            grunt.log.writeln('Copying '+src+' to '+dest);
            grunt.file.copy(src, dest+'/'+src);
        }
    };
    grunt.registerTask('copyFiles', 'copy target files to working directory', function() {
        var files, workingDirectory, content;
        // grunt.config.requires('copyFiles.files');
        // grunt.config.requires('copyFiles.options.workingDirectory');
        this.requiresConfig(this.name + '.options.files');
        this.requiresConfig(this.name + '.options.workingDirectory');

        // files = grunt.config.get('copyFiles.files');
        // workingDirectory = grunt.config.get('copyFiles.options.workingDirectory');
        files = this.options().files;
        workingDirectory = this.options().workingDirectory;

        files.forEach(function(item) {
            recursiveCopy(item, workingDirectory);
        });

        content = '<%= pkg.name %> version <%= pkg.version %>';
        content = grunt.template.process(content);
        grunt.file.write(workingDirectory+'/version.txt', content);
    });
    grunt.registerTask('deploy', 'deploy files', ['clean', 'createWorkingDirectory', 'copyFiles']);
};
