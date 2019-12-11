var uiController = (function() {})();

var financeController = (function() {})();

// Програмын холбогч контроллер
var appController = (function(uiCtrl, fnCtrl) {
  var ctrlAddItem = function() {
    console.log("Controller clicked");
  };

  document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт харуулна
    // 4. Төсвийг тооцоолно
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  });

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
