var loading = {};

loading.show = () => {
  let div = document.createElement("div");
  div.setAttribute("class", "loading");
  div.setAttribute("z-index", "1");
  div.innerText = "Loading&#8230;";
  document.getElementsByTagName("body")[0].appendChild(div);
  loading.isload = true;

};

loading.hide = () => {
  try {
    document.querySelector('div[class="loading"').remove();
    loading.isload = false;
  } catch (e) {}
};

export default loading;
