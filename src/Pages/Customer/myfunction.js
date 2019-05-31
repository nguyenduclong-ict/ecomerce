const myfunction = () => {
    let $ = window.$;
    // Search button
    $("#search_input_box").hide();
    $("#search").on("click", function() {
      $("#search_input_box").slideToggle();
      $("#search_input").focus();
    });
    $("#close_search").on("click", function() {
      $("#search_input_box").slideUp(500);
    });
  
    // Sticky navbar
    $(".sticky-header").sticky();
  
    window.$.alertError = message => {
      window.$.alert({
        title: "Lỗi",
        content: message,
        type: "red",
        animationSpeed: 100
      });
    };
  
    window.$.alertWarning = message => {
      window.$.alert({
        title: "Lưu ý",
        content: message,
        animationSpeed: 100,
        type: "orange"
      });
    };
  
    window.$.alertSuccess = message => {
      window.$.alert({
        title: "Thành công",
        content: message,
        animationSpeed: 100,
        type: "green"
      });
    };
    // custorm library
    window.$.showAlert = (title, message) => {
      window.$.alert({
        title: title,
        content: message,
        animation: "bottom",
        animationSpeed: 200
      });
    };
  };
  export default myfunction;
  