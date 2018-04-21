import React from 'react'
import DeleteEditLinks from 'src/components/universal/DeleteEditLinks.jsx'
import { Link } from 'react-router-dom'

import './_poemHeader.scss'

const PoemHeader = ({ authorId, poemId }) => (
  <div className="poem-header">
    <DeleteEditLinks {...{ authorId, poemId }} />
    {poemId && <Link to={`/poem/${poemId}`}>view</Link>}
  </div>
)

export default PoemHeader
