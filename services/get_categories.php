<?php

require_once 'eg.class.php';

$oEasyGroceries = new EasyGroceries($db);

$data = $oEasyGroceries->getCategories();

?>