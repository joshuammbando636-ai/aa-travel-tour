<?php
header('Content-Type: application/json');

// This will show us EXACTLY what is being sent
$debug_file = 'debug_' . date('Y-m-d_H-i-s') . '.txt';
$debug_data = "=== FORM SUBMISSION ===\n";
$debug_data .= "Method: " . $_SERVER['REQUEST_METHOD'] . "\n";
$debug_data .= "POST data: " . print_r($_POST, true) . "\n";
$debug_data .= "GET data: " . print_r($_GET, true) . "\n";
$debug_data .= "Raw input: " . file_get_contents('php://input') . "\n";
file_put_contents($debug_file, $debug_data);

// Get data from POST or GET
$name = $_POST['name'] ?? $_GET['name'] ?? '';
$email = $_POST['email'] ?? $_GET['email'] ?? '';
$phone = $_POST['phone'] ?? $_GET['phone'] ?? '';
$interest = $_POST['interest'] ?? $_GET['interest'] ?? '';
$message = $_POST['message'] ?? $_GET['message'] ?? '';

// Return what we received
echo json_encode([
    'success' => true,
    'message' => 'Debug info saved',
    'received' => [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'interest' => $interest,
        'message' => $message,
        'post_data' => $_POST,
        'get_data' => $_GET
    ]
]);
?>