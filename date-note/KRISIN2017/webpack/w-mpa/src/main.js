import _ from 'lodash'
import './common.css'

const text = (content) => {
  const el = document.createElement('div')
  el.innerHTML = _.join(content, ' ')
  document.body.appendChild(el)
}

text(['Hello', 'webpack'])