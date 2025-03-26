<?php 
 include ('static/bdd.php');
?>
 <html>
<head>
</head>
<body>
<center><h1>Movie Rater</h1></center>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <center> 
    <a class="navbar-brand" href="/the-admin-secure-interface/">Admin Index</a>
    <a class="navbar-brand" href="/the-admin-secure-interface/review_comment.php">Add Movie</a>
  </center>
</nav>


<?php
	$read = $bdd->prepare('select comment,movie_id from comments_to_be_reviewed where movie_id=:movie_id LIMIT 1');
	$read->execute(['movie_id' => $_GET['id']]);

	while($r=$read->fetch()){
?>
	<p><?php echo $r['comment']; ?></p>

<?php	
	$del=$bdd->exec("delete from comments_to_be_reviewed where movie_id='".$r['movie_id']."'");
	}
?>

</body>
</html>

