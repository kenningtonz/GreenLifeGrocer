<?php

$name = $_POST["name"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

// $new_message = "$name from $email has requested info on $subject";
// $new_message .= " and here is what they had to say\r\n\r\n\r\n$message";

$new_message = "<html>
<head>
<style type=\"text/css\">
/* OUTSET STYLE */
table {
border: solid 1px #000;
}

table td {
border: solid 5px red;
border-top-color: #B22222;
border-right-color: #FEB9B9;
border-bottom-color: #FEB9B9;
border-left-color: #B22222;
}
.cellpadding {
    padding: 1.0rem;
}
</style>
</head>
<body>
<table>
<tr>
  <th>Name</th>
  <th>Email</th>
  <th>Subject</th>
  <th>Message</th>
</tr>
<tr>
  <td cellpadding=\"2px\">$name</td>
  <td class=\"cellpadding\">$email</td>
  <td>$subject</td>
  <td>$message</td>
  <td><img src=\"https://game.netmarks.ca/images/1/one.png\"></td>
</tr>
</table> 
</body>
";


//echo($new_message);


// send the email

$to = 'ray@netmarks.ca';
$subject1 = "NEW CONTACT $name";
//$new_message = 'hello';
// $headers = 'From: ray@netmarks.ca' . "\r\n" .
//     'Reply-To: ray@netmarks.ca' . "\r\n" .
//     'X-Mailer: PHP/' . phpversion();

// To send HTML mail, the Content-type header must be set
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = 'To: $to';
$headers[] = 'From: ray@netmarks.ca';

if (mail($to, $subject1, $new_message, implode("\r\n", $headers))) {
    $data["error_id"] = 0;
} else {
    $data["error_id"] = 1;
}

$data = json_encode($data);


header("Content-Type: application/json");

echo $data;


?>