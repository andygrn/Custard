<!DOCTYPE html>
<html>
	<head>
		<title>Index of #[directory_name]</title>
	</head>
	<body>
		<h1>Index of #[directory_name]</h1>
		<ul>
%		for ( var i = 0, file; file = files[i]; ++i ) {
			<li><a href="#[directory_name]/#[file]">#[file]</a></li>
%		}
		</ul>
	</body>
</html>