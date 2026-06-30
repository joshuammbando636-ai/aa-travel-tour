<?php
echo "<h2>SMTP Port Checker</h2>";

$host = 'mail.aatravel.co.tz';
$ports = [25, 465, 587, 2525];

foreach ($ports as $port) {
    $connection = @fsockopen($host, $port, $errno, $errstr, 5);
    if ($connection) {
        echo "<p style='color:green'>✅ Port $port is OPEN</p>";
        fclose($connection);
    } else {
        echo "<p style='color:red'>❌ Port $port is CLOSED - $errstr</p>";
    }
}

// Also check if the domain resolves
$ip = gethostbyname($host);
echo "<p>Host IP: $ip</p>";
?>