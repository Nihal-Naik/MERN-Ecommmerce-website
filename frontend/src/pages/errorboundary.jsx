import React from 'react'
import { useRouteError } from 'react-router-dom'
import '../page_css/errorboundary.css'


const errorboundary = () => {
    const error=useRouteError()
  return (
    <div className="error-container">
      <h1 className="error_heading">Oops! Something went wrong.</h1>
      <p className="error_message">{error.status} - {error.statusText || "Unknown Error"}</p>
    </div>
  )
}

export default errorboundary
