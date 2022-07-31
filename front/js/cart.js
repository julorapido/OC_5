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


AddItemsContent();
UpdateCartPrice();


///onClick function /////////////////////////
var commanderBtn = document.getElementById("order");
commanderBtn.addEventListener("click", function(event){
  event.preventDefault();
});
commanderBtn.onclick = function() {
    var updatedCartData = JSON.parse(sessionStorage.getItem("cartItems"));
    VerifyInput(updatedCartData);
}



////// FUNCTION POUR VERIFIER LE FORMULAIRE DE COMMANDE  //////////////////////////
function VerifyInput(command){
  var letters = /^[A-Za-z\s]+$/;
  var lettersAndNumbers = /^[A-Za-z0-9\s]*$/;
  var validatorCount = 0;
  var allForms = document.getElementsByClassName("cart__order__form__question");
    if (command != null){
      for(var i = 0; i < allForms.length; i++){
          var inputElement = allForms[i].querySelector("input");
          if (inputElement.id == "firstName" || inputElement.id == "lastName" || inputElement.id == "city" ){
              if(inputElement.value.match(letters)){
                validatorCount += 1;
              }else{
                alert('Remplissez correctement le champ ' +  (inputElement.id).toString());
            }
          }
          if (inputElement.id == "address"){
              if(inputElement.value.toUpperCase().match(lettersAndNumbers)){
                  validatorCount += 1;
                }else {
                  alert(" Remplissez correctement le champ  d'adresse ");
                }
          }
          if (inputElement.id == "email"){
            if(inputElement.value.toUpperCase().match(lettersAndNumbers)){
              
              }else {
                alert(" Remplissez correctement l'email ");
              }
        }
          
      }
    }
}