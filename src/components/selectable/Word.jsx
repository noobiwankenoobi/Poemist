const React = require('react')
import './_word.scss'

const Letter = ({ isSelected, ch, letterIdx, onClick }) => (
  <span
    className={`letter ${isSelected ? 'is' : 'not'}-selected`}
    data-idx={letterIdx}
    onClick={onClick}
  >
    {ch}
  </span>
)

const Word = ({ word, wordIdx, handleClick }) => (
  <span className="word" data-word-idx={wordIdx}>
    {word.map(({ ch, isSelected }, letterIdx) => (
      <Letter
        key={`${wordIdx}${letterIdx}`}
        {...{ ch, isSelected, letterIdx }}
        onClick={handleClick.bind(null, { wordIdx, letterIdx })}
      />
    ))}
  </span>
)

export default Word
