<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
	// $cl_usuario = new Usuario("","");
	// $result = $cl_usuario->buscar_persona_ci();
    session_start();
    $ruta_pro = $_SESSION["ruta_propuesta"];
	echo $ruta_pro;
?>