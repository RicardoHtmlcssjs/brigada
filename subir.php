<?php
    include("model/lib/conexion.php");

    $nombre_temporal = $_FILES['archivo']['tmp_name'];
    $nombre = $_FILES['archivo']['name'];
    // $cedula = $_POST["cedula_exp"];
    session_start();
    $id_empre = $_SESSION["id_per"];
            if(!file_exists('propuestas_empresas/'.$id_empre)){
                mkdir('propuestas_empresas/'.$id_empre, 0777, true);
            }
            $ultimosTres = substr($nombre, -3);
            $nombre_com = $id_empre . "." . $ultimosTres;
            move_uploaded_file($nombre_temporal, 'propuestas_empresas/'.$id_empre.'/'.$nombre_com);
            $ruta = 'propuestas_empresas/'.$id_empre.'/'.$nombre_com;
            // echo "hola";
            $conexion = new Conexion();
            $db = $conexion->conecta();
            // $db = $this->conn;
            $query1 = $db->execute("UPDATE dempresa SET ruta_propuesta = '".$ruta."' WHERE idempresa = '".$id_empre."'");
    ?>