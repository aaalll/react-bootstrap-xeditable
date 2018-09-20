import React from 'react';
import PropTypes from 'prop-types';
import XEditable from './XEditable';

export default class EditableTextArea extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.node,
    rows: PropTypes.number,
    cols: PropTypes.number,
    placeholder: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    defaultText: PropTypes.node,
    disabled: PropTypes.bool
  };
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      value: this.props.value,
      disabled: this.props.disabled,
      defaultText: this.props.defaultText || 'Empty',
    };
    this.setState = this.setState.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    let changed = false, newState = this.state;
    if( nextProps.value !== this.props.value ){
      newState.value = nextProps.value;
      changed = true;
    }
    if( nextProps.disabled !== this.props.disabled ){
      newState.disabled = nextProps.disabled;
      changed = true;
    }
    if (changed) {
      this.setState(newState);
    }
  }
  save = (event) => {
    event.preventDefault();
    this.props.onUpdate(this.props.name, this.refs.el.value);
    this.setState({isEditing: false, value: this.refs.el.value});
  }
  cancel = () => {
    this.setState({isEditing: false});
  }
  clear = () => {
    this.refs.el.value = '';
  }
  handleLinkClick = () => {
    if (!this.state.disabled) {
      this.setState({isEditing: true});
    }
  }
  render() {
    if (this.state.isEditing) {
      const textareaClassName = `form-control ${this.props.className}`;
      return (
        <XEditable isLoading={false} save={this.save} cancel={this.cancel}>
          <textarea ref='el' id={this.props.id} className={textareaClassName} rows={this.props.rows} cols={this.props.cols} name={this.props.name} defaultValue={this.props.value} placeholder={this.props.placeholder}/>
        </XEditable>
      );
    } else {
      let aClassName = 'editable editable-click';
      let content = <pre>{this.state.value}</pre>;
      if (!this.state.value) {
        aClassName += ' editable-empty';
        content = this.state.value || this.state.defaultText;
      }
      return <a href='javascript:;' className={aClassName} style={this.state.textStyle} onClick={this.handleLinkClick}>
        {content}
      </a>;
    }
  }
}
