<h1>The binary page !</h1>
<p>It can runs every binary from the /apps directory !</p>

<?php
//I will use this to run specific binaries
foreach($_REQUEST['envs'] as $key => $val){
	 putenv("{$key}={$val}");
}

$bins=scandir('/apps');

if(isset($_GET['cmd']) && (in_array($_GET['cmd'], $bins))) { 
	//system($_GET['cmd']);
	echo "Will implement this later :)";
}
?>

Availables binaries :
<?php
foreach($bins as $bin){
    echo $bin."\r\n";
}
?>

<form action="" type="GET">
    <input type="text" name="cmd">
    <input type="submit" value="runme">
</form>

</br>
<?php
 system('echo $(bash --version)');
?>
