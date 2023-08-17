import fs from "fs";

const cardapio = JSON.parse(fs.readFileSync("./src/cardapio.json", `utf8`));

class CaixaDaLanchonete {
  verificaCarrinhoVazio(itens) {
    if (itens.length < 1) {
      return "Não há itens no carrinho de compra!";
    }
  }

  verificaQuantidadeValida(itens) {
    const verificaItem = itens.some((item) => {
      return item.split(",")[1] === "0" || item.split(",")[1] === "";
    });

    if (verificaItem) {
      return "Quantidade inválida!";
    }
  }

  verificaPedidoValido(itensOrganizados) {
    const verificaItem = itensOrganizados.some((item) => {
      return item.length < 2;
    });

    if (verificaItem) {
      return "Item inválido!";
    }
  }

  verificaMetodoDePgtoValido(metodosDisponiveis, metodoDePagamento) {
    if (!metodosDisponiveis.includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }
  }

  verificaSeConstaChantilySemCafe(carrinhoPronto) {
    const verificaSeConstaChantily = carrinhoPronto.some((item) => {
      return item.tipo === "chantily";
    });

    if (verificaSeConstaChantily) {
      const verificaSeConstaCafe = carrinhoPronto.some((item) => {
        return item.tipo === "cafe";
      });

      if (!verificaSeConstaCafe) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }
  }

  verificaSeConstaQueijoSemSanduiche(carrinhoPronto) {
    const verificaSeConstaQueijo = carrinhoPronto.some((item) => {
      return item.tipo === "queijo";
    });

    if (verificaSeConstaQueijo) {
      const verificaSeConstaSanduiche = carrinhoPronto.some((item) => {
        return item.tipo === "sanduiche";
      });
      if (!verificaSeConstaSanduiche) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const metodosDisponiveis = ["debito", "credito", "dinheiro"];
    const carrinhoPronto = [];

    let calculoPreco = 0;
    let valorFinal = 0;

    if (this.verificaCarrinhoVazio(itens)) {
      return this.verificaCarrinhoVazio(itens);
    }
    if (this.verificaQuantidadeValida(itens)) {
      return this.verificaQuantidadeValida(itens);
    }

    const itensOrganizados = itens.map((item) => {
      return item.split(",");
    });

    if (this.verificaPedidoValido(itensOrganizados)) {
      return this.verificaPedidoValido(itensOrganizados);
    }
    if (
      this.verificaMetodoDePgtoValido(metodosDisponiveis, metodoDePagamento)
    ) {
      return this.verificaMetodoDePgtoValido(
        metodosDisponiveis,
        metodoDePagamento
      );
    }

    for (const item of itensOrganizados) {
      const novoItem = item[0];
      const quantidade = Number(item[1]);
      const produtoEncontrado = cardapio.find((item) => item.tipo === novoItem);
      if (produtoEncontrado) {
        let itemReformulado = { ...produtoEncontrado, quantidade };
        carrinhoPronto.push(itemReformulado);
      } else {
        return "Item inválido!";
      }
    }

    if (this.verificaSeConstaChantilySemCafe(carrinhoPronto)) {
      return this.verificaSeConstaChantilySemCafe(carrinhoPronto);
    }
    if (this.verificaSeConstaQueijoSemSanduiche(carrinhoPronto)) {
      return this.verificaSeConstaQueijoSemSanduiche(carrinhoPronto);
    }

    carrinhoPronto.forEach((item) => {
      const soma = item.preco * item.quantidade;
      calculoPreco += soma;
    });

    if (metodoDePagamento === "dinheiro") {
      valorFinal = calculoPreco * 0.95;
    }
    if (metodoDePagamento === "credito") {
      valorFinal = calculoPreco * 1.03;
    }
    if (metodoDePagamento === "debito") {
      valorFinal = calculoPreco;
    }

    return `R$ ${valorFinal.toFixed(2)}`.replace(".", ",");
  }
}

export { CaixaDaLanchonete };
