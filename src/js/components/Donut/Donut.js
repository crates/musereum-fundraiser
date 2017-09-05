import React from 'react';

export default class Donut extends React.Component {
  xScale = 1000;
  yScale = 1000;

  constructor(props) {
    super(props);
    this.state = { data: this.scaleData(props.data) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: this.scaleData(nextProps.data) });
  }

  scaleData(data) {
    const sum = this.props.sum || data.reduce((prev, curr) => prev + curr.y, 0);
    return data.reduce((prev, curr) => (
      {
        xOffset: prev.xOffset + curr.y / sum * this.xScale,
        data: [
          ...prev.data,
          {
            x: prev.xOffset,
            y: curr.y === 0 ? 0 : curr.y / sum * this.yScale,
            origin: curr,
          }
        ],
      }),
      {
        xOffset: (this.props.offset || 0) * this.xScale,
        data: []
      }
    ).data;
  }

  render() {
    return (
      <svg width="100%" height="100%" viewBox="0 0 360 360" className={this.props.className}>
        <circle
          cx="180"
          cy="180"
          r="159.1549430918954"
          fill="transparent"
          stroke="#e1e8ee"
          strokeWidth="20"
        />
        {this.state.data.map((ring, key) => (
          <circle
            key={key}
            cx="180"
            cy="180"
            r="159.9549430918954"
            fill="transparent"
            stroke={ring.origin.color}
            strokeWidth="20.7"
            strokeDasharray={`${ring.y} ${this.yScale - ring.y}`}
            strokeDashoffset={-ring.x}
          />
        ))}
        {this.props.children}
      </svg>
    );
  }
}