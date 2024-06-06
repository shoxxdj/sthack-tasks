<?php

    include('includes/db.php');

    $res = "";

    function generateRandomString($length = 32) {
        // Generate random bytes
        $bytes = random_bytes($length);

        // Convert random bytes to a string using base64 encoding
        return base64_encode($bytes);
    }

    if(isset($_POST['message']) && $_POST['message']!=""){


        // if(!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])) {
        //     $res='reCAPTHCA verification failed, please try again.';
        // } else {
        //    $secret = ''; // Google Recpatcha Secret for prodution only :) 

            // $ch = curl_init();
            // curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
            // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            // $response = curl_exec($ch);
            // curl_close($ch);
            // $response = json_decode($response);

            // if($response->success) {
            
                // What happens when the CAPTCHA was entered incorrectly
                $id = time().rand(1,100000000000);
                $id = $id.generateRandomString();
                $id = hash('sha512',$id);
                // Prepare INSERT statement
                $stmt = $conn->prepare("INSERT into datas(id,message) VALUES (:id,:message)");

                // Bind parameters
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':message', $_POST['message']);

                // Execute the prepared statement
                $stmt->execute();
                
                //Trig bot as it's a CTF task
                $redis = new Redis();
                $redis->connect('redis', 6379); 
                $channel = 'messages';
                $message = "$id";
                $redis->publish($channel, $message);
                $redis->close();

                $res = "Message sent thank you !";
            // } else {
            //     // Your code here to handle a successful verification
            //     $res = "reCAPTHCA verification failed, please try again.";
            // }
        //}

    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACME Reclamation Center</title>
    <!-- <script src='https://www.google.com/recaptcha/api.js' async defer ></script> -->
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
                body, html {
            height: 100%;
            margin: 0;
        }
        .video-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1; /* Make sure the video stays behind the content */
        }
        .video-background iframe {
            width: 100%;
            height: 100%;
            pointer-events: none; /* Make sure the video is not interactable */
        }
    </style>
</head>
<body>
    <div class="video-background">
        <iframe src="https://www.youtube.com/embed/v-xrnIXQ3iQ?autoplay=1&mute=1&loop=1&playlist=v-xrnIXQ3iQ&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <div id="container">
        <h1>ACME Reclamation Center</h1>
        <i>Not happy with our products ? Send us a message we will read it as soon as possible! Sincerely C&M</i>
        <u><?= $res ?></u>
        <form action="/" method="POST">
            <textarea name="message" cols="30" rows="10"></textarea>
            <button type="submit">save</button>
        <!--    <div class="g-recaptcha" data-sitekey="6LcTOeApAAAAAP4X2eBzKCUq9aye78TXYDq31V8S"></div> -->
        </form>
    </div>
</body>
</html>