class Loader {
    static loadCSS = (hrefs, id = "load-top") => {
        hrefs.forEach(href => {
            let tag = document.createElement('link');
            tag.rel = "stylesheet";
            tag.async = false;
            tag.href = href;
            window.document.getElementById(id).appendChild(tag);
        });
    }

    static loadScript = (srcs, id = "load-bottom") => {
        srcs.forEach(src => {
            let tag = document.createElement('script');
            tag.src = src;
            tag.async = false; // quan trong
            window.document.getElementById(id).appendChild(tag);
        });
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
    //    window.onload = onload;
    };  

    static clearCSS() {
        document.getElementById('load-top').innerHTML = null;
    }


    static clearScript() {
        document.getElementById('load-bottom').innerHTML = null;
    }
}
export default Loader
