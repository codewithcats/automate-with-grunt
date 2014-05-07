module.exports = function(grunt) {
    grunt.registerTask('default', function() {
        grunt.log.writeln('Hello from Grunt');
    });
    grunt.registerTask('greet', 'Let grunt say hello to you', function(name) {
        grunt.log.writeln('Hello, '+name);
    });
    grunt.registerTask('addNumbers', function(x, y) {
        if(isNaN(x) || isNaN(y)) {
            grunt.warn('argument must be a number');
        }
        var result = Number(x) + Number(y);
        grunt.log.writeln(x+'+'+y+'='+result);
    });
    grunt.registerTask('all', ['default', 'greet', 'addNumbers:1:2']);
};
