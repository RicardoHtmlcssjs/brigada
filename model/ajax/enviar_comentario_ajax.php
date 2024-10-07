<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$comentario = $class->limpiar_cadena($_POST["comentario"]);
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->enviar_comentario($comentario);
	echo $result;
?>