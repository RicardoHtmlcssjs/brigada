<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
// contra_nueva, respuesta_buena
$contra_nueva = $class->limpiar_cadena($_POST["contra_nueva"]);
$respuesta_buena = $class->limpiar_cadena($_POST["respuesta_buena"]);
$cl_usuario = new Usuario("","");
$result = $cl_usuario->cambiar_contra_nueva($contra_nueva, $respuesta_buena);
echo $result;
?>