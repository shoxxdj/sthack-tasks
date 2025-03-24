<?php 
if(defined('page_with_include')){
	die(0);
}


$user_agent = $_SERVER['HTTP_USER_AGENT']; 
if (stripos( $user_agent, 'sqlmap') !== false)
{
    die("Hmm Hmm");
}
?>

<?php

try {
	$bdd = new PDO('mysql:host=database;dbname=moviedb', 'admin', 'admin');
}
catch (Exception $e) {
        die('Erreur : ' . $e->getMessage());
}

?>
