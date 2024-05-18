document.addEventListener('DOMContentLoaded', function() {

  var addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      console.log('تمت إضافة المنتج إلى السلة!');
    });
  });
});
