<?php
	if (empty($_GET['callback']) === true) {
		exit("something is wrong");
	}
	$callback = $_GET['callback'];
	echo $callback.'({"name":"Daniel_Yen"});';
?>