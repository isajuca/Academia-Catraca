// ============================================
// VARIÁVEIS GLOBAIS
// ============================================

// Armazena o CPF atual sem formatação (apenas números)
let currentCPF = '';

// Referências para os elementos HTML (DOM)
const cpfInput = document.getElementById('cpfInput');        // Campo de input onde mostra o CPF
const consultBtn = document.getElementById('consultBtn');    // Botão "Consultar Status"
const resultArea = document.getElementById('resultArea');    // Área que mostra o resultado (ativa/bloqueado)
const resultContent = document.getElementById('resultContent'); // Conteúdo dentro da área de resultado
const clearBtn = document.getElementById('clearBtn');        // Botão X para limpar o CPF
const backspaceBtn = document.getElementById('backspaceBtn'); // Botão para apagar o último dígito

// ============================================
// FUNÇÃO: FORMATAR CPF
// ============================================
// Recebe um CPF com ou sem formatação e aplica a máscara 000.000.000-00
function formatCPF(cpf) {
    // Remove tudo que não for número (dígito). O \D significa "não dígito"
    let numbers = cpf.replace(/\D/g, '');
    
    // Aplica a máscara conforme a quantidade de números digitados
    if (numbers.length <= 3) {
        // Menos de 3 números: mostra só os números (ex: 123)
        return numbers;
    } else if (numbers.length <= 6) {
        // Entre 4 e 6 números: aplica o primeiro ponto (ex: 123.456)
        return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (numbers.length <= 9) {
        // Entre 7 e 9 números: aplica os dois primeiros pontos (ex: 123.456.789)
        return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else {
        // 10 ou 11 números: aplica a máscara completa (ex: 123.456.789-00)
        return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
}

// ============================================
// FUNÇÃO: ATUALIZAR DISPLAY DO CPF
// ============================================
// Atualiza o campo de input com o CPF formatado e controla o botão de consulta
function updateCPFDisplay() {
    // Aplica a máscara no CPF atual
    const formattedCPF = formatCPF(currentCPF);
    // Mostra o CPF formatado no campo de input
    cpfInput.value = formattedCPF;
    
    // Remove tudo que não é número para contar os dígitos
    const cleanCPF = currentCPF.replace(/\D/g, '');
    // Só habilita o botão de consulta se tiver 11 dígitos
    // Se não tiver 11, o botão fica desabilitado (disabled = true)
    consultBtn.disabled = cleanCPF.length !== 11;
}

// ============================================
// FUNÇÃO: ADICIONAR DÍGITO
// ============================================
// Adiciona um número ao CPF quando o usuário clica no teclado virtual
function addDigit(digit) {
    // Pega apenas os números do CPF atual
    let cleanCPF = currentCPF.replace(/\D/g, '');
    
    // Só adiciona se ainda não tiver 11 números
    if (cleanCPF.length < 11) {
        // Concatena (junta) o dígito novo ao CPF existente
        currentCPF += digit;
        // Atualiza a tela com o novo CPF formatado
        updateCPFDisplay();
        // Esconde a área de resultado (quando digita, esconde o resultado anterior)
        resultArea.classList.add('hidden');
    }
}

// ============================================
// FUNÇÃO: REMOVER ÚLTIMO DÍGITO (BACKSPACE)
// ============================================
// Remove o último caractere do CPF (funciona como um "apagar")
function removeLastDigit() {
    // slice(0, -1) pega a string do início até o último caractere (exclui o último)
    currentCPF = currentCPF.slice(0, -1);
    // Atualiza a tela
    updateCPFDisplay();
    // Esconde o resultado anterior
    resultArea.classList.add('hidden');
}

// ============================================
// FUNÇÃO: LIMPAR CPF COMPLETO
// ============================================
// Limpa todo o CPF (botão X)
function clearCPF() {
    currentCPF = '';  // Zera a variável do CPF
    updateCPFDisplay(); // Atualiza a tela (campo fica vazio)
    resultArea.classList.add('hidden'); // Esconde resultado
}

// ============================================
// FUNÇÃO: MOSTRAR RESULTADO
// ============================================
// Exibe o resultado da consulta na tela com cores diferentes
// type: 'active', 'blocked', 'error', ou 'loading'
// message: a mensagem que vai aparecer
function showResult(type, message) {
    // Remove a classe 'hidden' para mostrar a área de resultado
    resultArea.classList.remove('hidden');
    
    // Remove todas as classes de cor anteriores (limpa estilos antigos)
    resultArea.classList.remove('bg-green-50', 'bg-red-50', 'bg-orange-50', 'bg-blue-50');
    
    // Adiciona a cor de fundo e borda conforme o tipo do resultado
    switch(type) {
        case 'active':
            // Verde para ATIVO
            resultArea.classList.add('bg-green-50', 'border-2', 'border-green-200');
            break;
        case 'blocked':
            // Vermelho para BLOQUEADO
            resultArea.classList.add('bg-red-50', 'border-2', 'border-red-200');
            break;
        case 'error':
            // Laranja para ERRO
            resultArea.classList.add('bg-orange-50', 'border-2', 'border-orange-200');
            break;
        case 'loading':
            // Azul para CARREGANDO
            resultArea.classList.add('bg-blue-50', 'border-2', 'border-blue-200');
            break;
    }
    
    // Insere a mensagem dentro da área de resultado
    resultContent.innerHTML = `<p class="text-lg">${message}</p>`;
}

// ============================================
// FUNÇÃO: CONSULTAR STATUS (INTEGRAÇÃO COM API)
// ============================================
// Função principal que faz a chamada para a API e exibe o resultado
async function consultStatus() {
    // Remove formatação e fica só com os números
    const cleanCPF = currentCPF.replace(/\D/g, '');
    
    // Validação: CPF deve ter 11 números
    if (cleanCPF.length !== 11) {
        showResult('error', 'CPF inválido! Digite 11 números.');
        return; // Sai da função se CPF for inválido
    }

    // Desabilita o botão durante a consulta (evita cliques duplos)
    consultBtn.disabled = true;
    // Muda o texto do botão para feedback visual
    consultBtn.textContent = 'Consultando...';
    // Mostra mensagem de loading
    showResult('loading', 'Verificando status...');

    try {
        // ============================================
        // CHAMADA PARA A API (SUBSTITUIR AQUI)
        // ============================================
        // fetch é usado para fazer requisições HTTP (GET, POST, etc)
        // O await faz o JavaScript esperar a resposta da API
        const response = await fetch('https://backup-weld.vercel.app/alunos/' + cleanCPF);
        
        // Converte a resposta (que vem em JSON) para um objeto JavaScript

        const data = await response.json();
        console.log('Resposta completa da API:', data);
        console.log('Status recebido:', data.status);
        console.log('Tipo do status:', typeof data.status);
        
        // Verifica o status retornado pela API
        // Se for "ativo" mostra verde, senão mostra vermelho
        if (data.status === "ativo") {
            showResult('active', '✅ Aluno ATIVO na academia');
        } else {
            showResult('blocked', '❌ Aluno BLOQUEADO OU INEXISTENTE na academia. Procure a secretaria.');
        }
        
    } catch (error) {
        // Se ocorrer qualquer erro (rede, servidor fora, etc) cai aqui
        showResult('error', 'Erro ao consultar. Tente novamente.');
    } finally {
        // Isso acontece SEMPRE, mesmo se der erro ou sucesso
        // Reabilita o botão e volta o texto original
        consultBtn.disabled = false;
        consultBtn.textContent = 'Consultar Status';
    }
}

// ============================================
// EVENTOS: CONFIGURANDO OS BOTÕES
// ============================================

// Para cada botão que tem o atributo "data-key" (teclado virtual)
// Adiciona um evento de clique
document.querySelectorAll('[data-key]').forEach(btn => {
    btn.addEventListener('click', () => {
        // Pega o valor do atributo data-key (1,2,3...)
        const digit = btn.getAttribute('data-key');
        // Chama a função para adicionar o dígito
        addDigit(digit);
    });
});

// Evento de clique no botão de apagar (⌫)
backspaceBtn.addEventListener('click', removeLastDigit);

// Evento de clique no botão de limpar tudo (X)
clearBtn.addEventListener('click', clearCPF);

// Evento de clique no botão de consultar
consultBtn.addEventListener('click', consultStatus);

// ============================================
// SUPORTE PARA TECLADO FÍSICO (OPCIONAL)
// ============================================
// Permite que o usuário use o teclado físico também
document.addEventListener('keydown', (e) => {
    // Se a tecla pressionada for número (0-9)
    if (e.key >= '0' && e.key <= '9') {
        e.preventDefault(); // Previne comportamento padrão (ex: não digitar em outros lugares)
        addDigit(e.key);     // Adiciona o dígito
    } 
    // Se for BACKSPACE (tecla de apagar)
    else if (e.key === 'Backspace') {
        e.preventDefault(); // Previne de voltar página
        removeLastDigit();   // Remove último dígito
    } 
    // Se for ENTER
    else if (e.key === 'Enter') {
        e.preventDefault(); // Previne de enviar formulário
        // Se o botão não estiver desabilitado, faz a consulta
        if (!consultBtn.disabled) consultStatus();
    }
});

// ============================================
// INICIALIZAÇÃO
// ============================================
// Chama a função para atualizar o display quando a página carrega
// Garante que o campo de CPF comece vazio e o botão comece desabilitado
updateCPFDisplay();