<?php

require_once("./easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getCategories();

header("Content-Type: application/json");

echo($data);


?>