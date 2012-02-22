
/*

	Custard local testing server
	

*/

var http = require('http'),
	fs = require('fs'),
	custard = require('./custard');

http.createServer(function(request, response) {

	if ( request.url === '/favicon.ico' ) {
	
		response.writeHead(500);
		response.end();
	
	}
	else {
	
		fs.readFile('templates/homepage.js', 'utf8', function(error, data){

			if ( error ) {
			
				response.writeHead(500);
				response.end(error.toString());
			
			}
			else {
			
				var template = new custard(data),
					css = 'body{color:#333; font-family:Arial, Helvetica, sans-serif; text-align:center;}',
					html_head = [
						'<link rel="icon" type="image/png" href="favicon.png">',
						'<style type="text/css">',
						css,
						'</style>'
					];
				
//				Set Custard to use the HTML handlers set
				template.addHandlerSet(require('./handlers/html'));
				
//				Add a couple of custom handlers before rendering
				template.addHandler('superEmphasise', function(text){
					return text.toUpperCase() + '!!!';
				});
				
				template.addHandler('getHead', function(){
					return html_head.join('');
				});
				
				var html = template.render();
				
				response.writeHead(200, {
					'Content-Type': 'text/html',
					'Content-Length' : html.length
				});
				
				response.end(html);
			
			}

		});
	
	}

}).listen(666, '127.0.0.1');