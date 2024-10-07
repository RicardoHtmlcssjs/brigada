<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$usuario_rec = $class->limpiar_cadena($_POST["usuario_rec"]);
$cl_usuario = new Usuario("","");
$result = $cl_usuario->usuario_bus_rec_contra($usuario_rec);
echo $result;
?>