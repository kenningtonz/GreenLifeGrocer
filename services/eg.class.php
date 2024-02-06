<?php

class EasyGroceries
{
    public $dbo = "";

    public function __construct($db)
    {
        $this->dbo = $db;
    }


    public function getCategories()
    {

        $error_code = "0";
        $error_message = "";

        $query = "SELECT id, name 
    FROM ea_category
    ORDER BY name ";

        foreach ($this->dbo->query($query) as $row) {
            $id = $row[0];
            $name = stripslashes($row[1]);

            $category["id"] = $id;
            $category["name"] = $name;

            $categories[] = $category;
        }

    }

}

?>