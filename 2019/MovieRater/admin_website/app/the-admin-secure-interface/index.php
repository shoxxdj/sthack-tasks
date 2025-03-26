<?php include('static/head.php'); ?>
<body>
<center><h1>Movie Rater</h1></center>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <center> 
  	
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
    	<span class="navbar-brand">Movie Rater</span>
      <a class="nav-item nav-link" href="/">Home</a>
      <a class="nav-item nav-link" href="/?page=movies">Movies</a>
    </div>
  </div>


    
    

</nav>
<?php define('page_with_include',true); ?>
<?php if(isset($_GET['page'])){include($_GET['page'].'.php');}else{?>
</br>
<center>
	<p><h2>An application to rate movies</h2></p>
	<p>Hackers movie are mostly bullshit movies.</p>
	<p>This application has been made by awsome web developers</p>
</center>
<?php } ?>
</body>
<?php include('static/foot.php');?>
