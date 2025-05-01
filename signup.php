<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "contact_db";

// Connect to the database
$conn = new mysqli($host, $user, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if all expected fields exist
    if (isset($_POST['name'], $_POST['email'], $_POST['password'], $_POST['confirm_password'], $_POST['terms'])) {

        // Escape input values to prevent SQL injection
        $name = mysqli_real_escape_string($conn, $_POST['name']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $password = $_POST['password'];
        $confirmPassword = $_POST['confirm_password'];

        // Check if passwords match
        if ($password !== $confirmPassword) {
            die("Error: Passwords do not match.");
        }

        // Hash the password before storing it
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert the new user into the database
        $sql = "INSERT INTO signup (name, email, password) 
                VALUES ('$name', '$email', '$hashedPassword')";

        if ($conn->query($sql) === TRUE) {
            echo "Signup successfully created!";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

    } else {
        echo "Error: One or more form fields are missing.";
    }
} else {
    echo "Invalid request.";
}

$conn->close();
?>
