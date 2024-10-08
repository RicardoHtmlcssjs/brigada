<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$respuesta_ingre = $class->limpiar_cadena($_POST["respuesta_ingre"]);
$respuesta_correcta = $class->limpiar_cadena($_POST["respuesta_correcta"]);
	if(md5($respuesta_ingre) == $respuesta_correcta){
        $result = 1;
    }else{
        $result = 2;
    }
	echo $result;
?>