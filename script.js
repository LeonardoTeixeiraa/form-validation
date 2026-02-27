document.addEventListener("DOMContentLoaded", function () {
  const cpfInput = document.getElementById("cpf");
  const telInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");
  const inputsComValidacao = document.querySelectorAll(
    'input[pattern], input[type="email"]',
  );

  const applyMask = (event, type) => {
    let input = event.target;
    let value = input.value.replace(/\D/g, "");

    if (type === "cpf") {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (type === "tel") {
      value = value.replace(/(\d{2})(\d)/, "($1)$2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (type === "cep") {
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }

    input.value = value;
  };

  if (cpfInput) cpfInput.addEventListener("input", (e) => applyMask(e, "cpf"));
  if (telInput) telInput.addEventListener("input", (e) => applyMask(e, "tel"));
  if (cepInput) cepInput.addEventListener("input", (e) => applyMask(e, "cep"));

  inputsComValidacao.forEach((input) => {
    input.addEventListener("blur", function () {
      if (!input.checkValidity()) {
        input.classList.add("is-invalid");
        input.reportValidity(); 
      } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
    });

    input.addEventListener("input", function () {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
    });
  });
});
