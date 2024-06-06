<?php
// Database configuration
$hostname = 'mysql';
$username = 'admin';
$password = 'not_a_flag';
$database = 'messages';

try {
    // Create PDO instance
    $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

    // Set PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully";
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>