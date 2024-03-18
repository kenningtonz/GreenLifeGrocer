<?php

$category_name = $_POST["category_name"];

// $category_name = $_POST["category_name"];
// $upc = $_POST["upc"];
$product_name = "Pacifiers";
// $upc = "15000025144";

require_once("./easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getProduct($product_name, $upc);

header("Content-Type: application/json");

echo($data);


?>