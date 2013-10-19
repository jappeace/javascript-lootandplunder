
<html>
	<head>
		<title>Loot and Plunder</title>
		<script type="text/javascript" src="vendor/jquery-2.0.3.min.js"></script>
		<script type="text/javascript" src="vendor/kinetic-v4.7.2.min.js"></script>

		<script type="text/javascript" src="js/counter.js"></script>
		<script type="text/javascript" src="js/vector.js"></script>
		<script type="text/javascript" src="js/sprite-map.js"></script>
		
		<script type="text/javascript" src="js/lootandplunder-engine.js"></script>
		<script>
			<?=$_POST["map"];?>

			load_map(map);
		</script>
		
		
		<script type="text/javascript" src="js/debug.js"></script>
		<link rel="stylesheet" href="style/style.css" type="text/css" />
	</head>
	<body>
		<header><h1>Loot and Plunder</h1></header>
		<canvas id="game" width="800" height="600">
		</canvas>
	<footer>
	</footer>
	</body>
</html>
