import {Component} from 'react'
import './index.css'
class DigitalTimer extends Component {
  state = {defaultTimer: 25, timeElapsed: 0, isTimer: false}
  componentWillUnmount() {
    this.cleartimerInterval()
  }
  cleartimerInterval = () => clearInterval(this.intervalId)
  onDecreasedDigitalTimer = () => {
    const {defaultTimer} = this.state
    if (defaultTimer > 1) {
      this.setState(previous => ({defaultTimer: previous.defaultTimer-1}))
    }
  }
  onIncreasedDigitalTimer = () => {
    this.setState(previous => ({defaultTimer: previous.defaultTimer + 1}))
  }
  onRenderIncreaseOrecrease = () => {
    const {defaultTimer} = this.state
    return (
      <div className="container">
        <p className="main-heading">Set Timer limit</p>
        <div className="containers">
          <button className="button" onClick={this.onDecreasedDigitalTimer}>
            -
          </button>
          <div className="buttonss">
            <p className="parassss">{defaultTimer}</p>
          </div>
          <button className="button" onClick={this.onIncreasedDigitalTimer}>
            +
          </button>
        </div>
      </div>
    )
  }
  onIncreasedElapsedTime = () => {
    const {defaultTimer, timeElapsed} = this.state
    const timeComplete = timeElapsed === defaultTimer * 60
    if (timeComplete) {
      this.cleartimerInterval()
      this.setState({isTimer: false})
    } else {
      this.setState(previous => ({timeElapsed: previous.timeElapsed+1 }))
    }
  }
  pauseOrStartButtons = () => {
    const {defaultTimer, timeElapsed, isTimer} = this.state
    const timerCompleted = timeElapsed === defaultTimer * 60
    if (timerCompleted) {
      this.setState({timeElapsed: 0})
    }
    if (isTimer) {
      this.cleartimerInterval()
    } else {
      this.intervalId = setInterval(this.onIncreasedElapsedTime, 1000)
    }
    this.setState(previous => ({isTimer: !previous.isTimer}))
  }
  onResetButton = () => {
    this.cleartimerInterval()
    this.setState({defaultTimer: 25, timeElapsed: 0, isTimer: false})
  }
  renderPauseorrunButton = () => {
    const {isTimer} = this.state
    const timeTaken = isTimer
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const buttonsMaker = isTimer ? ' pause icon' : 'play icon'
    return (
      <div className="pause-container">
        <button className="pause-button" onClick={this.pauseOrStartButtons}>
          <img src={timeTaken} alt={buttonsMaker} className="image" />
          <h1 className="ssssss">{isTimer ? 'Pause' : 'Start'}</h1>
        </button>

        <button className="pause-button" onClick={this.onResetButton}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="image"
          />
          <p className="ssssss">Reset</p>
        </button>
      </div>
    )
  }
  getElapsedDigitalTimer = () => {
    const {defaultTimer, timeElapsed} = this.state
    const timerStart = defaultTimer * 60 - timeElapsed
    const minutes = Math.floor(timerStart / 60)
    const seconds = Math.floor(timerStart % 60)
    const stringMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringMinutes}:${stringSeconds}`
  }
  render() {
    const {isTimer} = this.state
    const bgTimer = isTimer ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="paused-container">
          <div className="consss">
            <div className="time-containers">
              <h1 className="parass">{this.getElapsedDigitalTimer()}</h1>
              <p className="para">{bgTimer}</p>
            </div>
          </div>
          <div>
            {this.renderPauseorrunButton()}

            <div>{this.onRenderIncreaseOrecrease()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
