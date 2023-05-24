<html>
    <head>
    <title>Miley admin interface</title>
    </head>
    <body>
     <h1>Message : :::</h1>
     <button id="#random_button">click me</button>
     <p>
<?php
        echo "test";
    if($_SERVER['REMOTE_ADDR']=='172.13.37.40'){ //Only allowed for Miley Admin IP
        try{
            $bdd=new PDO('mysql:host=database;dbname=miley','miley','miley');
        }
        catch (Exception $e) {
                die('Erreur : ' . $e->getMessage());
        }

        $stmt = $bdd->prepare('SELECT * FROM messages LIMIT 1');
        // Execute the query
        $stmt->execute();
        // Fetch the result as an associative array
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        // Display the message content
        print_r($result);
        echo $result['message'];
        // Prepare the DELETE statement
        $stmt = $bdd->prepare('DELETE FROM messages WHERE id = :id');
        // Bind the parameter value to the placeholder
        $id = 1; // Replace with the ID of the message you want to delete
        $stmt->bindParam(':id', $result['id']);
        // Execute the query
        $stmt->execute();
   }
?>
</p>
<p>Powered by : Git, BootStrap, Centos, PHP and Miley</p>
</body>
</html>
