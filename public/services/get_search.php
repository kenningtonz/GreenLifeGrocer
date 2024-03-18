<?php

// $search = $_POST["search"];
$search = "Baby food";

require_once("./easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getSearch($search);

header("Content-Type: application/json");

echo($data);


?>