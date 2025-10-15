document.addEventListener('DOMContentLoaded', () => {

    const numeroWhatsapp = "5531999250745";

    // --- LÓGICA PARA BOTÕES DE WHATSAPP DIRETO ---
    const whatsappBotoesDiretos = document.querySelectorAll('.whatsapp-link');
    whatsappBotoesDiretos.forEach(botao => {
        botao.addEventListener('click', (event) => {
            event.preventDefault(); 
            const mensagemPadrao = "Olá! Tenho interesse no aluguel de um climatizador e gostaria de mais informações.";
            const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemPadrao)}`;
            window.open(urlWhatsapp, '_blank');
        });
    });

    // --- LÓGICA PARA O FORMULÁRIO MODAL ---
    const modal = document.getElementById('form-modal');
    const botoesAbrirModal = document.querySelectorAll('.open-modal-btn');
    const botaoFecharModal = document.getElementById('close-modal-btn');
    const form = document.getElementById('rental-form');

    // Verifica se todos os elementos do modal existem antes de adicionar os eventos
    if (modal && botoesAbrirModal.length > 0 && botaoFecharModal && form) {
        
        const abrirModal = (event) => {
            event.preventDefault();
            // Impede que o evento de clique do whatsapp-link seja acionado se o botão tiver as duas classes
            event.stopPropagation(); 
            modal.classList.add('active');
        };

        const fecharModal = () => {
            modal.classList.remove('active');
        };

        // Adiciona o evento de abrir o modal
        botoesAbrirModal.forEach(btn => {
            btn.addEventListener('click', abrirModal);
        });

        // Adiciona os eventos de fechar o modal
        botaoFecharModal.addEventListener('click', fecharModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                fecharModal();
            }
        });

        // Lógica de envio do formulário
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = document.getElementById('client-name').value;
            const endereco = document.getElementById('client-address').value;
            const dimensoes = document.getElementById('space-dimensions').value;
            const data = document.getElementById('rental-date').value;

            // Formata a data para DD/MM/AAAA, corrigindo problemas de fuso horário
            const dataObj = new Date(data);
            const dataFormatada = dataObj.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

            const mensagem = `Olá! Meu nome é ${nome} e gostaria de alugar climatizadores para o dia ${dataFormatada}, para o endereço ${endereco}. As dimensões do ambiente são ${dimensoes}.`;
            const urlWhatsappFinal = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
            
            window.open(urlWhatsappFinal, '_blank');

            fecharModal();
            form.reset();
        });
    }
});