<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$estado = $class->limpiar_cadena($_POST["estado"]);
	// $cl_usuario = new Usuario("","");
	session_start();
    $_SESSION["estado"] = $estado;
    // $_SESSION["id_per"] = $idempresa;
	echo $estado;
?>