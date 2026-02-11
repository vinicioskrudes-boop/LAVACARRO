import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function LavaCarApp() {
  const [currentPage, setCurrentPage] = useState('login');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

const LoginPage = () => {
  const [error, setError] = React.useState('');

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <div style={styles.logoContainer}>
            <div style={{position: 'absolute', top: '-8px', right: '-8px'}}>
            </div>
          </div>
        </div>
        <div>
          {error && <div style={{color: 'red', marginBottom: '10px', textAlign: 'center'}}>{error}</div>}
          <input id="email" type="email" placeholder="E-mail" style={styles.input} />
          <input id="senha" type="password" placeholder="Senha" style={styles.input} />
          <button 
            onClick={() => {
              const email = document.getElementById('email').value;
              const senha = document.getElementById('senha').value;
              
              if (!email || !senha) {
                setError('Preencha todos os campos');
                return;
              }
              
              setUser({ email: email });
              setCurrentPage('produtos');
            }}
            style={styles.loginButton}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
  const ProdutosPage = () => (
    <div style={styles.produtosContainer}>
      <header style={styles.header}>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
        </div>
        <button
          onClick={() => setCurrentPage('carrinho')}
          style={styles.cartButton}
        >
          <ShoppingCart size={24} color="white" />
          {cart.length > 0 && (
            <span style={styles.cartBadge}>{cart.length}</span>
          )}
        </button>
      </header>

      <div style={{padding: '30px', textAlign: 'center'}}>
        <h2 style={{fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '30px'}}>
          Nossos Serviços
        </h2>
      </div>

      <div style={styles.produtosGrid}>
        {produtos.map(produto => (
          <div
            key={produto.id}
            style={styles.produtoCard}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.produtoImagem}>
              <img 
                src={produto.imagem} 
                alt={produto.nome} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover'
                }} 
              />
            </div>
            <div style={styles.produtoInfo}>
              <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937'}}>
                {produto.nome}
              </h3>
              <p style={{color: '#6b7280', fontSize: '14px', marginBottom: '20px'}}>
                {produto.descricao}
              </p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontSize: '28px', fontWeight: 'bold', color: '#16a34a'}}>
                  R$ {produto.preco.toFixed(2)}
                </span>
                <button
                  onClick={() => adicionarAoCarrinho(produto)}
                  style={styles.addButton}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CarrinhoPage = () => (
    <div style={styles.carrinhoContainer}>
      <header style={styles.header}>
        <button onClick={() => setCurrentPage('produtos')} style={styles.backButton}>
          <span>← Voltar</span>
        </button>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <ShoppingCart size={24} />
          <span style={{fontSize: '20px', fontWeight: 'bold'}}>Carrinho</span>
        </div>
      </header>

      <div style={styles.carrinhoContent}>
        {cart.length === 0 ? (
          <div style={styles.emptyCart}>
            <ShoppingCart size={96} color="#d1d5db" style={{margin: '0 auto 20px'}} />
            <h3 style={{fontSize: '24px', fontWeight: 'bold', color: '#374151', marginBottom: '10px'}}>
              Carrinho Vazio
            </h3>
            <button
              onClick={() => setCurrentPage('produtos')}
              style={{...styles.addButton, padding: '12px 40px'}}
            >
              Ver Serviços
            </button>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={styles.carrinhoItem}>
                <div style={{flex: 1}}>
                  <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px'}}>
                    {item.nome}
                  </h3>
                  <p style={{color: '#6b7280'}}>Quantidade: {item.quantidade}</p>
                </div>
                <div>
                  <span style={{fontSize: '24px', fontWeight: 'bold', color: '#16a34a'}}>
                    R$ {(item.preco * item.quantidade).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}

            <div style={styles.totalCard}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <span style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937'}}>Total:</span>
                <span style={{fontSize: '36px', fontWeight: 'bold', color: '#16a34a'}}>
                  R$ {calcularTotal().toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  alert('Pedido confirmado! Entraremos em contato em breve via WhatsApp: (41)91234-5678');
                  setCart([]);
                  setCurrentPage('produtos');
                }}
                style={styles.finalizarButton}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Confirmar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const produtos = [
    {
      id: 1,
      nome: 'Lavagem Simples',
      preco: 60.00,
      imagem: '/simples.png',
      descricao: 'Lavagem externa básica'
    },
    {
      id: 2,
      nome: 'Lavagem Completa',
      preco: 110.00,
      imagem: '/completa.png',
      descricao: 'Lavagem externa e interna'
    },
    {
      id: 3,
      nome: 'Lavagem Técnica/Detalhamento Externo',
      preco: 200.00,
      imagem: '/detalhada.png',
      descricao: 'Polimento e detalhamento completo'
    },
    {
      id: 4,
      nome: 'Higienização Interna',
      preco: 280.00,
      imagem: '/interna.png',
      descricao: 'Limpeza profunda do interior'
    }
  ];
  const adicionarAoCarrinho = (produto) => {
    const itemExistente = cart.find(item => item.id === produto.id);
    if (itemExistente) {
      setCart(cart.map(item => 
        item.id === produto.id 
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...produto, quantidade: 1 }]);
    }
  };

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };


  const styles = {

    loginContainer: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#3b82f6',
      padding: '20px'
    },
    loginCard: {
      background: '#2563eb',
      borderRadius: '30px',
      padding: '40px',
      width: '100%',
      maxWidth: '400px',
    },
    loginHeader: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    logoContainer: {
      position: 'relative',
      display: 'inline-block',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '12px 20px',
      borderRadius: '25px',
      border: 'none',
      fontSize: '16px',
      marginBottom: '15px',
      boxSizing: 'border-box'
    },
    loginButton: {
      width: '100%',
      padding: '15px',
      background: '#16a34a',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },

    header: {
      background: '#1f2937',
      color: 'white',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    cartButton: {
      position: 'relative',
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      padding: '12px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    cartBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    // Produtos
    produtosContainer: {
      minHeight: '100vh',
      backgroundColor: '#3b82f6',
      paddingBottom: '40px'
    },
    produtosGrid: {
      padding: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px'
    },
    produtoCard: {
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden', 
      transition: 'transform 0.3s'
    },
    produtoImagem: {
      width: '100%',      // Ocupa toda a largura do card
      height: '200px',    // Aumente este valor para a imagem ficar mais alta
      overflow: 'hidden', // Corta o que sobrar da imagem
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    produtoInfo: {
      padding: '25px'
    },
    addButton: {
      background: '#16a34a',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    carrinhoContainer: {
      minHeight: '100vh',
      backgroundColor: '#3b82f6',
      paddingBottom: '40px'
    },
    carrinhoContent: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '30px'
    },
    carrinhoItem: {
      background: 'white',
      borderRadius: '20px',
      padding: '25px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      flexWrap: 'wrap',
      gap: '15px'
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: '#f3f4f6',
      borderRadius: '25px',
      padding: '8px 15px'
    },
    quantityButton: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: 'none',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    removeButton: {
      background: 'none',
      border: 'none',
      color: '#ef4444',
      fontSize: '24px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    totalCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    finalizarButton: {
      width: '100%',
      background: 'linear-gradient(90deg, #16a34a 0%, #15803d 100%)',
      color: 'white',
      border: 'none',
      padding: '18px',
      borderRadius: '25px',
      fontSize: '20px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px'
    }
  };

return (
    <>
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'produtos' && <ProdutosPage />}
      {currentPage === 'carrinho' && <CarrinhoPage />}
    </>
  );
}