<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
// contra_nueva, respuesta_buena
$desde = $class->limpiar_cadena($_POST["desde"]);
$hasta = $class->limpiar_cadena($_POST["hasta"]);
$cl_usuario = new Usuario("","");
$result = $cl_usuario->desde_hasta_grafico2($desde, $hasta);
echo $result;
?>