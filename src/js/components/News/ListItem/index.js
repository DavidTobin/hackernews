import React from 'react';
import moment from 'moment';
import NewsScore from '../Score';
import {CommentsList} from '../../Comments';
import {Link} from 'react-router';

class NewsListItem extends React.Component {
  constructor() {
    super();

    this.news = {};

    this.state = {
      expand: false,
      news: this.news
    };
  }

  componentDidMount() {
    this.api = new Firebase('https://hacker-news.firebaseio.com/v0/item/' + this.props.newsId);

    this.api.on('value', this.onApiValue.bind(this));
  }

  componentWillUnmount() {
    this.api.off();
  }

  render() {
    return (
      <article className={this.getClassList()}>
        <div className="row" onClick={this.onClick.bind(this)}>
          <div className="col-sm-1 text-center visible-md visible-lg">
            <NewsScore score={this.state.news.score} />
          </div>

          <div className="col-sm-8">
            <h1>
              {this.getUrl()}

              <small>{this.getShortUrl()}</small>
            </h1>
          </div>

          <div className="col-sm-2 visible-md visible-lg">
            {this.getUser()} <small className="text-muted">({this.getDate()})</small>
          </div>

          <div className="col-sm-1 text-right visible-md visible-lg">
            <small><strong>{this.state.news.descendants || 0} comments</strong></small>
          </div>
        </div>

        {this.getExpanded()}
      </article>
    );
  }

  getUser() {
    if (this.state.news.by) {
      return (<Link to="user" params={{user: this.state.news.by}}>{this.state.news.by}</Link>);
    }
  }

  getDate() {
    if (this.state.news.time) {
      return moment(this.state.news.time * 1000).fromNow() || '';
    }
  }

  getShortUrl() {
    if (this.state.news.id) {
      return this.state.news.url ? ' (' + new URL(this.state.news.url).hostname + ')' : ' (self)';
    }
  }

  getExpanded() {
    return (
      <div className="row">
        {this.state.news.text ? this.getExpandedText() : ''}
        {this.state.news.descendants ? this.getComments() : ''}
      </div>
    );
  }

  getComments() {
    return (
      <div className="col-sm-12">
        <CommentsList comments={this.state.news.kids} load={this.state.expand} />
      </div>
    );
  }

  getExpandedText() {
    if (this.state.expand) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <div className="self-text center-block" dangerouslySetInnerHTML={{__html: this.state.news.text}}></div>
          </div>
        </div>
      );
    }
  }

  getUrl() {
    if (this.state.news.url) {
      return (<a href={this.state.news.url} target="_blank">{this.state.news.title}</a>);
    } else {
      return (<a>{this.state.news.title}</a>);
    }
  }

  getClassList() {
    let classList = ['News-ListItem'];

    if (this.state.expand) {
      classList.push('expand');
    }

    return classList.join(' ');
  }

  onApiValue(child) {
    this.news = child.val();

    this.setState({
      news: this.news
    });
  }

  onClick(event) {
    if (event.target.nodeName !== 'BUTTON') {
      this.setState({
        expand: !this.state.expand
      });
    }
  }
}

NewsListItem.propTypes = {
  newsId: React.PropTypes.number
};

export default NewsListItem;
