<html>
    <head>
        <title>Miley</title>
<!--        <script src="https://www.google.com/recaptcha/api.js" async defer></script> -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <style>
            .bg-image {
                background-image: url('https://i.pinimg.com/originals/3a/97/39/3a973995e81b806c75ce8ad721882801.jpg');
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
            }
        </style>
    </head>

    <body class="bg-image">
    
    <?php
if(isset($_POST['message'])){// && isset($_POST['g-recaptcha-response'])){
		  // Original Challenge was given with a captcha, only used to prevent stupid bruteforce.
//                $recaptcha_response = $_POST['g-recaptcha-response'];
//                $secret_key = "";
//                $url = 'https://www.google.com/recaptcha/api/siteverify';

//                $data = array(
//                    'secret' => $secret_key,
//                    'response' => $recaptcha_response
//                );

//                $options = array(
//                    'http' => array (
//                        'method' => 'POST',
//                        'header' => 'Content-Type: application/x-www-form-urlencoded',
//                        'content' => http_build_query($data)
//                    )
//                );

//                $context  = stream_context_create($options);
//                $result = file_get_contents($url, false, $context);
//                $response = json_decode($result);

//                if ($response->success == true) {
                    // reCAPTCHA validation successful, process the form
                    try{
                        $bdd=new PDO('mysql:host=database;dbname=miley','miley','miley');
                    }
                    catch (Exception $e) {
                            die('Erreur : ' . $e->getMessage());
                    }

                    $req = $bdd->prepare("INSERT INTO messages (message) VALUES (:message)");
                    //add filter to escape SQLi
                    $req->bindParam(':message',$_POST['message']);
                    $req->execute();
                    echo "Miley will read your message soon";

                    $redis = new Redis(); 
                    $redis->connect('redis', 6379);

                    $channel = 'new_messages';
                    $message = 'readme';
                    $redis->publish($channel, $message); 
//                } else {
//                    echo "Wrong Captcha !";
//                }
            
        }else{
    ?>
    <div class="container">
        <div class="row">
            <center>Hi ! I'm Miley And ...</center>
            <center><h2>I dont wan't your flowers !</h2></center>
            <center>Leave me a message, and I will read it as soon as possible</center>
            <center>
            <form class="form" action="/" method="post">
            <textarea rows=20 class="form-control" name="message"></textarea>
            </br><!-- Dont talk CSS with me -->
            <center>Captcha removed, however no bruteforce is needed</center>
            <div class="g-recaptcha" data-sitekey=""></div>
            </br>
            <input class="btn btn-success btn-lg" type="submit" value="send message"/>
            </form>
        </center>
        
        </div>
    </div>
    <?php } ?>
    </body>
</html>
