class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const cardapio = [
      {
        tipo: "cafe",
        preco: 3.0,
      },

      {
        tipo: "chantily",
        preco: 1.5,
      },
      {
        tipo: "suco",
        preco: 6.3,
      },
      {
        tipo: "sanduiche",
        preco: 6.5,
      },
      {
        tipo: "queijo",
        preco: 2.0,
      },
      {
        tipo: "salgado",
        preco: 7.25,
      },
      {
        tipo: "combo1",
        preco: 9.5,
      },
      {
        tipo: "combo2",
        preco: 7.5,
      },
    ];

    const metodosDisponiveis = ["debito", "credito", "dinheiro"];
    let itensDoCarrinho = [];
    let calculoPreco = 0;
    let valorFinal = 0;

    const verificaQuantidadeValida = itens.some((item) => {
      return item.split(", ")[1] === "0" || item.split(", ")[1] === "";
    });

    const itensOrganizados = itens.map((item) => {
      return item.split(", ");
    });

    const verificaCarrinhoVazio = itensOrganizados.some((item) => {
      return item.length < 1;
    });

    const verificaPedidoValido = itensOrganizados.some((item) => {
      return item.length < 2;
    });

    const metodoDePgtoValido = metodosDisponiveis.includes(metodoDePagamento);

    if (verificaQuantidadeValida) {
      return "Quantidade Inválida!";
    }
    if (verificaCarrinhoVazio) {
      return "Não há itens no carrinho de compra!";
    }
    if (verificaPedidoValido) {
      return "Item inválido!";
    }
    if (!metodoDePgtoValido) {
      return "Forma de pagamento inválida!";
    }

    for (const item of itensOrganizados) {
      const novoItem = item[0];
      const quantidade = Number(item[1]);
      const produtoEncontrado = cardapio.find((x) => x.tipo === novoItem);
      if (produtoEncontrado) {
        let itemReformulado = { ...produtoEncontrado, quantidade };
        itensDoCarrinho.push(itemReformulado);
      }
    }
    const verificaSeConstaChantily = itensDoCarrinho.some((item) => {
      return item.tipo === "chantily";
    }); // algum dos ites tem chantilly

    if (verificaSeConstaChantily) {
      const verificaSeConstaCafe = itensDoCarrinho.some((item) => {
        return item.tipo === "cafe";
      }); // se tem chantilly verifica se algum dos itens tem cafe
      if (!verificaSeConstaCafe) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    const verificaSeConstaQueijo = itensDoCarrinho.some((item) => {
      return item.tipo === "queijo";
    });

    if (verificaSeConstaQueijo) {
      const verificaSeConstaSanduiche = itensDoCarrinho.some((item) => {
        return item.tipo === "sanduiche";
      });
      if (!verificaSeConstaSanduiche) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    itensDoCarrinho.forEach((item) => {
      const soma = item.preco * item.quantidade;
      calculoPreco += soma;
    });

    if (metodoDePagamento === "dinheiro") {
      valorFinal = calculoPreco * 0.95;
    }
    if (metodoDePagamento === "credito") {
      valorFinal = calculoPreco * 1.03;
    }

    return `R$ ${valorFinal.toFixed(2)}`;
  }
}

export { CaixaDaLanchonete };
