import React from 'react';
import NewsListItem from '../ListItem';
import ReactFire from 'reactfire';
import Firebase from 'firebase';

class NewsList extends React.Component {
  constructor() {
    super();

    this.news = [];

    this.state = {
      news: this.news
    };
  }

  componentDidMount() {
    this.api = new Firebase(this.getDataEndPoint());

    this.api.limitToFirst(25).on('child_added', this.onApiChildAdded.bind(this));
  }

  componentWillUnmount() {
    this.api.off();
  }

  render () {
    return (
      <section className="News-List">
        {this.state.news.map((newsId) => {
          return (<NewsListItem key={newsId} newsId={newsId} />);
        })}
      </section>
    );
  }

  getDataEndPoint() {
    const API_URL = 'https://hacker-news.firebaseio.com/v0/';

    switch (this.props.dataType) {
      case 'new':
        return API_URL + 'newstories';

      case 'jobs':
        return API_URL + 'jobstories';

      case 'show':
        return API_URL + 'showstories';

      default:
        return API_URL + 'topstories';
    }
  }

  onApiChildAdded(child) {
    this.news.push(child.val());

    this.setState({
      news: this.news
    });
  }
}

NewsList.contextTypes = {
  router: React.PropTypes.func
};

export default NewsList;
