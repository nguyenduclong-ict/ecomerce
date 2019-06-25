export const alertError = message => {
  window.$.alert({
    title: "Lỗi",
    content: message,
    type: "red",
    animationSpeed: 100
  });
};

export const alertWarning = message => {
  window.$.alert({
    title: "Lưu ý",
    content: message,
    animationSpeed: 100,
    type: "orange"
  });
};

export const alertSuccess = message => {
  window.$.alert({
    title: "Thành công",
    content: message,
    animationSpeed: 100,
    type: "green"
  });
};
// custorm library
export const showAlert = (title, message) => {
  window.$.alert({
    title: title,
    content: message,
    animation: "bottom",
    animationSpeed: 200
  });
};

