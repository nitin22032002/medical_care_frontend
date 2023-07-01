import ContextMain from "../../context/ContextMain"
import React, { useContext } from 'react'
import { Blocks } from "react-loader-spinner"

export default function Loading() {
    const context = useContext(ContextMain)
    return (
        context.getLoading && <div className="loading-div">
            <Blocks
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperClass="blocks-wrapper"
            />
        </div>
    )
}
