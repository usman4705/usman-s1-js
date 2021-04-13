$(function () {
    loadproducts();
    $("#products").on("click", ".btn-danger", handledelete);
    $("#addBtn").click(addproduct);
  });
  function addproduct() {
    var name = $("#name").val();
    var price = $("#price").val();
    var color = $("#color").val();
    var department = $("#department").val();
    var description = $("#description").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/",
      method: "POST",
      data: { name, price, color, department, description },
      success: function (response) {
        console.log(response);
        loadproducts();
      },
    });
  }
  function handledelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".product");
    let ID = parentDiv.attr("data-id");
    console.log(ID);
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + ID,
      method: "DELETE",
      success: function () {
        loadproducts();
      },
    });
  }
  function loadproducts() {
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products",
      method: "GET",
      success: function (response) {
        console.log(response);
        var products = $("#products");
        products.empty();
        for (var i = 0; i < response.length; i++) {
          var pro = response[i];
          products.append(
            `<div class="product" data-id="${pro._id}"><h3>${pro.name}</h3><p><button class="btn btn-danger btn-sm float-right">Delete</button> <button class="btn btn-warning btn-sm float-right">Update</button>Price:${pro.price}</br>Color:${pro.color}</br>Department:${pro.department}</br>Description:${pro.description}</p> </div>`
          );
        }
      },
    });
  }
  