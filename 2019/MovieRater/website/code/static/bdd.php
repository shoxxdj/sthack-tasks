<?php

try {
	$bdd = new PDO('mysql:host=database;dbname=moviedb', 'user', 'user');
}
catch (Exception $e) {
        die('Erreur : ' . $e->getMessage());
}

?>
