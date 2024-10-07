<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$res1 = $class->limpiar_cadena($_POST["res1"]);
$res2 = $class->limpiar_cadena($_POST["res2"]);
$res3 = $_POST["res3"];
$res4 = $class->limpiar_cadena($_POST["res4"]);
$res4_2 = $_POST["res4_2"];
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->env_rec_res_pre($res1, $res2, $res3, $res4, $res4_2);
	echo $result;
?>