<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
// contra_nueva, respuesta_buena
$parroquia = $class->limpiar_cadena($_POST["parroquia"]);
$cl_usuario = new Usuario("","");
$result = $cl_usuario->ver_graf_por_parro($parroquia);
echo $result;
?>