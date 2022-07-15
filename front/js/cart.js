var cartData = JSON.parse(sessionStorage.getItem("cartItems"));
console.log(cartData);  


function AddHtmlElement(elementSelected, elementToAdd, classOfAddedElement){
  elementSelected.appendChild(elementToAdd);
  elementToAdd.className = classOfAddedElement;
  return elementToAdd
}
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
        quantity.innerHTML = Object.values(item)[2];

        const CartSettingsDelete = AddHtmlElement(CartSettings,document.createElement("div"),"cart__item__content__settings__delete");
        const supprimer = CartSettingsDelete.appendChild(document.createElement("p"));
        supprimer.innerHTML = "Supprimer";
        supprimer.className = "deleteItem";
        supprimer.onclick = function() {DeleteCartItem(supprimer)};
        
    });
}
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

function DeleteCartItem(buttonChildDiv){
  var ArticleParent =  buttonChildDiv.parentNode.parentNode.parentNode.parentNode;
  var updatedCartData = JSON.parse(sessionStorage.getItem("cartItems"));
     for (let i = 0; i < ArticleParent.parentNode.children.length; i++) {
        if (ArticleParent.parentNode.children[i] == ArticleParent) {
          updatedCartData.splice(i, 1);
          console.log(updatedCartData);


          const jsonCartArray = JSON.stringify(updatedCartData);
          sessionStorage.setItem('cartItems', jsonCartArray);
        }
    }
    UpdateCartPrice();
    ArticleParent.remove();
}
AddItemsContent();
UpdateCartPrice();