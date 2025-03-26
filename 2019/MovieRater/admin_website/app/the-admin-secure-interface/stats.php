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
    <a class="navbar-brand" href="/the-admin-secure-interface/stats.php">Get Stats</a>
  </center>
</nav>

<?php if(isset($_GET['stats_id'])){?>
	<?php 
	$req = $bdd->query("select name,rating from movies where id='".$_GET['stats_id']."'");
	$res = $req->fetch();
	print_r($res);
	?>
<?php } else { ?>
	<ul>
	<?php 
	$req = $bdd->query('select name,id from movies');
	while($res = $req->fetch()){?>
		<li><a href="/the-admin-secure-interface/stats.php?stats_id=<?php echo $res['id'] ?>"><?php echo $res['name'] ?></a></li>
	<?php }
} ?> 
</body>
</html>

