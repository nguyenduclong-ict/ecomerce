var loading = {};

loading.show = () => {
  let div = document.createElement("div");
  div.setAttribute("class", "loading");
  div.setAttribute("z-index", "1");
  div.innerText = "Loading&#8230;";
  document.getElementsByTagName("body")[0].appendChild(div);
};

loading.hide = () => {
  let loader = document.querySelector('div[class="loading"');
  if(loader) loader.remove();
};

export default loading;
