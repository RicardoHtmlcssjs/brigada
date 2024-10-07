<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$usuario = $class->limpiar_cadena($_POST["usu"]);
$contrasena = $class->limpiar_cadena($_POST["contrasena"]);
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->login_usuario($usuario, $contrasena);
	echo $result;
?>