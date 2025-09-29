const pizzas = [
    {
        id: 1,
        nome: "Margherita Artesanal",
        descricao: "Molho de tomate, mozzarella fresca, manjericão e azeite extra virgem",
        preco: 32.90,
        categoria: "mais-vendidas",
        imagem: "assets/img/pizza1.jpg"
    },
    {
        id: 2,
        nome: "Pepperoni Premium",
        descricao: "Pepperoni importado, mozzarella, orégano e molho especial da casa",
        preco: 38.90,
        categoria: "mais-vendidas",
        imagem: "assets/img/pizza2.jpg"
    },
    {
        id: 3,
        nome: "Quatro Queijos",
        descricao: "Mozzarella, gorgonzola, parmesão e provolone derretidos",
        preco: 41.90,
        categoria: "mais-vendidas",
        imagem: "assets/img/pizza3.jpg"
    },
    {
        id: 4,
        nome: "Frango Catupiry",
        descricao: "Frango desfiado, catupiry cremoso, milho e azeitonas",
        preco: 36.90,
        categoria: "promocoes",
        imagem: "assets/img/pizza4.jpg"
    },
    {
        id: 5,
        nome: "Portuguesa Especial",
        descricao: "Presunto, ovos, cebola, azeitonas, ervilha e mozzarella",
        preco: 39.90,
        categoria: "promocoes",
        imagem: "assets/img/pizza5.jpg"
    },
    {
        id: 6,
        nome: "Vegana Suprema",
        descricao: "Queijo vegano, tomates, rúcula, cogumelos e azeite trufado",
        preco: 44.90,
        categoria: "especiais",
        imagem: "assets/img/pizza6.jpg"
    },
    {
        id: 7,
        nome: "Calabresa Especial",
        descricao: "Calabresa artesanal, cebola roxa, pimentão e azeitonas",
        preco: 35.90,
        categoria: "tradicionais",
        imagem: "assets/img/pizza7.webp"
    },
    {
        id: 8,
        nome: "Napolitana",
        descricao: "Mozzarella, tomate, manjericão fresco e aliche",
        preco: 33.90,
        categoria: "tradicionais",
        imagem: "assets/img/pizza8.jpg"
    }
];

// Configurações do WhatsApp
const whatsappNumber = "5511987654321";

// Variáveis globais
let categoriaAtual = "mais-vendidas";
let mobileMenuAberto = false;

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    renderizarPizzas();
    configurarFiltros();
    adicionarAnimacoes();
});

// Renderizar pizzas no grid
function renderizarPizzas(categoria = "mais-vendidas") {
    const pizzaGrid = document.getElementById('pizzaGrid');
    let pizzasFiltradas;

    if (categoria === "todas") {
        pizzasFiltradas = pizzas;
    } else {
        pizzasFiltradas = pizzas.filter(pizza => pizza.categoria === categoria);
    }

    pizzaGrid.innerHTML = '';

    pizzasFiltradas.forEach(pizza => {
        const pizzaCard = criarCardPizza(pizza);
        pizzaGrid.appendChild(pizzaCard);
    });

    // Adicionar animação aos cards
    setTimeout(() => {
        const cards = pizzaGrid.querySelectorAll('.pizza-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 100);
        });
    }, 100);
}

// Criar card da pizza
function criarCardPizza(pizza) {
    const card = document.createElement('div');
    card.className = 'pizza-card';
    
    card.innerHTML = `
        <div class="pizza-image">
            <img src="${pizza.imagem}" alt="${pizza.nome}" loading="lazy">
            <div class="pizza-price">R$ ${formatarPreco(pizza.preco)}</div>
        </div>
        <div class="pizza-content">
            <h4>${pizza.nome}</h4>
            <p>${pizza.descricao}</p>
            <button class="btn-pizza" onclick="pedirPizza('${pizza.nome}', ${pizza.preco})">
                Pedir agora
            </button>
        </div>
    `;

    return card;
}

// Configurar filtros de categoria
function configurarFiltros() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Obter categoria e renderizar pizzas
            const categoria = this.dataset.category;
            categoriaAtual = categoria;
            renderizarPizzas(categoria);
        });
    });
}

// Funções de navegação
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header-fixed').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Funções do WhatsApp
function abrirWhatsApp(mensagem = "Olá! Gostaria de fazer um pedido") {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

function pedirPizza(nome, preco) {
    const mensagem = `Olá! Gostaria de pedir a pizza ${nome} (R$ ${formatarPreco(preco)})`;
    abrirWhatsApp(mensagem);
}

function pedirPromocao(promocao, preco = null) {
    let mensagem = `Olá! Gostaria de saber sobre a promoção: ${promocao}`;
    if (preco) {
        mensagem = `Olá! Quero a promoção ${promocao} por R$ ${preco}`;
    }
    abrirWhatsApp(mensagem);
}

// Utilitários
function formatarPreco(preco) {
    return preco.toFixed(2).replace('.', ',');
}

// Animações ao scroll
function adicionarAnimacoes() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.section-header');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Smooth scroll para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a, .footer-section a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Fechar menu mobile se estiver aberto
            if (mobileMenuAberto) {
                toggleMobileMenu();
            }
        });
    });
});

// Detectar scroll para header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-fixed');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});