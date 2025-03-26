<?php 
$user_agent = $_SERVER['HTTP_USER_AGENT']; 
if (stripos( $user_agent, 'sqlmap') !== false)
{
    die("Hmm Hmm");
}
?>


<head>
 <title>Movie Rater</title>
 <link rel="stylesheet" href="/css/bootstrap.min.css"/>
</head>
