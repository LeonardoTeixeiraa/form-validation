document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  const telefone = document.getElementById("telefone");
  const cpf = document.getElementById("cpf");
  const cep = document.getElementById("cep");
  const email = document.getElementById("email");

  function aplicarErro(campo, mensagem) {
    campo.setCustomValidity(mensagem);
    campo.reportValidity(); // força mostrar tooltip
  }

  function limparErro(campo) {
    campo.setCustomValidity("");
  }

  telefone.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 2)
      value = "(" + value.slice(0, 2) + ")" + value.slice(2);

    if (value.length > 7) value = value.slice(0, 9) + "-" + value.slice(9);

    e.target.value = value;
  });

  telefone.addEventListener("blur", function () {
    const regex = /^\(\d{2}\)\d{5}-\d{4}$/;

    if (!regex.test(this.value)) {
      aplicarErro(this, "Digite o telefone no formato (XX)XXXXX-XXXX");
    } else {
      limparErro(this);
    }
  });
  cpf.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1-$2");

    e.target.value = value;
  });

  cpf.addEventListener("blur", function () {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    if (!regex.test(this.value)) {
      aplicarErro(this, "Digite o CPF no formato XXX.XXX.XXX-XX");
    } else {
      limparErro(this);
    }
  });

  cep.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 8) value = value.slice(0, 8);

    value = value.replace(/^(\d{5})(\d)/, "$1-$2");

    e.target.value = value;
  });

  cep.addEventListener("blur", function () {
    const regex = /^\d{5}-\d{3}$/;

    if (!regex.test(this.value)) {
      aplicarErro(this, "Digite o CEP no formato XXXXX-XXX");
    } else {
      limparErro(this);
    }
  });

  email.addEventListener("blur", function () {
    const regex = /^[a-zA-Z0-9._%+-]+@ifsp\.edu\.br$/;

    if (!regex.test(this.value)) {
      aplicarErro(this, "O e-mail deve ser do domínio @ifsp.edu.br");
    } else {
      limparErro(this);
    }
  });
  form.addEventListener("submit", function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
    }
  });
});
