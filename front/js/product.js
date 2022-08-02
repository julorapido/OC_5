const e = window.location.href.toString();
const last =  e.substring(e.length - 32);
var ItemObject = {}
var ProductRequest = new Request("http://localhost:3000/api/products/" + last);

//////////////////////// FUNCTION POUR FETCH UN PRODUIT SPÉICIFIQUE DE L'API //////////////////////////////
function fetchSpecificProduct(){
    fetch(ProductRequest).then(res => res.json())
    .then(data => {
        ProductToHtml(data);
        /// APPEL DE LA FONCTION DU RENDU HTML ///
        ItemObject = data;
    }) .catch(error => {
        console.log(error);
    })  
}
fetchSpecificProduct();

//////////////////// FUNCTION POUR RENDRE LE PRODUIT DE L'API EN HTML /////////////////////////////////
function ProductToHtml(ItemObj){
    var itemIMG = document.getElementsByClassName("item__img");
    var item = itemIMG.item(0);
    var img = document.createElement("img");
    img.src = Object.values(ItemObj)[4];
    item.appendChild(img);

    var itemTITLE = document.getElementById("title");
    itemTITLE.innerHTML =Object.values(ItemObj)[2];
    var itemPRICE = document.getElementById("price");
    itemPRICE.innerHTML =Object.values(ItemObj)[3];
    var itemDESC = document.getElementById("description");
    itemDESC.innerHTML =Object.values(ItemObj)[5];


    var itemTITLE = document.getElementById("colors");
    Object.entries(Object.values(ItemObj)[0]).forEach(([key, value]) => {
        var selectNew = document.createElement("option");
        itemTITLE.appendChild(selectNew);
        selectNew.innerHTML = value;
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////



//////////////////// FUNCTION DE VÉRIFICATION DE DOUBLON /////////////////////////////////
var dblIndx = 0;
var DoublonPresent = false;
function VerifyNoDuplicate(ObjectToVerify){
        DoublonPresent = false;
        dblIndx = 0;
        var InitialArray =  JSON.parse(sessionStorage.getItem("cartItems"));
            ( InitialArray).forEach(function(item){
    
                if ((Object.values(item)[0] == Object.values(ObjectToVerify)[0]) && (Object.values(item)[1] == Object.values(ObjectToVerify)[1])){
                            DoublonPresent = true;
                            return
                }
                if (DoublonPresent == false){
                    dblIndx += 1;
                }
        })
    
}
//////////////////////////////////////////////////////////////////////////////////////////////


//////////////////// FUNCTION POUR PUSH UN PRODUIT DANS LE SESSIONSTORAGE /////////////////////////////////
function PushProduct(Array, Product){
    Array.push(Product);
    const jsonCartArray = JSON.stringify(Array);
    sessionStorage.setItem('cartItems', jsonCartArray);
}
//////////////////// ///////////////////////////////// /////////////////////////////////


var CartArray = [];
if(document.getElementById('addToCart').onclick = 
    //////////////////// FUNCTION POUR VERIFIER UN PRODUOT ET L'AJOUTER AU PANIER /////////////////////////////////
    function AddToCart() {
        var quantity = document.getElementById("quantity");
        var colorsOptionsInxed = document.getElementById("colors").selectedIndex;
        if ((quantity.value >= 1) && (quantity.value <101) ){
            if (colorsOptionsInxed != 0){
                    if ( ( JSON.parse(sessionStorage.getItem("cartItems"))) != null){
                        CartArray =  JSON.parse(sessionStorage.getItem("cartItems"));
                    }
                    // CREATION DE L'OBJECT PRODUCT -------------
                    var Product = {
                        name : 'Kanap Helicé',
                        color : 'blue',
                        quantity : 1,
                        img_url : "e",
                        price: 400,
                        id : ""
                    };
                    Product.quantity = document.querySelector('input').value;
                    var selectColors = document.getElementById('colors');
                    Product.color = selectColors.options[selectColors.selectedIndex].text;
            
                    Product.name = Object.values(ItemObject)[2];
                    Product.price = Object.values(ItemObject)[3];
                    Product.img_url = Object.values(ItemObject)[4];
                    Product.id = Object.values(ItemObject)[1];
                    // ------------------------------------------------------------------

                    if ( ( JSON.parse(sessionStorage.getItem("cartItems"))) == null){
                        // AJOUT DE L'OBJECT PRODUCT DIRECTEMENT (si le panier était déjà vide)---------------------------------
                        PushProduct(CartArray, Product);
                    }else if ( ( JSON.parse(sessionStorage.getItem("cartItems"))) != null){
                        // SINON ON VÉRIFIE LE DOUBLON ---------------------------------
                                VerifyNoDuplicate(Product);
                                if (DoublonPresent == true){
                                    CartArray =  JSON.parse(sessionStorage.getItem("cartItems"));
                                    var ObjectToModify = CartArray[dblIndx];
                                    alert("Ajout de "+  Product.quantity.toString() +" élements du panier");
                                    ObjectToModify.quantity =  parseInt(ObjectToModify.quantity) + parseInt(Product.quantity);
                                    CartArray[dblIndx] = ObjectToModify;
                                    const jsonCartArray = JSON.stringify(CartArray);
                                    sessionStorage.setItem('cartItems', jsonCartArray);
                                }else if (DoublonPresent == false){
                                         PushProduct(CartArray, Product);
                                         //// APPEL DE LA FONCTION PushProduct() /////
                                }  
                    }   
                }else {
                    alert("Choisissez une couleur svp !");
                }
        }else {
            alert("La quantité doit être entre 1 et 100");
        }
    });
/////////////////////////////////////////////////// /////////////////////////////////




 
//
//var Product = {
//    name : "ABC",
//    color : 18,
//    quantity : "CSE",
//    score : 90
//};
//