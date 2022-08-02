const PageUrl = window.location.href.toString();
document.getElementById("orderId").innerHTML =  PageUrl.substring(PageUrl.length - 36);
