<html>
<?php
 $message = "";
 if(isset($_GET['page'])){
    if(strlen($_GET['page'])<18){
        include($_GET['page']);
    }else{
        echo 'No no no the goal of this chall is not to use the magic include payload :)';
    }
 }
 else{
    include('../includes/db.php');
    if(isset($_GET['id']) && $_GET['id']!=''){
        $stmt = $conn->prepare("SELECT message FROM datas WHERE id=:id LIMIT 1");
        $stmt->execute(['id' => $_GET['id']]); 
        $message = $stmt->fetch();
        if($message){
            $message = $message['message'];
            $stmt = $conn->prepare("DELETE FROM datas WHERE id=:id");
            $stmt->execute(['id' => $_GET['id']]);
        }
        else{
            die('error');
        }
    }
 }
?>
    <head>
        <title>Admin Zone</title>
            <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        #container {
            text-align: center;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            max-width: 80%;
            width: 400px;
        }
        textarea {
            width: 100%;
            height: 200px;
            padding: 10px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: none;
            font-family: 'Courier New', Courier, monospace;
            font-size: 14px;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
        }
    </style>
    </head>
    <body>
        <div id="container">
            <p>Message from an user : </p>
            <?php echo "<p>$message</p>"; ?>
            <button>Send Rocket to user</button>
            <button>Send Flowers to user</button>
        </div>
    </body>
    <footer>
        <ul>
            <li><a href="/admin/index.php?page=manual.php">manual</a></li>
            <li><a href="/admin/index.php?page=contact.php">contact</a></li>
            <li><a href="/admin/index.php?page=phpinfo.php">server info</a></li>
        </ul>
    </footer>
</html>