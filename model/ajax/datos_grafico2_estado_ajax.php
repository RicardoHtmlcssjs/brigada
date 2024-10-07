<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->datos_grafico2_estado();
	echo $result;
?>