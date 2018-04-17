import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip } from 'antd';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import Authorized from '../../utils/Authorized';
import styles from './Monitor.less';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
//promise是一个异步处理函数，resolve和reject是自带的两个参数
//resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }

  render() {
    const { monitor, loading } = this.props;
    const { tags } = monitor;

    return (
      <Fragment>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card title="活动情况预测" style={{ marginBottom: 24 }} bordered={false}>
              <ActiveChart />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="生产目标"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={202} title="生产目标剩余" percent={34} />
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={18} lg={24} sm={24} xs={24}>
            <Card title="各厂家生产占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '0 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="加多宝"
                    total="28%"
                    height={148}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={17}
                    subTitle="百威冰醇"
                    total="17%" //这是显示值
                    height={148}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={15}
                    subTitle="可口可乐"
                    total="15%"
                    height={148}
                    lineWidth={2}
                  />
                </Col>
              </Row>
              <Row style={{ padding: '0 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#9FC25B"
                    percent={11}
                    subTitle="青岛啤酒"
                    total="11%"
                    height={148}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2D6ECF"
                    percent={20}
                    subTitle="昆明华狮"
                    total="20%" //这是显示值
                    height={148}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#7F2CB5"
                    percent={9}
                    subTitle="华润纯生"
                    total="9%"
                    height={148}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card title="各罐种生产占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '0 0' }}>
                <Pie
                  animate={true}
                  percent={62}
                  subTitle="330ml"
                  total="62%"
                  height={148}
                  lineWidth={2}
                />
              </Row>
              <Row style={{ padding: '0 0' }}>
                <Pie
                  animate={true}
                  percent={38}
                  subTitle="500ml"
                  total="38%"
                  height={148}
                  lineWidth={2}
                />
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ padding: '16px 0' }}>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="热门搜索"
              loading={loading}
              bordered={false}
              bodyStyle={{ overflow: 'hidden' }}
            >
              <TagCloud data={tags} height={161} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="资源剩余"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} title="补贴资金剩余" percent={34} />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
