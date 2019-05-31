import React from 'react'

const Error = (props) => {
    return (
        <section className="content">
            <div className="box box-primary">
                <div className="box-header with-border">
                    <div className="row align-items-center">
                        <div className="text-center">
                            <h1>{props.code ? props.code : 404}</h1>
                            <h2>{props.detail ? props.detail : "Không tìm thấy trang yêu cầu"}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Error
