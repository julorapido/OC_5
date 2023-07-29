var AllProductsRequest = new Request("http://localhost:3000/api/products/");
var ProductsObj = {};

/////////////////////////// FONCTION POUR FETCH L'API///////////////////////////////////
function FetchProducts(){
    fetch(AllProductsRequest)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        ProductsObj = data;
        console.log(ProductsObj);
        //// APPEL DE LA FONCTION TREATPRODUCTS() ////
        TreatProducts(data);
    })
    .catch(error => {
        console.log(error);
    });
}
//////////////////////// FONCTION RENDU DES OBJETS DE L'API EN HTML //////////////////////////////////////////////////////
function TreatProducts(Product_Object){
    Object.entries(Product_Object).forEach(([key, value]) => {
        var img = document.createElement("img");
        var h3 = document.createElement("h3");
        var p = document.createElement("p");
        var article = document.createElement("article");
        var a = document.createElement("a");

        var itemdiv = document.getElementById("items");
            itemdiv.appendChild(a);
            a.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);    
            article.appendChild(p);
        a.href = "http://127.0.0.1:5500/Projet5/front/html/product.html?id=" + Object.values(value)[1].toString();
        img.src = Object.values(value)[4];
        p.innerHTML = Object.values(value)[5];
        h3.innerHTML = Object.values(value)[2];
     });   
}
////////////////////////////////////////////////////////////////////////////////////////////
FetchProducts();


