import React from 'react';

class NewsScore extends React.Component {
  constructor() {
    super();

    this.inactive = false;

    this.state = {
      inactive: this.inactive
    };
  }

  render() {
    return (
      <button className={this.getClassNames()} data-score={this.props.score || 0} onClick={this.onClick.bind(this)}></button>
    );
  }

  getClassNames() {
    let classList = ['News-Score'];

    if (this.state.inactive) {
      classList.push('inactive');
    }

    return classList.join(' ');
  }

  onClick() {
    this.inactive = true;

    this.setState({
      inactive: this.inactive
    });

    console.log(this.state);
  }
}

NewsScore.PropTypes = {
  score: React.PropTypes.number
};

export default NewsScore;
