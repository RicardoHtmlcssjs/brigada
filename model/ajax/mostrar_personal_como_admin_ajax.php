<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->mostrar_personal_como_admin();
	echo $result;
?>