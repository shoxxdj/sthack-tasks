<?php
if(!isset($_GET['id'])){
	die('no movie selected');
};
if(!preg_match("/^[0-9]{1,2}$/", $_GET['id']))
{
  die('<center><h1>Do not hack me !</h1></center>');
}
else{
 include('static/bdd.php');
 $q = "select max(id) as m_id from movies";
 $q=$bdd->query($q);

 $res = $q->fetch();
 if($_GET['id']>$res['m_id']){
  die('Unknown movie');
  }
  else{
    $query = "select name, picture, rating, id from movies where id=".$_GET['id']." limit 1";
    $q = $bdd->query($query);
    $res = $q->fetch();
    ?>
    <div class="container">
     <div class="row justify-content-md-center">
      <div class="col">
       <center><h2><?php echo $res['name']; ?></h2></center>
     </div>
   </div>
   <div class="row justify-content-md-center">
    <div class="col">
      <center><img src="<?php echo $res['picture']; ?>"/></center>
    </div>
  </div>
  </br>
  <div class="row justify-content-md-center">
    <div class="col">
     <center>Actual rating : <i><?php echo $res['rating']; ?></i> </center>
   </div>
  </div>
  </br>
  <div class="row justify-content-md-center">
    <div class="col">
        <center><p><b>Should we change the rate of this movie ? Tell us why !</b></p></center>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <center>
        <form  class="form" method="post" action="/change-rate.php?id=<?php echo $res['id']?>">
          <textarea class="form-control" name="comment"></textarea>
          </br>
          <input type="submit" class="btn btn-block"/>
        </form>
    </center>
     </div>
    </div>
  </div>
  </div>
  </div>

  <?php 
  }
}
?>
