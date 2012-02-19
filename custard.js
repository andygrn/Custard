
/*

	Custard - A miniature javascript templating tool
	Andy Green
	http://andygrn.co.uk
	February 2012

*/

var PATH = require('path'),
	FS = require('fs');

module.exports = {

	template_directory : 'templates/',
	template_suffix : '.js',
	template_cache : 'templates/cache/',
	caching_enabled : false,
	
	generate : function ( template_name, inputs, callback ) {
	
		var path_true = this.template_directory + template_name + this.template_suffix,
			path_cache = this.template_cache + template_name + this.template_suffix,
			_self = this;
		
//		Check for cached prelexed template
		PATH.exists(path_cache, function(exists){
		
			if ( exists && _self.caching_enabled ) {
			
//				Render and return cached prelexed template
				FS.readFile(path_cache, 'utf8', function(error, template){
				
					if ( error ) {
					
						callback(error);
					
					}
					else {
					
						_self.render(template, inputs, function(error, output){
						
							callback(error, output);
						
						});
					
					}
				
				});
			
			}
			else {
			
//				Get unlexed file
				FS.readFile(path_true, 'utf8', function(error, data){
				
					if ( error ) {
					
						callback(error);
					
					}
					else {
					
//						Lex and return template
						_self.lex(data, function(template){
						
							if ( _self.caching_enabled ) {
							
								FS.open(path_cache, 'w', function(error, file){
								
									if ( error ) {
									
										callback(error);
									
									}
									else {
									
										FS.write(file, template); // Save cached version
										
										_self.render(template, inputs, function(error, output){
										
											callback(error, output);
										
										});
									
									}
								
								});
							
							}
							else {
							
								_self.render(template, inputs, function(error, output){
								
									if ( error ) {
									
										_self.generate('custard_error', { 'error_message' : error.toString() }, function(error, output){
										
											callback(error, output);
										
										});
									
									}
									else {
									
										callback(error, output);
									
									}
								
								});
							
							}
						
						});
					
					}
				
				});
			
			}
		
		});
	
	},
	
	
	lex : function ( string, callback ) {
	
		var tokens = 'try{',
			lines = string.replace(/[\r]+/g, '').split('\n'); // Remove windows carriage returns and split string into array of lines
		
		for ( var i = 0, line; line = lines[i]; ++i ) {
		
			if ( line.charAt(0) === '%' ) {
			
				tokens += line.slice(1).trim();
			
			}
			else {
			
				line = line.replace(/"/g, '\\"'); // Escape quotes
				line = line.replace(/#\[([a-z_]+)\]/g, function(match, submatch){
				
					return '"+' + submatch + '+"'; // Replace tags with values
				
				});
				
				tokens += 'this.push("' + line + '");';
			
			}
		
		}
		
		tokens += 'return false;}catch(e){return e;}';
		
		callback(tokens);
	
	},
	
	render : function ( template, inputs, callback ) {
	
		var input_keys = [],
			input_values = [],
			buffer = [];
		
		for ( var input in inputs ) {
		
			input_keys.push(input);
			input_values.push(inputs[input]);
		
		}
		
		var renderer = new Function(input_keys.join(','), template),
			error = renderer.apply(buffer, input_values);
		
		if ( error ) { // Error
		
			callback(error);
		
		}
		else {
		
			callback(null, buffer.join('\n'));
		
		}
	
	}

}