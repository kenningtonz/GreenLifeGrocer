<?php

// $search = $_POST["search"];
$search = "Baby Food And Supplies";

require_once("./easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getHints($search);

header("Content-Type: application/json");

echo($data);


?>