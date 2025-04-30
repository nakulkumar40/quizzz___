<?php
 
$host = "localhost";
$user = "root";
$password = "";
$dbname = "contact_db";
 
$conn = new mysqli($host, $user, $password, $dbname);
 
 
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
 
$name = mysqli_real_escape_string($conn, $_POST['name']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$subject = mysqli_real_escape_string($conn, $_POST['subject']);
$message = mysqli_real_escape_string($conn, $_POST['message']);
 
$sql = "INSERT INTO contacts (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";
 
if ($conn->query($sql) === TRUE) {
    echo "Message submitted successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
 
$conn->close();
?>
 
 