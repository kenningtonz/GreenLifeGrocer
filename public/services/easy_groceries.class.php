<?php

class EasyGroceries {

    public $dbo = "";
    public $province = "";
    public $day = "";

    public function __construct () {
        require_once("./inc/connect_pdo.php");
        $this->dbo = $dbo;
    }


    public function convertFancyQuotes ($str) {
        return str_replace(array(chr(145),chr(146),chr(147),chr(148),chr(151)),array("'","'",'"','"','-'),$str);
    }

    
    public function getCategories () {
        
        $error_code = "0";
        $error_message = "";

        try {
            $query = "SELECT id, name
            FROM ea_category
            ORDER BY name ";

            foreach ($this->dbo->query($query) as $row) {
                $id = $row[0];
                $name = $this->convertFancyQuotes(stripslashes($row[1]));
                $url = str_replace(" ","",$name);

                $category["id"] = $id;
                $category["name"] = $name;
                $category["url"] = $url;

                $categories[] = $category;
            }

        } catch (PDOException $e) {
            $error_code = "1";
            $error_message = "PDOException for getCategories. $e";
        }

        $error["id"] = $error_code;
        $error["error_message"] = $error_message;
        
        $data["error"] = $error;
        $data["categories"] = $categories;
        $data["query"] = str_replace("\n"," ",$query);
        
        $data = json_encode($data);

        return $data;
    }

    public function getHints ($search) {
        
        $error_code = "0";
        $error_message = "";

        try {

            $words = explode(' ', trim($search));
            $regex = implode('|', $words);

            $query1 = "SELECT ea_product.brand, ea_product.product_name, ea_category.name
            FROM ea_product, ea_category
            WHERE ea_product.category_id = ea_category.id
            AND (ea_product.upc REGEXP '{$regex}'
            OR ea_product.brand REGEXP '{$regex}'
            OR ea_category.name REGEXP '{$regex}'
            OR ea_product.product_name REGEXP '{$regex}')
            ORDER BY ea_product.avg_price 
            LIMIT 0, 10 ";

            foreach ($this->dbo->query($query1) as $row) {
                $brand = $this->convertFancyQuotes(stripslashes($row[0]));
                $product_name = $this->convertFancyQuotes(stripslashes($row[1]));
                $category_name = $this->convertFancyQuotes(stripslashes($row[2]));

                $product["$brand"] = $brand;
                $product["$category_name"] = $category_name;
                $product["$product_name"] = $product_name;

            }
            
            // reduce array length
            array_splice($product, 10);
            $x = 0;
            foreach($product as $value) {
                $products[$x] = "$value";
                ++$x;
            }

            if (empty($search)) {
                $error_code = "-1";
                $error_message = "Nothing Searched on.";
            } else {
                if (count($products) == 0) {
                    $error_code = "-2";
                    $error_message = "The Searchs for found.";
                }
            }

            

        } catch (PDOException $e) {
            $error_code = "1";
            $error_message = "PDOException for getCategories. $e";
        }

        $error["id"] = $error_code;
        $error["error_message"] = $error_message;
        
        $data["error"] = $error;
        $data["products"] = $products;
        $data["query"] = str_replace("\n"," ",$query);
        $data["query1"] = str_replace("\n"," ",$query1);
        
        $data = json_encode($data);

        return $data;
    }

    public function getSearch ($search) {
        
        $error_code = "0";
        $error_message = "";

        try {

            $words = explode(' ', trim($search));
            $regex = implode('|', $words);

            $query1 = "SELECT ea_product.id, ea_product.upc, ea_product.family_id, 
            ea_product.brand, ea_product.product_name, 
            ea_product.product_description, ea_product.avg_price, 
            ea_product.taxable, ea_product.unit, ea_product.stars
            FROM ea_product
            WHERE (ea_product.upc REGEXP '{$regex}'
            OR ea_product.brand REGEXP '{$regex}'
            OR ea_product.product_name REGEXP '{$regex}')
            ORDER BY ea_product.avg_price ";

            foreach ($this->dbo->query($query1) as $row) {
                $id = $row[0];
                $upc = $this->convertFancyQuotes(stripslashes($row[1]));
                $family_id = $this->convertFancyQuotes(stripslashes($row[2]));
                $brand = $this->convertFancyQuotes(stripslashes($row[3]));
                $product_name = $this->convertFancyQuotes(stripslashes($row[4]));
                $product_description = $this->convertFancyQuotes(stripslashes($row[5]));
                $avg_price = $this->convertFancyQuotes(stripslashes($row[6]));
                $taxable = $this->convertFancyQuotes(stripslashes($row[7]));
                $unit = $this->convertFancyQuotes(stripslashes($row[8]));
                $stars = $this->convertFancyQuotes(stripslashes($row[9]));
                $category_name = $this->convertFancyQuotes(stripslashes($row[10]));
                $category_url = str_replace(" ","",$category_name);
                $url = str_replace(" ","",$product_name);


                $product["id"] = $id;
                $product["product_name"] = $product_name;
                $product["family_id"] = $family_id;
                $product["brand"] = $brand;
                $product["upc"] = $upc;
                $product["product_description"] = $product_description;
                $product["avg_price"] = $avg_price;
                $product["taxable"] = $taxable;
                $product["unit"] = $unit;
                $product["stars"] = $stars;
                $product["category_name"] = $category_name;
                $product["category_url"] = $category_url;
                $product["url"] = $url;

                $products[] = $product;

            }
            
            

            if (empty($search)) {
                $error_code = "-1";
                $error_message = "Nothing Searched on.";
            } else {
                if (count($products) == 0) {
                    $error_code = "-2";
                    $error_message = "The Searchs for found.";
                }
            }

            

        } catch (PDOException $e) {
            $error_code = "1";
            $error_message = "PDOException for getCategories. $e";
        }

        $error["id"] = $error_code;
        $error["error_message"] = $error_message;
        
        $data["error"] = $error;
        $data["products"] = $products;
        $data["query"] = str_replace("\n"," ",$query);
        $data["query1"] = str_replace("\n"," ",$query1);
        
        $data = json_encode($data);

        return $data;
    }


    public function getProducts ($category_name) {
        
        $error_code = "0";
        $error_message = "";

        try {

            // $query = "SELECT id
            // FROM ea_category
            // WHERE REPLACE(name, ' ', '') LIKE '$category_name' ";
            // foreach ($this->dbo->query($query) as $row) {
            //     $category_id = $row[0];
            // }

            // $query1 = "SELECT id, upc, family_id, brand, product_name, 
            // product_description, avg_price, taxable, unit, stars
            // FROM ea_product
            // WHERE category_id = '$category_id' 
            // ORDER BY avg_price ";

            $query1 = "SELECT ea_product.id, ea_product.upc, ea_product.family_id, 
            ea_product.brand, ea_product.product_name, 
            ea_product.product_description, ea_product.avg_price, 
            ea_product.taxable, ea_product.unit, ea_product.stars, 
            ea_category.name
            FROM ea_product, ea_category
            WHERE ea_product.category_id = ea_category.id
            AND REPLACE(ea_category.name, ' ', '') LIKE '$category_name' 
            ORDER BY ea_product.avg_price ";

            foreach ($this->dbo->query($query1) as $row) {
                $id = $row[0];
                $upc = $this->convertFancyQuotes(stripslashes($row[1]));
                $family_id = $this->convertFancyQuotes(stripslashes($row[2]));
                $brand = $this->convertFancyQuotes(stripslashes($row[3]));
                $product_name = $this->convertFancyQuotes(stripslashes($row[4]));
                $product_description = $this->convertFancyQuotes(stripslashes($row[5]));
                $avg_price = $this->convertFancyQuotes(stripslashes($row[6]));
                $taxable = $this->convertFancyQuotes(stripslashes($row[7]));
                $unit = $this->convertFancyQuotes(stripslashes($row[8]));
                $stars = $this->convertFancyQuotes(stripslashes($row[9]));
                $category_name = $this->convertFancyQuotes(stripslashes($row[10]));
                $category_url = str_replace(" ","",$category_name);
                $url = str_replace(" ","",$product_name);


                $product["id"] = $id;
                $product["product_name"] = $product_name;
                $product["family_id"] = $family_id;
                $product["brand"] = $brand;
                $product["upc"] = $upc;
                $product["product_description"] = $product_description;
                $product["avg_price"] = $avg_price;
                $product["taxable"] = $taxable;
                $product["unit"] = $unit;
                $product["stars"] = $stars;
                $product["category_name"] = $category_name;
                $product["category_url"] = $category_url;
                $product["url"] = $url;

                $products[] = $product;
            }



            if (empty($url)) {
                $error_code = "-1";
                $error_message = "The Category does not exist";
            } else {
                if (count($products) == 0) {
                    $error_code = "-2";
                    $error_message = "The Products for this Category";
                }
            }

            

        } catch (PDOException $e) {
            $error_code = "1";
            $error_message = "PDOException for getCategories. $e";
        }

        $error["id"] = $error_code;
        $error["error_message"] = $error_message;
        
        $data["error"] = $error;
        $data["products"] = $products;
        $data["query"] = str_replace("\n"," ",$query);
        $data["query1"] = str_replace("\n"," ",$query1);
        
        $data = json_encode($data);

        return $data;
    }
    public function getProduct ($product_name, $upc) {
        
        $error_code = "0";
        $error_message = "";

        try {

            if (empty($upc)) {
                $query1 = "SELECT ea_product.id, ea_product.upc, ea_product.family_id, 
                ea_product.brand, ea_product.product_name, 
                ea_product.product_description, ea_product.avg_price, 
                ea_product.taxable, ea_product.unit, ea_product.stars, 
                ea_category.name
                FROM ea_product, ea_category
                WHERE ea_product.category_id = ea_category.id
                AND REPLACE(ea_product.product_name, ' ', '') LIKE '$product_name' ";
            } else {
                $query1 = "SELECT ea_product.id, ea_product.upc, ea_product.family_id, 
                ea_product.brand, ea_product.product_name, 
                ea_product.product_description, ea_product.avg_price, 
                ea_product.taxable, ea_product.unit, ea_product.stars, 
                ea_category.name
                FROM ea_product, ea_category
                WHERE ea_product.category_id = ea_category.id
                AND ea_product.upc = '$upc' ";
            }
            
            foreach ($this->dbo->query($query1) as $row) {
                $id = $row[0];
                $upc = $this->convertFancyQuotes(stripslashes($row[1]));
                $family_id = $this->convertFancyQuotes(stripslashes($row[2]));
                $brand = $this->convertFancyQuotes(stripslashes($row[3]));
                $product_name = $this->convertFancyQuotes(stripslashes($row[4]));
                $product_description = $this->convertFancyQuotes(stripslashes($row[5]));
                $avg_price = $this->convertFancyQuotes(stripslashes($row[6]));
                $taxable = $this->convertFancyQuotes(stripslashes($row[7]));
                $unit = $this->convertFancyQuotes(stripslashes($row[8]));
                $stars = $this->convertFancyQuotes(stripslashes($row[9]));
                $category_name = $this->convertFancyQuotes(stripslashes($row[10]));
                $category_url = str_replace(" ","",$category_name);
                $url = str_replace(" ","",$product_name);


                $product["id"] = $id;
                $product["product_name"] = $product_name;
                $product["family_id"] = $family_id;
                $product["brand"] = $brand;
                $product["upc"] = $upc;
                $product["product_description"] = $product_description;
                $product["avg_price"] = $avg_price;
                $product["taxable"] = $taxable;
                $product["unit"] = $unit;
                $product["stars"] = $stars;
                $product["category_name"] = $category_name;
                $product["category_url"] = $category_url;
                $product["url"] = $url;

                $products[] = $product;
            }



            if (empty($url)) {
                $error_code = "-1";
                $error_message = "The Product does not exist";
            } else {
                if (count($products) == 0) {
                    $error_code = "-2";
                    $error_message = "There are no Products for this Category";
                }
            }

            

        } catch (PDOException $e) {
            $error_code = "1";
            $error_message = "PDOException for getProduct. $e";
        }

        $error["id"] = $error_code;
        $error["error_message"] = $error_message;
        
        $data["error"] = $error;
        $data["products"] = $products;
        $data["query"] = str_replace("\n"," ",$query);
        $data["query1"] = str_replace("\n"," ",$query1);
        
        $data = json_encode($data);

        return $data;
    }
    
}


?>