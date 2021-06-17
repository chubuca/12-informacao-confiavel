/**
 *
 * @param {HTMLElement} idDowebpage
 */

var usuarios = [
  {
    nome: "admin",
    senha: "admin",
    email: "admin@admin.com",
  },
  {
    nome: "teste",
    senha: "teste",
    email: "teste@admin.com",
  },
];

function renderizaElementos() {
  resultado_container = $("#resultado-container");
  resultado_container.empty();

  for (key in localStorage) {
    webpage = JSON.parse(localStorage.getItem(key));
    if (webpage == null) {
      break;
    } else {
      let reputation =
        webpage.reputation.design +
        webpage.reputation.information +
        webpage.reputation.ui +
        webpage.reputation.partiality;

      resultado_container.append(
        `<div class='resultado' id='${key}'>` +
          `<img id='icon-feedback' src='' pontuacao='${reputation}'>` +
          "<div class='texto-resultado'>" +
          `<a href='${webpage.url}' class='dominio'>` +
          `<h1 class='titulo'>${webpage.name}</h1>` +
          "</a>" +
          `<p class='not'>${webpage.description}</p>` +
          "</div>"
      );
      resultado_container.append(
        //Favorito
        `<svg class='fav-icon' id="fav-icon-${key}" onclick='setFav("${key}")' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.481 19.481" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 19.481 19.481">` +
          `<g>` +
          `<path d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"/>` +
          `</g>` +
          `</svg>`
      );
      if (webpage.fav == true) {
        let svg = $(`#fav-icon-${key}`);
        svg.addClass("fav-icon-true");
      }

      resultado_container.append(
        //Comeco dos botões de avaliação
        "<div class='dropdown'>" +
          "<button class='btn btn-secondary dropdown-toggle like' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>" +
          "Gostei" +
          "</button>" +
          //DropDown Avaliações Positivas
          "<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>" +
          `<li><a onClick='changeReputation("${key}", 1)' class='dropdown-item' href='#'>Design agradável</a></li>` +
          `<li><a onClick='changeReputation("${key}", 2)' class='dropdown-item' href='#'>Informativo</a></li>` +
          `<li><a onClick='changeReputation("${key}", 3)' class='dropdown-item' href='#'>Interface Intuitiva</a></li>` +
          `<li><a onClick='changeReputation("${key}", 4)' class='dropdown-item' href='#'>Imparcialidade</a></li>` +
          "</ul>" +
          "</div>" +
          //DropDown Avaliações Negativas
          "<div class='dropdown'>" +
          "<button class='btn btn-secondary dropdown-toggle dislike' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>" +
          "Não gostei" +
          "</button>" +
          "<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>" +
          `<li><a onClick='changeReputation("${key}", -1)' class='dropdown-item' href='#'>Poluição visual</a></li>` +
          `<li><a onClick='changeReputation("${key}", -2)' class='dropdown-item' href='#'>Informações falsas</a></li>` +
          `<li><a onClick='changeReputation("${key}", -3)' class='dropdown-item' href='#'>Interface confusa</a></li>` +
          `<li><a onClick='changeReputation("${key}", -4)' class='dropdown-item' href='#'>Conteúdo muito parcial</a></li>` +
          "</ul>" +
          "</div>" +
          "</div>"
      );
      let element = "#" + key + " #icon-feedback";

      if (reputation < 0) {
        $(element).attr("src", "assets/icons/ruim.png");
      } else if (reputation > 0) {
        $(element).attr("src", "assets/icons/bom.png");
      } else {
        $(element).attr("src", "assets/icons/neutro.png");
      }
    }
  }
}

function search() {
  var input, filter;
  input = $("#keywords");
  filter = input.val().toUpperCase();
  listawebpages = $("#resultado-container").children();

  listawebpages.each((index, element) => {
    var tagLink = element.reputation.children[1].children[0];

    var domain = tagLink.getAttribute("href");
    var name = tagLink.children[0].textContent;

    var description = element.reputation.children[1].children[1].textContent;

    if (
      description.toUpperCase().includes(filter) ||
      name.toUpperCase().includes(filter) ||
      domain.toUpperCase().includes(filter)
    ) {
      element.reputation.style.display = "";
    } else {
      element.reputation.style.display = "none";
    }
  });
}

function changeReputation(key, category) {
  element = JSON.parse(localStorage.getItem(key));
  console.log(element);

  localStorage.removeItem(key);

  switch (category) {
    case 1:
      console.log(1);
      element.reputation.design = element.reputation.design + 1;
      break;
    case 2:
      console.log(2);
      element.reputation.information = element.reputation.information + 1;
      break;
    case 3:
      console.log(3);
      element.reputation.ui = element.reputation.ui + 1;
      break;
    case 4:
      console.log(4);
      element.reputation.partiality = element.reputation.partiality + 1;
      break;
    case -1:
      console.log(-1);
      element.reputation.design = element.reputation.design - 1;
      break;
    case -2:
      console.log(-2);
      element.reputation.information = element.reputation.information - 1;
      break;
    case -3:
      console.log(-3);
      element.reputation.ui = element.reputation.ui - 1;
      break;
    case -4:
      console.log(-4);
      element.reputation.partiality = element.reputation.partiality - 1;
      break;
  }

  localStorage.setItem(key, JSON.stringify(element));
  renderizaElementos();
}

function filtroBaixo() {
  for (key in localStorage) {
    webpage = JSON.parse(localStorage.getItem(key));
    if (webpage == null) {
      break;
    } else {
      let reputation =
        webpage.reputation.design +
        webpage.reputation.information +
        webpage.reputation.ui +
        webpage.reputation.partiality;
      if (reputation <= 0) {
        $(`#${key}`).css("display", "none");
      }
    }
  }
}

function setFav(id) {
  let svg = $(`#fav-icon-${id}`);
  let webpage_storage = JSON.parse(localStorage.getItem(id));
  localStorage.removeItem(id);
  console.log(webpage_storage);
  if (webpage_storage.fav == false) {
    svg.addClass("fav-icon-true");
    webpage_storage.fav = true;
  } else {
    svg.removeClass("fav-icon-true");
    webpage_storage.fav = true;
  }
  localStorage.setItem(id, JSON.stringify(webpage_storage));
}

function showFavorites() {
  let favorites_container = $("#favorites-container");

  for (key in localStorage) {
    let webpage = JSON.parse(localStorage.getItem(key));

    if (webpage == null) {
      break;
    } else if (webpage.fav == true) {
      console.log(webpage);
      let reputation =
        webpage.reputation.design +
        webpage.reputation.information +
        webpage.reputation.ui +
        webpage.reputation.partiality;

      favorites_container.append(
        `<div class='resultado' id='${key}'>
            <img id='icon-feedback' src='' pontuacao='${reputation}'>
            <div class='texto-resultado'>
                <a href='${webpage.url}' class='dominio'>
                    <h1 class='titulo'>${webpage.name}</h1>
                </a>
                <p class='not'>${webpage.description}</p>
            </div>
            <g>
                <path
                    d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z" />
            </g>
            </svg>
            <div class='dropdown'>
                <button class='btn btn-secondary dropdown-toggle like' type='button' id='dropdownMenuButton1'
                    data-bs-toggle='dropdown' aria-expanded='false'>
                    Gostei
                </button>
                <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                    <li><a onClick='changeReputation("${key}", 1)' class='dropdown-item' href='#'>Design agradável</a></li>
                    <li><a onClick='changeReputation("${key}", 2)' class='dropdown-item' href='#'>Informativo</a></li>
                    <li><a onClick='changeReputation("${key}", 3)' class='dropdown-item' href='#'>Interface Intuitiva</a></li>
                    <li><a onClick='changeReputation("${key}", 4)' class='dropdown-item' href='#'>Imparcialidade</a></li>
                </ul>
            </div>
            <div class='dropdown'>
                <button class='btn btn-secondary dropdown-toggle dislike' type='button' id='dropdownMenuButton1'
                    data-bs-toggle='dropdown' aria-expanded='false'>
                    Não gostei
                </button>
                <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                    <li><a onClick='changeReputation("${key}", -1)' class='dropdown-item' href='#'>Poluição visual</a></li>
                    <li><a onClick='changeReputation("${key}", -2)' class='dropdown-item' href='#'>Informações falsas</a></li>
                    <li><a onClick='changeReputation("${key}", -3)' class='dropdown-item' href='#'>Interface confusa</a></li>
                    <li><a onClick='changeReputation("${key}", -4)' class='dropdown-item' href='#'>Conteúdo muito parcial</a>
                    </li>
                </ul>
            </div>
        </div>
        <div>
          <h4>Share</h4>
          <div class="social">
              <a 
                href="www.facebook.com/sharer/sharer.php?u=${
                  window.location.href
                }&title=${
          webpage.name
        }%20tem%20nota%20${reputation}%20de%20confiabilididade" 
                id="share-fb" class="sharer button"><i class="fa fa-2x fa-facebook-square"></i>
              </a>
              <a 
                href="http://twitter.com/intent/tweet?original_referer=${
                  window.location.href
                }&text=${
          webpage.name
        }%20tem%20nota%20${reputation}%20de%20confiabilididade&url=${
          window.location.href
        }" 
                id="share-tw" 
                class="sharer button">
                  <i class="fa fa-2x fa-twitter-square"></i>
                </a>
              <a 
                href="http://www.linkedin.com/shareArticle?mini=true&url=${
                  window.location.href
                }&&title=${
          webpage.name
        }%20tem%20nota%20${reputation}%20de%20confiabilididade&source=${$(
          location
        ).attr("hostname")}&"
                id="share-li"
                class="sharer
                button">
                  <i class="fa fa-2x fa-linkedin-square"></i>
              </a>
              <a 
                href="mailto:?subject=Reputacao%20do%20site%20${
                  webpage.name
                }&body=${
          webpage.name
        }%20tem%20nota%20${reputation}%20de%20confiabilididade"
                id="share-em"
                class="sharer button">
                  <i class="fa fa-2x fa-envelope-square"></i>
              </a>
          </div>
        </div>`
      );

      let element = "#" + key + " #icon-feedback";

      if (reputation < 0) {
        $(element).attr("src", "assets/icons/ruim.png");
      } else if (reputation > 0) {
        $(element).attr("src", "assets/icons/bom.png");
      } else {
        $(element).attr("src", "assets/icons/neutro.png");
      }
    }
  }
}

function cadastro() {
  let nome = $("#username").val();
  let senha = $("#password").val();
  let confirma = $("#password-confirm").val();
  let email = $("#email").val();
  let user = { nome: nome, senha: senha, email: email };
  if (nome === "" || senha === "" || email === "") alert("Erro no cadastro");
  else if (senha != confirma) alert("Senha inserida incorretamente");
  else {
    usuarios = [...usuarios, user];
    alert("Cadastrado corretamente.");
    window.location.href = "index.html";
  }
}

function login() {
  let nome = document.getElementById("username").value;
  let senha = document.getElementById("password").value;
  let teste = false;
  for (i = 0; i < usuarios.length; i++) {
    if (
      (nome == usuarios[i].nome || nome == usuarios[i].email) &&
      senha == usuarios[i].senha
    ) {
      localStorage.setItem("userlogin", true);
      alert("Login efetuado com sucesso!");
      window.location.href = "index.html";
      teste = true;
      return;
    }
  }
  if (teste == false) {
    alert("Inválido");
  }
}

class Validator {
  constructor() {
    this.validations = [
      "data-min-length",
      "data-max-length",
      "data-only-letters",
      "data-email-validate",
      "data-required",
      "data-equal",
      "data-password-validate",
    ];
  }

  // inicia a validação de todos os campos
  validate(form) {
    // limpa todas as validações antigas
    let currentValidations = document.querySelectorAll(
      "form .error-validation"
    );

    if (currentValidations.length) {
      this.cleanValidations(currentValidations);
    }

    // pegar todos inputs
    let inputs = form.getElementsByTagName("input");
    // transformar HTMLCollection em arr
    let inputsArray = [...inputs];

    // loop nos inputs e validação mediante aos atributos encontrados
    inputsArray.forEach(function (input, obj) {
      // fazer validação de acordo com o atributo do input
      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {
          // limpa string para saber o método
          let method = this.validations[i]
            .replace("data-", "")
            .replace("-", "");

          // valor do input
          let value = input.getAttribute(this.validations[i]);

          // invoca o método
          this[method](input, value);
        }
      }
    }, this);
  }

  // método para validar se tem um mínimo de caracteres
  minlength(input, minValue) {
    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

    if (inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }
  }

  // método para validar se passou do máximo de caracteres
  maxlength(input, maxValue) {
    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }
  }

  // método para validar strings que só contem letras
  onlyletters(input) {
    let re = /^[A-Za-z]+$/;

    let inputValue = input.value;

    let errorMessage = `Este campo não aceita números nem caracteres especiais`;

    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage);
    }
  }

  // método para validar e-mail
  emailvalidate(input) {
    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = `Insira um e-mail no padrão matheus@email.com`;

    if (!re.test(email)) {
      this.printMessage(input, errorMessage);
    }
  }

  // verificar se um campo está igual o outro
  equal(input, inputName) {
    let inputToCompare = document.getElementsByName(inputName)[0];

    let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

    if (input.value != inputToCompare.value) {
      this.printMessage(input, errorMessage);
    }
  }

  // método para exibir inputs que são necessários
  required(input) {
    let inputValue = input.value;

    if (inputValue === "") {
      let errorMessage = `Este campo é obrigatório`;

      this.printMessage(input, errorMessage);
    }
  }

  // validando o campo de senha
  passwordvalidate(input) {
    // explodir string em array
    let charArr = input.value.split("");

    let uppercases = 0;
    let numbers = 0;

    for (let i = 0; charArr.length > i; i++) {
      if (
        charArr[i] === charArr[i].toUpperCase() &&
        isNaN(parseInt(charArr[i]))
      ) {
        uppercases++;
      } else if (!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }

    if (uppercases === 0 || numbers === 0) {
      let errorMessage = `A senha precisa um caractere maiúsculo e um número`;

      this.printMessage(input, errorMessage);
    }
  }

  // método para imprimir mensagens de erro
  printMessage(input, msg) {
    // checa os erros presentes no input
    let errorsQty = input.parentNode.querySelector(".error-validation");

    // imprimir erro só se não tiver erros
    if (errorsQty === null) {
      let template = document
        .querySelector(".error-validation")
        .cloneNode(true);

      template.textContent = msg;

      let inputParent = input.parentNode;

      template.classList.remove("template");

      inputParent.appendChild(template);
    }
  }

  // remove todas as validações para fazer a checagem novamente
  cleanValidations(validations) {
    validations.forEach((el) => el.remove());
  }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener("click", function (e) {
  e.preventDefault();

  validator.validate(form);
});

if (localStorage.length === 0) {
  $.getJSON("db/db.json", function (data) {
    data.forEach((webpage, index) => {
      localStorage.setItem(`webpage_${index}`, JSON.stringify(webpage));
    });
  });
}
