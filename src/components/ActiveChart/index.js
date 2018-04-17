import React, { Component } from 'react';

import { MiniArea } from '../Charts';
import NumberInfo from '../NumberInfo';

import styles from './index.less';

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val; //此处为模板字符串，用反撇号括起来${}，即可以直接输出0val
} //所以此函数的目的是，小于10给前面加0

function getActiveData() {
  const activeData = [];
  for (let i = 0; i <= new Date().getHours(); i += 1) {
    activeData.push({
      x: `${fixedZero(i)}:00`,
      y: Math.floor(Math.random() * 100) + i * 100, //floor函数可以得到一个下舍入的整数
    });
  }
  return activeData;
}

export default class ActiveChart extends Component {
  state = {
    activeData: getActiveData(),
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        activeData: getActiveData(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { activeData = [] } = this.state;

    return (
      <div className={styles.activeChart}>
        <NumberInfo subTitle="生产任务完成情况" total="杭州中粮制罐有限公司两片罐产量实时反馈" />
        <div style={{ marginTop: 32 }}>
          <MiniArea
            animate={false}
            line
            borderWidth={2}
            height={84}
            scale={{
              y: {
                tickCount: 3,
              },
            }}
            yAxis={{
              tickLine: false,
              label: false,
              title: false,
              line: false,
            }}
            data={activeData}
          />
        </div>
        {activeData && ( //显示数据
          <div className={styles.activeChartGrid}>
            <p>当日产量：{[...activeData].sort()[Math.floor(activeData.length / 4)].y} 万罐</p>
            <p>月总产量：{[...activeData].sort()[activeData.length - 1].y + 200} 万罐</p>
          </div>
        )}
        {activeData && ( //3个坐标值
          <div className={styles.activeChartLegend}>
            <span>5.1</span>
            <span>{activeData[Math.floor(activeData.length / 2)].x}</span>
            <span>{activeData[activeData.length - 1].x}</span>
          </div>
        )}
      </div>
    );
  }
}
