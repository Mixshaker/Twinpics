<?php
$width = random_int(2, 8);
$height = random_int(2, 8);

if (($width % 2) != 0 && ($height % 2) != 0){
 $width++;
}

$arr = array("width" => $width, "height" => $height);
echo json_encode($arr);
?>