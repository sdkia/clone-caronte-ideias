// Funcionalidade do formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('captureForm');
    const whatsappInput = document.getElementById('whatsapp');
    
    // Máscara para WhatsApp
    whatsappInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Limitar a 11 dígitos (DDD + 9 dígitos)
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        // Aplicar máscara
        if (value.length <= 11) {
            if (value.length === 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length === 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d+)/, '($1) $2');
            }
        }
        
        e.target.value = value;
        
        // Validação em tempo real
        validateWhatsAppField(e.target, value);
    });
    
    // Validação em tempo real para email
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function(e) {
        validateEmailField(e.target);
    });
    
    emailInput.addEventListener('input', function(e) {
        // Remove mensagem de erro enquanto digita
        clearFieldError(e.target);
    });
    
    // Validação em tempo real para WhatsApp
    whatsappInput.addEventListener('blur', function(e) {
        validateWhatsAppField(e.target, e.target.value);
    });
    
    // Submissão do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const nome = formData.get('nome');
        const email = formData.get('email');
        const whatsapp = formData.get('whatsapp');
        
        // Limpar erros anteriores
        clearAllErrors();
        
        // Validação básica
        let hasErrors = false;
        
        if (!nome || nome.trim().length < 2) {
            showFieldError(document.getElementById('nome'), 'Nome deve ter pelo menos 2 caracteres');
            hasErrors = true;
        }
        
        if (!email) {
            showFieldError(emailInput, 'E-mail é obrigatório');
            hasErrors = true;
        } else if (!validateEmail(email)) {
            showFieldError(emailInput, 'E-mail inválido. Use o formato: exemplo@dominio.com');
            hasErrors = true;
        }
        
        if (!whatsapp) {
            showFieldError(whatsappInput, 'WhatsApp é obrigatório');
            hasErrors = true;
        } else if (!validateWhatsApp(whatsapp)) {
            showFieldError(whatsappInput, 'WhatsApp inválido. Use o formato: (11) 99999-9999');
            hasErrors = true;
        }
        
        if (hasErrors) {
            return;
        }
        
        // Simular envio (aqui você integraria com seu backend)
        const button = form.querySelector('.cta-button');
        const originalText = button.textContent;
        
        button.textContent = 'ENVIANDO...';
        button.disabled = true;
        
        // Simular delay de envio
        setTimeout(() => {
            alert('Sucesso! Você receberá o acesso ao app Caronte no seu WhatsApp em instantes!');
            
            // Reset do formulário
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
            
            // Aqui você faria a integração real com seu sistema
            console.log('Dados capturados:', {
                nome: nome,
                email: email,
                whatsapp: whatsappNumbers
            });
            
        }, 2000);
    });
    
    // Animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animação de entrada aos elementos
    const animatedElements = document.querySelectorAll('.headline, .sub-headline, .form-container, .pas-headline, .pas-block');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // Animações específicas para itens da seção PAS
    const pasItems = document.querySelectorAll('.problem-item, .opportunity-item, .scenario-item');
    pasItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Animações para seção de fechamento
    const closingElements = document.querySelectorAll('.closing-block, .path, .final-cta-button');
    closingElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        observer.observe(el);
    });
    
    // Funcionalidade do botão CTA final
    const finalCtaButton = document.getElementById('finalCtaButton');
    if (finalCtaButton) {
        finalCtaButton.addEventListener('click', function() {
            // Rolar suavemente para o formulário no topo
            const formContainer = document.querySelector('.form-container');
            if (formContainer) {
                formContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Destacar o formulário brevemente
                setTimeout(() => {
                    formContainer.style.transform = 'scale(1.02)';
                    formContainer.style.boxShadow = '0 15px 40px rgba(120, 255, 214, 0.4)';
                    
                    setTimeout(() => {
                        formContainer.style.transform = 'scale(1)';
                        formContainer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                    }, 500);
                }, 800);
            }
        });
    }
});

// Efeito de partículas no fundo (opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #78ffd6;
            border-radius: 50%;
            opacity: 0.6;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Criar partículas após o carregamento
setTimeout(createParticles, 1000);

// Funções de validação
function validateEmail(email) {
    // Regex mais rigoroso para email
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email.trim());
}

function validateWhatsApp(whatsapp) {
    const numbers = whatsapp.replace(/\D/g, '');
    
    // Deve ter 10 ou 11 dígitos
    if (numbers.length < 10 || numbers.length > 11) {
        return false;
    }
    
    // Verificar se o DDD é válido (11 a 99)
    const ddd = parseInt(numbers.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
        return false;
    }
    
    // Se tem 11 dígitos, o terceiro deve ser 9 (celular)
    if (numbers.length === 11 && numbers[2] !== '9') {
        return false;
    }
    
    // Verificar se não são todos os números iguais
    const uniqueDigits = new Set(numbers).size;
    if (uniqueDigits === 1) {
        return false;
    }
    
    return true;
}

function validateEmailField(field) {
    const email = field.value.trim();
    if (email && !validateEmail(email)) {
        showFieldError(field, 'E-mail inválido. Use o formato: exemplo@dominio.com');
        return false;
    } else {
        clearFieldError(field);
        return true;
    }
}

function validateWhatsAppField(field, value) {
    const whatsapp = value || field.value;
    if (whatsapp && !validateWhatsApp(whatsapp)) {
        const numbers = whatsapp.replace(/\D/g, '');
        let errorMsg = 'WhatsApp inválido.';
        
        if (numbers.length < 10) {
            errorMsg = 'WhatsApp deve ter pelo menos 10 dígitos';
        } else if (numbers.length === 11 && numbers[2] !== '9') {
            errorMsg = 'Para celular, o terceiro dígito deve ser 9';
        } else {
            errorMsg = 'Formato: (11) 99999-9999';
        }
        
        showFieldError(field, errorMsg);
        return false;
    } else if (whatsapp) {
        clearFieldError(field);
        return true;
    }
    return true;
}

function showFieldError(field, message) {
    // Remove erro anterior
    clearFieldError(field);
    
    // Adiciona classe de erro ao campo
    field.classList.add('error');
    
    // Cria elemento de erro
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Insere após o campo
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    
    // Foca no campo com erro
    field.focus();
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(el => el.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}