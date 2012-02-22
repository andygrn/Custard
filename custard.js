
/*

	Custard - A miniature javascript templating tool
	Andy Green
	http://andygrn.co.uk
	February 2012

*/

function CustardTemplate(string){

	this.options = {
		'tag_prefix' : 't'
	};

	this._compiledTemplate = this.compile(string);

};

// --- TOOLS ---

CustardTemplate.prototype.compile = function(string){

	return Function(this.options.tag_prefix, 'return [' + string + ']');

}

CustardTemplate.prototype.render = function(){

	return this._compiledTemplate(this).join('');

}


// --- HELPERS ---

CustardTemplate.prototype.getNested = function(inner){

	var buffer = [];
	
	if ( inner instanceof Array ) {
	
		for ( var i = 0; i < inner.length; ++i ) {
		
			buffer.push(inner[i]);
		
		}
	
	}
	else if ( typeof inner === 'string' ) {
	
		buffer.push(inner);
	
	}
	
	return buffer.join('');

}


// --- HANDLER HANDLERS ---

CustardTemplate.prototype.addHandlerSet = function(set){

	for ( handler in set ) {
		this[handler] = set[handler];
	}

}

CustardTemplate.prototype.addHandler = function(name, body){

	this[name] = body;

}

module.exports = CustardTemplate;
