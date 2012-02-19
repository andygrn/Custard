
	HTTP = require('http'),
	FS = require('fs'),
	CUSTARD = require('./custard');

	HTTP.createServer(function(request, response) {

	//	var file_list = ['picture.jpg', 'document.doc', 'webpage.html'];
		var input = {
			title : 'Welcome to Bacon World!',
			bacon : true,
			suppliers : ['picture.jpg', 'document.doc', 'webpage.html']
		}
		
	//	CUSTARD.generate('directory_listing', { 'files': file_list, 'directory_name': request.url }, function(error, template){
		CUSTARD.generate('bacon', input, function(error, template){
		
			if ( error ) {
			
				response.writeHead(500);
				response.end();
			
			}
			else {
			
				headers = {
				
					'Content-Type': 'text/html',
					'Content-Length' : template.length
				
				};
				
				response.writeHead(200, headers);
				response.end(template);
			
			}
		
		});

	}).listen(666, '127.0.0.1');