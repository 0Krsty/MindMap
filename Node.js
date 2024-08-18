import React from 'react';

class MindMapNode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { content, position, customStyle } = this.props;

    const defaultStyle = {
      position: 'absolute',
      top: `${position.y}px`,
      left: `${position.x}px`,
      padding: '10px',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '5px',
      zIndex: 2,
      ...customStyle,
    };

    return (
      <div style={defaultStyle}>
        {content}
      </div>
    );
  }
}