var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDecsription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDecsription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    },

    clearFields: function() {
      var fields = document.querySelectorAll(
        DOMstrings.inputDecsription + ", " + DOMstrings.inputValue
      );

      // Convert list to array
      var fieldsArr = Array.prototype.slice.call(fields);

      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i] = "";
      // }

      fieldsArr.forEach(function(el, index, array) {
        el.value = "";
      });
      fieldsArr[0].focus();
    },

    addListItem: function(item, type) {
      // Орлого, зарлагын элементийг агуулсан HTML-ийг бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // HTML дотор орлого зарлагын утгуудыг replace хийнэ
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);
      // Бэлтгэсэн HTML-ийг DOM-руу хийнэ
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    }
  };
})();

var financeController = (function() {
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
  };

  // private data
  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    },

    tusuv: 0
  };

  return {
    tusuvTootsooloh: function() {
      calculateTotal("inc");
      calculateTotal("exp");

      data.tusuv = data.totals.inc - data.totals.exp;
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    tusuvAvah: function() {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    },
    addItem: function(type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);

      return item;
    },

    data: function() {
      return data;
    }
  };
})();

// Програмын холбогч контроллер
var appController = (function(uiCtrl, fnCtrl) {
  var ctrlAddItem = function() {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiCtrl.getInput();
    if (input.description !== "" && input.val != "") {
      // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
      var item = fnCtrl.addItem(input.type, input.description, input.value);

      // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт харуулна
      uiCtrl.addListItem(item, input.type);
      uiCtrl.clearFields();

      // 4. Төсвийг тооцоолно
      financeController.tusuvTootsooloh();

      // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
      var tusuv = financeController.tusuvAvah();

      // 6. Төсвийн тооцоог дэлгэцэнд гаргана.
      console.log(tusuv);
    }
  };

  var setupEventListeners = function() {
    var DOM = uiCtrl.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function() {
      console.log("Program starting");
      // var asd = document.querySelector(uiCtrl.getDOMstrings);
      // console.log(uiCtrl.getDOMstrings);

      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();
