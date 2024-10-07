<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$res_sec_contra = $class->limpiar_cadena($_POST["res_sec_contra"]);
$pre_sec_contra = $class->limpiar_cadena($_POST["pre_sec_contra"]);
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->res_pregunta_sec_contra($res_sec_contra, $pre_sec_contra);
	echo $result;
?>