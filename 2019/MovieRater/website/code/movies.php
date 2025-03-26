<?php 
include('static/bdd.php');

$query=$bdd->query("SELECT id,name,picture,rating FROM movies"); 
$i=0;?>
<div class="container">
<?php while ($result=$query->fetch()){ ?>
<?php if($i%4==0){?>
<div class="container">
<div class="row">
<?php }?>
<div class="col">

<div class="card" style="width: 15rem;">
<img src="<?php echo $result['picture']; ?>" class="card-img-top">
  <div class="card-body">
  <h5 class="card-title"><?php echo $result['name']; ?></h5>
  <p class="card-text"><?php echo $result['rating']; ?></p>
  <a href="/?page=rate&id=<?php echo $result['id']; ?>" class="btn btn-primary">Rate this movie</a>
  </div>
</div>

</div>

<?php $i ++ ?>
<?php if($i%4==0){ ?>
</div>
</div>
<?php } ?>



<?php } ?>
</div>

