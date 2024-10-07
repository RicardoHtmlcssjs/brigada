<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
$cedula = $class->limpiar_cadena($_POST["cedula"]);
$nombre = $class->limpiar_cadena($_POST["nombre"]);
$correo = $class->limpiar_cadena($_POST["correo"]);
$telefono = $class->limpiar_cadena($_POST["telefono"]);
$estado = $class->limpiar_cadena($_POST["estado"]);
$direccion = $class->limpiar_cadena($_POST["direccion"]);
$tiktok = $class->limpiar_cadena($_POST["tiktok"]);
$facebook = $class->limpiar_cadena($_POST["facebook"]);
$instagram = $class->limpiar_cadena($_POST["instagram"]);
$niv_academico = $class->limpiar_cadena($_POST["niv_academico"]);
$hab_des = $class->limpiar_cadena($_POST["hab_des"]);
$contrasena = $class->limpiar_cadena($_POST["contrasena"]);
$pregunta = $class->limpiar_cadena($_POST["pregunta"]);
$respuesta = $class->limpiar_cadena($_POST["respuesta"]);
$sexo = $class->limpiar_cadena($_POST["sexo"]);
$rif = $class->limpiar_cadena($_POST["rif"]);
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->registrar_usuario($cedula, $nombre, $correo, $telefono, $estado, $direccion, $tiktok, $facebook, $instagram, $niv_academico, $hab_des,  $contrasena, $pregunta, $respuesta, $sexo, $rif);
	echo $result;
?>