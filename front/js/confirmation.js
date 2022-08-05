const PageUrl = window.location.href.toString();
document.getElementById("orderId").innerHTML =  PageUrl.substring(PageUrl.length - 36);

/// LA PANIER SE VIDE APRES LA CONFIRMATION
var EmptyArray = []
const jsonCartArray = JSON.stringify(EmptyArray);
sessionStorage.setItem('cartItems', jsonCartArray);