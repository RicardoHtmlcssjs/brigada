<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$id_municipio = $class->limpiar_cadena($_POST["id_municipio"]);
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->mostrar_parroquia($id_municipio);
	echo $result;
?>