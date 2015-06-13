/**
 * Created by evenoli on 10/06/15.
 */
'use strict';

var React = require('react/addons'),
    CommentStore = require('../stores/CommentStore'),
    CommentAction = require('../actions/CommentAction'),
    ReactTG = React.addons.CSSTransitionGroup;

require('styles/Comments.sass');

//Key code for 'enter' key
var ENTER_KEY_CODE = 13;

var BentoComment = React.createClass({

    render: function () {
        var date = new Date(parseInt(this.props.comment.timestamp)),
            time = '' + date.getHours().toString() + ':',
            minutes = date.getMinutes().toString(),
            time = time + (minutes.length < 2? '0' + minutes : minutes),
            dateString = date.toDateString();

        return (
            <div className="comment">
                <div className="author">
                    <b> {this.props.comment.author} </b>
                </div>
                <div className="timestamp">
                    {dateString} at {time}
                </div>
                <div className="body">
                    {this.props.comment.body}
                </div>
            </div>
        );
    }
});

var CommentSection = React.createClass({

    getInitialState: function () {
        return (
        {text: '',
            comments: CommentStore.getAllForPost(this.props.itemid)}
        );
    },

    getState: function () {
        return {
            comments: CommentStore.getAllForPost(this.props.itemid)
        };
    },

    onTextChange: function (event, value) {
        this.setState({text: event.target.value});
    },

    onComChange: function () {
        this.setState(this.getState);
    },

    componentDidMount: function () {
        CommentStore.addChangeListener(this.onComChange);
        CommentAction.fetchComments();
    },

    componentWillUnmount: function () {
        CommentStore.removeChangeListener(this.onComChange);
    },

    send: function () {
        var text = this.state.text.trim();
        if(text) {
            CommentAction.createComment(text, this.props.itemid);
        }
        this.setState({text: ''});
    },

    _onKeyDown: function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            event.preventDefault();
            this.send();
        }
    },

    render: function () {
        var commentlist = this.state.comments.map(
            (comment) => {
                return (
                    <BentoComment
                        key={comment.id}
                        comment={comment}
                        />);
            }
        );
        return (
            <div className="comment-section">
                <div className="comment-input-section input-group">
                    <input className="form-control comment-box"
                              placeholder="Leave a comment. If you want."
                              onChange={this.onTextChange}
                              value={this.state.text}
                              onKeyDown={this._onKeyDown}/>
                    <button onClick={this.send} className="btn btn-success input-group-addon post-button">
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                </div>
                <div id="comments-hint">
                    COMMENTS
                </div>
                <div className="comment-list" >
                    <ReactTG transitionName="example" transitionAppear={true}>
                        {commentlist}
                    </ReactTG>
                </div>
            </div>

        );
    }
});

module.exports = {
    CommentSection: CommentSection,
    BentoComment: BentoComment
};
