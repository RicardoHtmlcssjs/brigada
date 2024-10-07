<?php
include("../class_usuario_model.php");
include("../class_limpiar_cadena.php");
    $nombre = $class->limpiar_cadena($_POST["nombre"]);
    $correo = $class->limpiar_cadena($_POST["correo"]);
    $telefono = $class->limpiar_cadena($_POST["telefono"]);
    $direccion = $class->limpiar_cadena($_POST["direccion"]);
    $contrasena = $class->limpiar_cadena($_POST["contrasena"]);
    $pregunta = $class->limpiar_cadena($_POST["pregunta"]);
    $respuesta = $class->limpiar_cadena($_POST["respuesta"]);
    $sexo = $class->limpiar_cadena($_POST["sexo"]);
    $tiktok = $class->limpiar_cadena($_POST["tiktok"]);
    $facebook = $class->limpiar_cadena($_POST["facebook"]);
    $instagram = $class->limpiar_cadena($_POST["instagram"]);
	$cl_usuario = new Usuario("","");
	$result = $cl_usuario->actualizar_datos_usu($nombre, $correo, $telefono, $direccion, $contrasena, $pregunta, $respuesta, $sexo, $tiktok, $facebook, $instagram);
	echo $result;
?>