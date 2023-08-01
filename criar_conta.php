<?php
// Conexão com o banco de dados
$servername = "seu_servidor";
$username = "root";
$password = "";
$dbname = "testedb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Recebendo os dados do formulário
$nome_usuario = $_POST['username'];
$email = $_POST['email'];
$senha = $_POST['password'];

// Inserindo os dados no banco de dados
$sql = "INSERT INTO usuarios (nome_usuario, email, senha) VALUES ('$nome_usuario', '$email', '$senha')";
if ($conn->query($sql) === TRUE) {
    echo "Conta criada com sucesso!";
} else {
    echo "Erro ao criar conta: " . $conn->error;
}

$conn->close();
?>
