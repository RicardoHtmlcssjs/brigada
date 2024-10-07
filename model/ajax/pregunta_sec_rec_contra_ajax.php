<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->pregunta_sec_rec_contra();
	echo $result;
?>