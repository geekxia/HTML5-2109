import React, { PureComponent } from 'react'
import ThemeContext from '@/utils/theme'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      theme: {
        color: '#000000',
        background: '#ffffff'
      }
    }
  }
  change (ev,k) {
    const theme = JSON.parse(JSON.stringify(this.state.theme))
    theme[k] = ev.target.value
    this.setState({theme})
  }
  render () {
    const { children } = this.props
    const { theme } = this.state
    return (
      <div style={styles.layout}>
        <ThemeContext.Provider value={theme}>
          { children }
        </ThemeContext.Provider>

        <div style={styles.toggle}>
          前景色：
          <input
            type="color"
            value={theme.color}
            onChange={ev=>this.change(ev,'color')}
          />
          背景色：
          <input
            type="color"
            value={theme.background}
            onChange={ev=>this.change(ev,'background')}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  layout: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  toggle: {
    position: 'absolute',
    bottom: '100px'
  }
}
