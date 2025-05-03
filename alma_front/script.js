// Funções de Login
document.getElementById('form-login').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const loginData = { email, senha };

  try {
    const response = await fetch('http://localhost:8081/usuarios/login', { // Corrigido o endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Login bem-sucedido!');
      
      // Armazenar o token ou dados do usuário para manter a sessão
      // Exemplo usando um token JWT retornado
      localStorage.setItem('authToken', data.token);  // Salva o token no localStorage

      // Redireciona para a página do dashboard
      window.location.href = 'dashboard.html'; // Redireciona para a página do dashboard
    } else {
      const error = await response.json();
      alert(`Erro ao realizar login: ${error.message}`);
    }
  } catch (error) {
    console.error('Erro ao se comunicar com o backend:', error);
    alert('Erro ao tentar realizar login, tente novamente mais tarde.');
  }
});


// Funções de registro de humor
let registros = JSON.parse(localStorage.getItem('registros')) || []; // Carrega os registros do localStorage

function salvarRegistro() {
  const nota = parseInt(document.getElementById("nota").value);
  const obs = document.getElementById("obs").value;
  const data = new Date().toLocaleDateString("pt-BR");

  if (nota >= 1 && nota <= 5) {
    registros.push({ data, nota, obs });
    localStorage.setItem("registros", JSON.stringify(registros));  // Armazena no localStorage
    exibirRegistros();
    atualizarGrafico();
  } else {
    alert("Insira uma nota entre 1 e 5.");
  }
}

function exibirRegistros() {
  const lista = document.getElementById("lista-registros");
  lista.innerHTML = "";
  registros.slice().reverse().forEach(reg => {
    const item = document.createElement("li");
    item.textContent = `${reg.data} - Nota: ${reg.nota} - ${reg.obs}`;
    lista.appendChild(item);
  });
}

function atualizarGrafico() {
  const ctx = document.getElementById("graficoHumor").getContext("2d");
  const datas = registros.map(r => r.data);
  const notas = registros.map(r => r.nota);

  if (window.grafico) window.grafico.destroy();

  window.grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: datas,
      datasets: [{
        label: 'Nível de Humor',
        data: notas,
        fill: false,
        borderColor: 'blue',
        tension: 0.2
      }]
    }
  });
}

function carregarPagina() {
  exibirRegistros();
  atualizarGrafico();
}

document.addEventListener('DOMContentLoaded', carregarPagina);

// Funções de Cadastro
document.getElementById('form-cadastro').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const cadastroData = { nome, email, senha };

  try {
    const response = await fetch('http://localhost:8081/usuarios/cadastrar', {  // Endpoint de cadastro
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cadastroData),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Cadastro bem-sucedido! Agora você pode fazer login.');
      window.location.href = 'login.html'; // Redireciona para a página de login
    } else {
      const error = await response.json();
      alert(`Erro ao realizar cadastro: ${error.message}`);
    }
  } catch (error) {
    console.error('Erro ao se comunicar com o backend:', error);
    alert('Erro ao tentar realizar o cadastro, tente novamente mais tarde.');
  }
});
// Função para salvar o registro de humor
function salvarRegistro() {
  const nota = parseInt(document.getElementById("nota").value);
  const obs = document.getElementById("observacao").value;
  const data = new Date().toLocaleDateString("pt-BR");

  if (nota >= 1 && nota <= 5) {
    const registro = { data, nota, obs };
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(registro);
    localStorage.setItem("registros", JSON.stringify(registros));
    exibirRegistros();
    atualizarGrafico();
  } else {
    alert("Insira uma nota entre 1 e 5.");
  }
}

// Função para exibir os registros de humor
function exibirRegistros() {
  const lista = document.getElementById("lista-registros");
  lista.innerHTML = "";
  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  registros.slice().reverse().forEach(reg => {
    const item = document.createElement("li");
    item.textContent = `${reg.data} - Nota: ${reg.nota} - ${reg.obs}`;
    lista.appendChild(item);
  });
}

// Função para atualizar o gráfico de evolução do humor
function atualizarGrafico() {
  const ctx = document.getElementById("graficoHumor").getContext("2d");
  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  const datas = registros.map(r => r.data);
  const notas = registros.map(r => r.nota);

  if (window.grafico) window.grafico.destroy();

  window.grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: datas,
      datasets: [{
        label: 'Nível de Humor',
        data: notas,
        fill: false,
        borderColor: 'blue',
        tension: 0.2
      }]
    }
  });
}

// Função de login (redirecionamento após autenticação)
document.getElementById('form-login').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  
  const loginData = { email, senha };
  
  try {
    const response = await fetch('http://localhost:8081/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Login bem-sucedido!');
      // Lógica para redirecionar para a área do usuário ou psicólogo
      if (data.tipo === 'usuario') {
        window.location.href = 'usuario.html'; // Página do usuário
      } else if (data.tipo === 'psicologo') {
        window.location.href = 'psicologo.html'; // Página do psicólogo
      }
    } else {
      const error = await response.json();
      alert(`Erro ao realizar login: ${error.message}`);
    }
  } catch (error) {
    console.error('Erro ao se comunicar com o backend:', error);
    alert('Erro ao tentar realizar login, tente novamente mais tarde.');
  }
});

// Inicializa os registros ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona o elemento após a página ser carregada
  const elemento = document.querySelector('#seu-elemento'); // Substitua '#seu-elemento' pelo ID correto do seu elemento
  
  if (elemento) {
      // Adiciona o event listener
      elemento.addEventListener('click', function() {
          console.log('Elemento clicado!');
      });
  } else {
      console.log('Elemento não encontrado!');
  }
});
