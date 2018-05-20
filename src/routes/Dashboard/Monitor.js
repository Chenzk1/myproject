import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Progress, List, Table } from 'antd';
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

  render() {
    const { monitor, loading } = this.props;

    const taskColumn =  [{
      title: '订单编号',
      dataIndex: 'ID',
      key: 'ID',
      },{
      title: '订单名',//列头显示文字
      dataIndex: 'name',//在数据项中的key，则data中要有个name项
      key: 'name',//React需要的key，有dataIndex则无需
      }, {
      title: '数量(万罐)',
      dataIndex: 'num',
      key: 'num',
      }, {
      title: '规格(ml)',
      dataIndex: 'standard',
      key: 'standard',
      }, {
      title: '进度',
      key: 'progress',
      width: 400,
      render: ({data,status}) =>(
        <span>
          <Progress percent={data} style={{ strokeWidth:"8", width: '100%',height: '16' }} />
        </span>
      )                                                
    }];
    const taskData = [{
        key: '1',
        ID: 1602,
        name: '台州石梁百威哈冰爽',
        num: 40,
        standard: 500,
        data: 100,
      },{
        key: '2',
        ID: 1705,
        name: '浙江太古可乐',
        num: 150,
        standard: 330,
        data: 100,
      },{
        key: '3',
        ID: 1701,
        name: '杭州青啤崂山金指环',
        num: 25,
        standard: 500,
        data: 48,
        status: 'active',
      },{
        key: '4',
        ID: 1702,
        name: '锐澳微醺',
        num: 30,
        standard: 500,
        data:83,
        status: "active",
      },{
        key: '5',
        ID: 1503,
        name: '余杭华润8度勇闯天涯',
        num: 100,
        standard: 330,
        data:56,
      },{
        key: '6',
        Id: 1505,
        name: '黄河青稞',
        num: 600,
        standard: 500,
        data:16,
        status: "active",
    }];

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
        <Card title="当前任务生产进度" className={styles.card} style={{marginBottom: 24}}>
          <Table
              selectedRows 
              columns={taskColumn} 
              dataSource={taskData}
          />
        </Card>
        <Row gutter={24}>
          <Col xl={18} lg={24} sm={24} xs={24}>
            <Card title="各厂家生产占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '0 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="加多宝"
                    total="24%"
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
                    total="14%" //这是显示值
                    height={148}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#7F2CB5"
                    percent={9}
                    subTitle="其它"
                    total="19%"
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
                  subTitle="500ml"
                  total="62%"
                  height={148}
                  lineWidth={2}
                />
              </Row>
              <Row style={{ padding: '0 0' }}>
                <Pie
                  animate={true}
                  percent={38}
                  subTitle="330ml"
                  total="38%"
                  height={148}
                  lineWidth={2}
                />
              </Row>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
