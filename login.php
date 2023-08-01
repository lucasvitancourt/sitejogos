<?php
// Conexão com o banco de dados (mesmo código utilizado anteriormente)

// Recebendo os dados do formulário
$nome_usuario = $_POST['username'];
$senha = $_POST['password'];

// Verificando as credenciais do usuário
$sql = "SELECT * FROM usuarios WHERE nome_usuario='$nome_usuario' AND senha='$senha'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Autenticação bem-sucedida, criar sessão e redirecionar para a página da roleta
    session_start();
    $_SESSION['username'] = $nome_usuario;
    header("Location: roleta.php");
} else {
    echo "Login inválido";
}

$conn->close();
?>
