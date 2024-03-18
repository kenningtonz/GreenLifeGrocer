<?php

$category_name = $_POST["category_name"];

// $category_name = $_POST["category_name"];
$category_name = "BabyFoodAndSupplies";

require_once("./easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getProducts($category_name);

header("Content-Type: application/json");

echo($data);


?>