<?php
header('Content-Type: application/json');

// Get posted data
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Path to credentials file
$credentialsFile = 'credentials.txt';

// Check if file exists
if (!file_exists($credentialsFile)) {
    echo json_encode(['success' => false, 'message' => 'Login system not configured']);
    exit;
}

// Read credentials file
$lines = file($credentialsFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$validCredentials = false;

foreach ($lines as $line) {
    // Split line into username and password (assuming format: username:password)
    $parts = explode(':', $line, 2);
    if (count($parts) === 2) {
        $storedUsername = trim($parts[0]);
        $storedPassword = trim($parts[1]);
        
        if ($username === $storedUsername && $password === $storedPassword) {
            $validCredentials = true;
            break;
        }
    }
}

if ($validCredentials) {
    echo json_encode(['success' => true, 'message' => 'Login successful!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
?>