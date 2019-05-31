class Loader {
    static loadCSS = (hrefs, id = "load-top", onload) => {
        hrefs.forEach(href => {
            let tag = document.createElement('link');
            tag.rel = "stylesheet";
            tag.href = href;
            document.getElementById(id).appendChild(tag);
        });
        window.addEventListener('load', onload);
    }

    static loadScript = (srcs, id = "load-bottom", onload) => {
        srcs.forEach(src => {
            let tag = document.createElement('script');
            tag.async = false; // quan trong
            tag.src = src;
            document.getElementById(id).appendChild(tag);
        });

        window.addEventListener('load', onload);
    }

    /**
     * 
     * @param {Danh sach href cua css file} hrefs 
     * @param {Danh sach src cua script file} srcs 
     */
    static load(hrefs = [], srcs = [], onload) {
       this.loadCSS(hrefs);
       this.loadScript(srcs);
       window.addEventListener('load', onload);
    };  

    static clearCSS() {
        document.getElementById('load-top').innerHTML = null;
    }


    static clearScript() {
        document.getElementById('load-bottom').innerHTML = null;
    }
}
export default Loader
