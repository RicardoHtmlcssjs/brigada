<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$id_estado = $class->limpiar_cadena($_POST["id_estado"]);
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->mostrar_municipio($id_estado);
	echo $result;
?>