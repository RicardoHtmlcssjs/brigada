<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
// contra_nueva, respuesta_buena
$cl_usuario = new Usuario("","");
$result = $cl_usuario->respuesta_lita_preguntas();
echo $result;
?>