var cartData = JSON.parse(sessionStorage.getItem("cartItems"));
console.log(cartData);  

function AddHtmlElement(elementSelected, elementToAdd, classOfAddedElement){
  elementSelected.appendChild(elementToAdd);
  elementToAdd.className = classOfAddedElement;
  return elementToAdd
}

// FUNCTION D'AJOUT DES ELEMENTS DU PANIER EN HTML ///////////////////////////
function AddItemsContent(){
    cartData.forEach(function(item){
        const CartArticle =  AddHtmlElement(document.getElementById("cart__items"),document.createElement("article"),"cart__item");
        const CartImg =  AddHtmlElement(CartArticle,document.createElement("div"),"cart__item__img");
        const Image = AddHtmlElement(CartImg,document.createElement("img"),"image");
        Image.src = Object.values(item)[3];

        const CartContent =  AddHtmlElement(CartArticle,document.createElement("div"),"cart__item__content");
        const CartDesc = AddHtmlElement(CartContent,document.createElement("div"),"cart__item__content__description");

        const title = CartDesc.appendChild(document.createElement("h2"));
        const color = CartDesc.appendChild(document.createElement("p"));
        const price = CartDesc.appendChild(document.createElement("p"));
        title.innerHTML = Object.values(item)[0];
        color.innerHTML = Object.values(item)[1];
        price.innerHTML = Object.values(item)[4] + " €";

        const CartSettings = AddHtmlElement(CartContent,document.createElement("div"),"cart__item__content__settings");

        const CartSettingsQuantity = AddHtmlElement(CartSettings,document.createElement("div"),"cart__item__content__quantity");
        const quantity = CartSettingsQuantity.appendChild(document.createElement("p"));
        const input = CartSettingsQuantity.appendChild(document.createElement("input"));
        input.className = "itemQuantity";
        input.onchange = function(){
          UpdateCartQuantity(input);
        };
        quantity.innerHTML = Object.values(item)[2];

        const CartSettingsDelete = AddHtmlElement(CartSettings,document.createElement("div"),"cart__item__content__settings__delete");
        const supprimer = CartSettingsDelete.appendChild(document.createElement("p"));
        supprimer.innerHTML = "Supprimer";
        supprimer.className = "deleteItem";
        supprimer.onclick = function() {DeleteCartItem(supprimer)};
        
    });
}
///////////////////////////////////////////////////////////////////////////////////////////




// FUNCTION POUR METTRE A JOUR LA QUANTITÉ D'UN OBJET DU PANIER ///////////////////////////
function UpdateCartQuantity(input){
    const InputParent =  input.parentNode.parentNode.parentNode.parentNode;
      var InputQuantity =  input.parentNode.children[0];
  const updatedCartData = JSON.parse(sessionStorage.getItem("cartItems"));
    for (let i = 0; i < InputParent.parentNode.children.length; i++) {
        if (InputParent.parentNode.children[i] == InputParent){
              var ObjectToModify = updatedCartData[i];
                ObjectToModify.quantity =  parseInt(ObjectToModify.quantity) + parseInt(input.value);
                  InputQuantity.innerHTML = ObjectToModify.quantity;
                  const jsonCartArray = JSON.stringify(updatedCartData);
              sessionStorage.setItem('cartItems', jsonCartArray);
              UpdateCartPrice();
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////


// FUNCTION POUR METTRE A JOUR LE PRIX DU PANIER ///////////////////////////
function UpdateCartPrice(){
  var updatedCartData = JSON.parse(sessionStorage.getItem("cartItems"));
  var NewSum = 0;
  var PriceUpdated = 0;
  updatedCartData.forEach(function(item){
    NewSum += parseInt(Object.values(item)[2]);
    PriceUpdated += ( parseInt(Object.values(item)[4]) * parseInt(Object.values(item)[2]) ); // PRIX * QUANTITE
  }) 
  document.getElementById("totalQuantity").innerHTML = NewSum;
  document.getElementById("totalPrice").innerHTML = PriceUpdated;
}
////////////////////////////////////////////////////////////////////////////




// FUNCTION POUR SUPPRIMER UN ELEMENT DU PANIER ///////////////////////////
function DeleteCartItem(buttonChildDiv){
  var ArticleParent =  buttonChildDiv.parentNode.parentNode.parentNode.parentNode;
  var updatedCartData = JSON.parse(sessionStorage.getItem("cartItems"));
     for (let i = 0; i < ArticleParent.parentNode.children.length; i++) {
        if (ArticleParent.parentNode.children[i] == ArticleParent) {
            updatedCartData.splice(i, 1);
            const jsonCartArray = JSON.stringify(updatedCartData);
            sessionStorage.setItem('cartItems', jsonCartArray);
        }
    }
    UpdateCartPrice();
    ArticleParent.remove();
}
////////////////////////////////////////////////////////////////////////////

AddItemsContent();
UpdateCartPrice();




///onClick function /////////////////////////
var commanderBtn = document.getElementById("order");
commanderBtn.addEventListener("click", function(event){
  event.preventDefault();
});
commanderBtn.onclick = function() {
    var updatedCartData = JSON.parse(sessionStorage.getItem("cartItems"));
    VerifyForm(updatedCartData);
}
///////////////////////////////////////////////


//////////////// FUNCTION POUR ENVOYER MESSAGE D'ERREUR /////////////////////
function ThrowErrMessage(errBool,formId , messageString){

    var formHtml = document.getElementById(formId);
    if (errBool == true){
      formHtml.innerHTML = messageString;
    }else {
      formHtml.innerHTML = "";
    }
}
//////////////////////////////////////////////////////////////////////////////


////// FUNCTION POUR VERIFIER LE FORMULAIRE DE COMMANDE  //////////////////////////
function VerifyForm(command){
  var letters = /^[A-Za-z\s]+$/;
  var lettersAndNumbers = /^[A-Za-z0-9\s]*$/;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var validatorCount = 0;
  var allForms = document.getElementsByClassName("cart__order__form__question");
    if (command != null){

      for(var i = 0; i < allForms.length; i++){
          var inputElement = allForms[i].querySelector("input");
          var StringId = inputElement.id.toString() + "ErrorMsg";

          /////////// NORMALISATION DU STRING (POUR INCLURE LES ACCENTS ET LES CARACTÈRES SPÉCIAUX)//////////
          var originalString = inputElement.value.toString();
          var normalizedString = originalString.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          //////////////////////////////////////////////////////////////////////////////

          if (inputElement.id == "firstName" || inputElement.id == "lastName" || inputElement.id == "city" ){
            var ErrorStringMsg = "";
            if (inputElement.id.includes("first")){
              ErrorStringMsg = "Prénom"
            }else if (inputElement.id.includes("last")){
              ErrorStringMsg = "Nom de famille"
            }else if (inputElement.id.includes("city")){
              ErrorStringMsg = "Ville"
            }

          if(normalizedString.match(letters)){
                        validatorCount += 1;
                        ThrowErrMessage(false,StringId,"");
                  }else{
                        ThrowErrMessage(true,StringId,"Remplissez correctement le champ " + ErrorStringMsg);
                }
          }
          if (inputElement.id == "address"){

            if(normalizedString.match(lettersAndNumbers)){
                      validatorCount += 1;
                      ThrowErrMessage(false,StringId,"");
                    }else {
                      ThrowErrMessage(true,StringId,"Remplissez correctement le champ d'Adresse !");
                    }
          }
          if (inputElement.id == "email"){
                if(normalizedString.match(mailformat)){
                    validatorCount += 1;
                    ThrowErrMessage(false,StringId,"");
                  }else {
                    ThrowErrMessage(true,StringId,"Remplissez correctement le champ d'Adresse-mail !");
                  }
          }
        
          // SI LE FORMUMAIRE EST VALIDE APPEL DE LA FONCTION POST ET REDIRECT//
          if (validatorCount == 5){
                let data = {
                  contact : {},
                  products : []
                };
                const contact = {
                    firstName : "string",
                    lastName: "string",
                    address: "string",
                    city: "string",
                    email: "string"
                }
                const products = [];
      
                var values = [];
                for(var i = 0; i < allForms.length; i++){
                      var inputElement = allForms[i].querySelector("input");
                      var inputStringValue = inputElement.value.toString();
                      values.push(inputStringValue);
                }
                var i = 0;
                Object.keys(contact).forEach(key => {
                    contact[key] = values[i];
                    i += 1;
                })
              cartData.forEach(function(item){
                products.push(Object.values(item)[5]);
              })
              data.contact = contact;
              data.products = products;
              PostFormAndRedirectUser(data);
          }
          ///////////////////////////////////////////////////////////////////////////
      }
    }
}
////// FUNCTION POUR ENVOYER (POST) LE FORMULAIRE À L'API ET REDIRIGER L'UTILISATEUR //////////////////////////
async function PostFormAndRedirectUser(data){
  var PostRequest = new Request("http://localhost:3000/api/products/order");
    let response = await fetch(PostRequest, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    let result = await response.json();
      console.log(result);

      let redirectAdress = "http://127.0.0.1:5500/Projet5/front/html/confirmation.html?orderId="
      window.location.replace(redirectAdress + result.orderId.toString());
}