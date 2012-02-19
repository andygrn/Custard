<!DOCTYPE html>
<html>
	<head>
		<title>#[title]</title>
	</head>
	<body>
%	if ( bacon ) {
		<h1>Bacon is available!</h1>
		<h2>Suppliers</h2>
		<ul>
%		for ( var i = 0, supplier; supplier = suppliers[i]; ++i ) {
			<li>#[supplier]</li>
%		}
		</ul>
%	}
%	else {
		<h1>Bacon is unavailable</h1>
%	}
	</body>
</html>