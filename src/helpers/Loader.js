export const loadCSS = function(href, id = 'load-top') {
  console.log('load CSS : ' + href);
  var oldsel = document.querySelector(`link[href='${href}']`);
  if (oldsel) return;
  var tag = document.createElement("link");
  tag.async = false;
  tag.rel = "stylesheet";
  tag.href = href;
  document.getElementById(id).appendChild(tag);
};

export const clearTop = () => {
    // document.getElementById('load-top').removeChild();
    document.querySelectorAll('#load-bottom > link, script').forEach(e => e.remove());
}

export const clearBottom = () => {
    document.querySelectorAll('#load-top > link, script').forEach(e => e.remove());
    // document.getElementById('load-bottom').removeChild();
}

export const clearAllScriptAndCSS = () => {
    clearTop();
    clearBottom();
}

export const loadScript = function(src, id='load-bottom') {
  var oldsel = document.querySelector(`script[src='${src}']`);
  if (oldsel) return;
  var tag = document.createElement("script");
  tag.async = false;
  tag.src = src;
  document.getElementById(id).appendChild(tag);
};
