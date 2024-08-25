import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
class MindMapConnection extends React.Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      })
    ).isRequired,
    style: PropTypes.shape({
      stroke: PropTypes.string,
      strokeWidth: PropTypes.number,
      lineCap: PropTypes.string,
      lineJoin: PropTypes.string,
      dash: PropTypes.arrayOf(PropTypes.number),
    }),
  };
  static defaultProps = {
    style: {
      stroke: 'black',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
      dash: [],
    },
  };
  render() {
    const { nodes, style } = this.props;
    if (nodes.length < 2) return null;
    const points = nodes.reduce((acc, node) => [...acc, node.x, node.y], []);
    return <Line points={points} {...style} />;
  }
}
export default MindMapConnection;