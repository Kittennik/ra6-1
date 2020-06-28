import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClockItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.timeInterval = null;
    this.setClock = this.setClock.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  setClock() {
    const date = new Date();
    const hour = parseInt(date.getUTCHours(), 10) + parseInt(this.props.clocksSetup.timeZone, 10);
    const minute = parseInt(date.getUTCMinutes(), 10);
    const second = parseInt(date.getUTCSeconds(), 10);

    this.setState({
      hours: hour,
      minutes: minute,
      seconds: second,
    });
  }

  componentDidMount() {
    this.setClock();
    this.timeInterval = setInterval(this.setClock, 1000);
  }

  render() {
    return (
      <>
        <div className='item-clock'>
          <p>{this.props.clocksSetup.name}</p>
          <p className='timer'>
            {this.state.hours < 10 ? `0${this.state.hours}` : this.state.hours}:
            {this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes}:
            {this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</p>
          <div className="close" onClick={this.handleClose}>&#x2718;</div>
        </div>
      </>
    );
  }

  componentWillUnmount() {
    this.timeInterval = clearInterval(this.timeInterval);
  }

  handleClose() {
    this.props.onClose(this.props.clocksSetup.id);
  }
}

ClockItem.propTypes = {
  clocksSetup: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
