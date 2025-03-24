<?php include 'static/head.php'; ?> 

<body>
    <center><h1>Movie Rater</h1></center>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <center> 
    <a class="navbar-brand" href="/">Home</a>
    <a class="navbar-brand" href="/?page=movies">Movies</a>
  </center>
</nav>
    <center><h2>

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

    function uuid(){
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40); 
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80); 
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    function movieId($id){
        $uuid=uuid();
        return $uuid."-".$id;
    }


    $req = $bdd->prepare("INSERT INTO comments_to_be_reviewed (movie_id,comment) VALUES (:id,:comment)");
    $id = movieId(intval($_GET['id']));
    $req->bindParam(':id',$id);
    
    //add filter to escape SQLi
    $req->bindParam(':comment',$_POST['comment']);
    $req->execute();
  	echo "Your comment is under review by an administrator";
  }
}

?>

</h2></center></body>

<?php include 'static/foot.php'; ?> 