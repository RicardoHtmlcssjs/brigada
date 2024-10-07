<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$usuario_olvi = $class->limpiar_cadena($_POST["usuario_olvi"]);
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->buscar_usu_olvi_contra($usuario_olvi);
	echo $result;
?>