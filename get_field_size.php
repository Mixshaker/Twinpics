<?php
$width = random_int(2, 6);
$height = random_int(2, 6);

if (($width % 2) != 0 && ($height % 2) != 0){
 $width++;
}

$arr = array("width" => $width, "height" => $height);
echo json_encode($arr);
?>