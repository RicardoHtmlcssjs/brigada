<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
// contra_nueva, respuesta_buena
$estado = $class->limpiar_cadena($_POST["estado"]);
$cl_usuario = new Usuario("","");
$result = $cl_usuario->descargar_data1_est($estado);
echo $result;
?>