
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
			
				var template = new custard(),
					css = 'body{color:#333; font-family:Arial, Helvetica, sans-serif; text-align:center;}';
				
//				Set Custard to use the HTML tag set
				template.addTagSet('h', require('./tags/html'));
				
//				Add a custom tag set
				template.addTagSet('content', {
				
					'title' : 'Page title!',
					'paragraph1' : 'Paragraph 1 content',
					'paragraph2' : 'Paragraph 2 content',
					
					'superEmphasise' : function(text){
						return text.toUpperCase() + '!!!';
					}
				
				});
				
//				Add a single tag to a new set
				template.addTagToSet('extras', 'getHead', function(){
					var html_head = [
						'<link rel="icon" type="image/png" href="favicon.png">',
						'<style type="text/css">',
						css,
						'</style>'
					];
					return html_head.join('');
				});
				
				template.render(data, function(error, html){
				
					if ( error ) {
					
						response.writeHead(500);
						response.end('<pre>' + error.stack + '</pre>');
					
					}
					else {
					
						response.writeHead(200, {
							'Content-Type': 'text/html',
							'Content-Length' : html.length
						});
						
						response.end(html);
					
					}
				
				});
			
			}
		
		});
	
	}

}).listen(666, '127.0.0.1');