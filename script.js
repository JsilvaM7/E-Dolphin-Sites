// FAQ Toggles
document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
    });
});

// Pop-up de 15 segundos
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('orcamento.html')) return;
    setTimeout(showPopup, 15000);
});

function showPopup() {
    if (document.getElementById('budget-popup')) return;
    const popup = document.createElement('div');
    popup.id = 'budget-popup';
    popup.className = 'popup-overlay';
    popup.innerHTML = `
        <div class="popup-content glass">
            <button class="popup-close"><i data-lucide="x"></i></button>
            <div id="form-container">
                <h2 style="margin-bottom:10px">Orçamento Grátis</h2>
                <div class="wa-notice-box">
                    <i data-lucide="info" style="color:#25D366"></i>
                    <p>Enviaremos um modelo de teste. As fotos do negócio devem ser enviadas no passo seguinte via WhatsApp.</p>
                </div>
                <form class="popup-form">
                    <input type="text" name="nome" placeholder="Seu Nome" required>
                    <input type="tel" name="whatsapp" placeholder="Seu WhatsApp" required>
                    <button type="submit" class="btn btn-primary submit-btn">Solicitar Orçamento</button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    lucide.createIcons();

    popup.querySelector('form').addEventListener('submit', handleFormSubmit);
    popup.querySelector('.popup-close').addEventListener('click', () => {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 300);
    });
    setTimeout(() => popup.classList.add('active'), 100);
}

// FUNÇÃO DE ENVIO E TRANSIÇÃO PARA WHATSAPP
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const container = form.parentElement;
    const btn = form.querySelector('.submit-btn');
    const formData = new FormData(form);

    btn.disabled = true;
    btn.innerText = 'Enviando...';

    try {
        const response = await fetch("https://formspree.io/f/mgolybjq", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // Success State - Show message on button 1
            btn.innerText = '✅ Dados Enviados com Sucesso!';
            btn.style.backgroundColor = '#25D366'; // Give it a success color

            // Redirect to WhatsApp after 3 seconds
            setTimeout(() => {
                window.location.href = 'https://wa.me/5511967013874?text=Olá! Enviei meus dados pelo site. Aqui estão as fotos e referências do meu estabelecimento:';
            }, 3000);
        } else {
            throw new Error('Erro no servidor');
        }
    } catch (error) {
        btn.disabled = false;
        btn.innerText = 'Tentar Novamente';
    }
}

// Ligar formulários das páginas
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.qualified-form, #contact-form');
    forms.forEach(f => {
        const wrap = document.createElement('div');
        f.parentNode.insertBefore(wrap, f);
        wrap.appendChild(f);
        f.addEventListener('submit', handleFormSubmit);
    });
});