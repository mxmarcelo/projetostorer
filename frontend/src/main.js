import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Registro de Ponto</h1>

    <input id="matricula" placeholder="Matrícula" required />
    <br><br>

    <input id="senha" type="password" placeholder="Senha" required />
    <br><br>

    <button id="loginBtn">Entrar</button>
<br><br>

<button id="logoutBtn">
  Sair
</button>

<p id="msg"></p>

    <p id="msg"></p>
  </div>
`;

document
  .getElementById("loginBtn")
  .addEventListener("click", login);

document
  .getElementById("logoutBtn")
  .addEventListener("click", () => {
    localStorage.removeItem("token");

    document.getElementById("msg").innerText =
      "Sessão encerrada";

    location.reload();
  });

async function login() {
  const matricula =
    document.getElementById("matricula").value;

  const senha =
    document.getElementById("senha").value;

    if (!matricula || !senha) {
  document.getElementById("msg").innerText =
    "Informe matrícula e senha";
  return;
}

console.log("Tentando conectar...");

const response = await fetch(
  "http://localhost:8080/auth/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      matricula,
      senha,
    }),
  }
);

console.log("Resposta recebida:", response);

  try {
    const response = await fetch(
      "http://localhost:8080/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matricula,
          senha,
        }),
      }
    );

    if (!response.ok) {
      document.getElementById("msg").innerText =
        "Credenciais inválidas";
      return;
    }

    const data = await response.json();

localStorage.setItem(
  "token",
  data.accessToken
);

if (data.permissoes.podeBaterPontoOnline) {
  document.getElementById("msg").innerText =
    `✅ Login realizado com sucesso. Matrícula: ${matricula}`;
}
 else {
  document.getElementById("msg").innerText =
    "⚠️ Usuário sem permissão para bater ponto online.";
}

console.log(data);

  } catch (e) {
    document.getElementById("msg").innerText =
      "Erro ao conectar com backend";
  }
}