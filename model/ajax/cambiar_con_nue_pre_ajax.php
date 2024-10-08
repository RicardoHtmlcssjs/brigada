<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
	$cl_usuario = new Usuario("","");
	$nv_contra = $class->limpiar_cadena($_POST["nv_contra"]);
	$result = $cl_usuario->cambiar_con_nue_pre($nv_contra);
	echo $result;
?>