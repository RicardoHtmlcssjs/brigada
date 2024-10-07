<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$respuesta_ingre = $class->limpiar_cadena($_POST["respuesta_ingre"]);
$respuesta_correcta = $class->limpiar_cadena($_POST["respuesta_correcta"]);
	if($respuesta_ingre == md5($respuesta_correcta)){
        $result = "Respuesta correcta";
    }else{
        $result = "Respuesta incorrecta";
    }
	echo $result;
?>