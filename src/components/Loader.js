import React from 'react'

const Loader = ({ hrefs = [], srcs = [] }) => {
    const loadCss = () => {
        let rs = [];
        hrefs.forEach(href => {
            rs.push(
                <link href={href} rel="stylesheet"></link>
            )
        });
        return rs;
    }

    const loadScript = () => {
        let rs = [];
        srcs.forEach(src => {
            rs.push(
                <script src={src}></script>
            )
        });
        return rs;
    }
    return (
        <div>
            {loadCss()}
            {loadScript()}
        </div>
    )
}

export default Loader
