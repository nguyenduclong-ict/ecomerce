import $ from 'jquery'

class Loader {
    static loadCSS = (hrefs, id = "load-top") => {
        return new Promise(rj => {

            let p = [];
            hrefs.forEach(href => {
                let tag = document.createElement('link');
                tag.rel = "stylesheet";
                tag.href = href;
                document.getElementById(id).appendChild(tag);
            });

            rj();
        })

    }

    static loadScript = async (srcs, id = "load-bottom") => {
        return new Promise(rj => {

            let p = [];
            srcs.forEach(src => {
                p.push($.ajax(src));
            });

            Promise.all(p)
                .then(res => {
                    res.forEach(script => {
                        var tag = document.createElement("script");
                        tag.type = "text/javascript";
                        tag.innerHTML = script;
                        document.getElementById(id).appendChild(tag);
                    })
                    rj();
                })
        })
    }

    /**
     * 
     * @param {Danh sach href cua css file} hrefs 
     * @param {Danh sach src cua script file} srcs 
     */
    static load(hrefs = [], srcs = []) {
        return Promise.all([this.loadCSS(hrefs), this.loadScript(srcs)]);
    };
}

export default Loader
