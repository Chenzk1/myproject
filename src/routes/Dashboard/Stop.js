import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
  Radar,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker,MonthPicker } = DatePicker;

@connect(({ stop, loading }) => ({
  stop,//namespace
  loading: loading.effects['stop/fetch'],
}))
export default class Stop extends Component {
  state = {
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'stop/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'stop/clear',
    });
  }

  // handleChangeSalesType = e => {
  //   this.setState({
  //     salesType: e.target.value,
  //   });
  // };

  // handleTabChange = key => {
  //   this.setState({
  //     currentTabKey: key,
  //   });
  // };

  // handleRangePickerChange = rangePickerValue => {
  //   this.setState({
  //     rangePickerValue,
  //   });

  //   this.props.dispatch({
  //     type: 'chart/fetchSalesData',
  //   });
  // };

  // selectDate = type => {
  //   this.setState({
  //     rangePickerValue: getTimeDistance(type),
  //   });

  //   this.props.dispatch({
  //     type: 'chart/fetchSalesData',
  //   });
  // };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { stop, loading } = this.props;
    const {
      stopCause,
      stopCausePie,
      stopFaultPie,
      stopRadar,
      cbls,
      qxddcy,
      sfcp,
      hgnt,
      ffsb
    } = stop;
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '停机原因',
        dataIndex: 'reason',
        key: 'reason',
      },
      {
        title: '停机工时(h)',
        dataIndex: 'time',
        key: 'time',
        sorter: (a, b) => a.time - b.time,
        align: 'right',
      },
      {
        title: '占比',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        align: 'right',
      },
    ];
    const columnsfault = [
      {
        title: '停机原因',
        dataIndex: 'reason',
        key: 'reason',
      },
      {
        title: '停机工时(h)',
        dataIndex: 'time',
        key: 'time',
        sorter: (a, b) => a.time - b.time,
        align: 'right',
      },
      {
        title: '占比',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        align: 'right',
      },
    ];
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };
    const stopElectrical = [{
      x: "1月",
      y: 1.58,
    },{
      x: "2月",
      y: 3.56,
    },{
      x: "3月",
      y: 3.50,
    },{
      x: "4月",
      y: 0.67,
    },{
      x: "5月",
      y: 3.42,
    },{
      x: "6月",
      y: 9.18,
    },{
      x: "7月",
      y: 6.90,
    },{
      x: "8月",
      y: 9.50,
    },{
      x: "9月",
      y: 5.02,
    },{
      x: "10月",
      y: 0.88,
    },{
      x: "11月",
      y: 4.66,
    },{
      x: "12月",
      y: 4.95,
    }
    ];
    const stopMachinery = [{
      x: "1月",
      y: 18.88,
    },{
      x: "2月",
      y: 26.21,
    },{
      x: "3月",
      y: 20.43,
    },{
      x: "4月",
      y: 17.44,
    },{
      x: "5月",
      y: 19.37,
    },{
      x: "6月",
      y: 17.96,
    },{
      x: "7月",
      y: 23.93,
    },{
      x: "8月",
      y: 19.34,
    },{
      x: "9月",
      y: 10.87,
    },{
      x: "10月",
      y: 6.44,
    },{
      x: "11月",
      y: 13.23,
    },{
      x: "12月",
      y: 13.41,
    }
    ];
    return (
      <Fragment>
        {/*<Row gutter = {24} >
         <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="访问量"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(8846).format('0,0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea color="#375FE4" data={visitData} />
            </ChartCard>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="支付笔数"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(6560).format('0,0')}
              footer={<Field label="转化率" value="60%" />}
              contentHeight={46}
            >
              <MiniBar data={visitData} />
            </ChartCard>
          </Col>
        </Row>*/}
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="2017年停机工时统计"
              extra={<MonthPicker placeholder="请选择月份" />}
              style={{ marginTop: 24 }}
            >
              <Table
                size="middle"
                columns={columns}
                dataSource={stopCause}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 12,
                }}
              />
            </Card>
          </Col>
        </Row>
        <Card
          loading={loading}
          className={styles.salesCard}
          bordered={false}
          title="停机工时占比"
          bodyStyle={{ padding: 24 }}
          style={{ marginTop: 24, minHeight: 509 }}
        >
          <Pie
            hasLegend
            subTitle="停机工时占比"
            total="1770h"
            data={stopCausePie}
            //valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
            height={248}
            lineWidth={4}
          />
        </Card>
        <Card
          loading={loading}
          bordered={false}
          title="2017年故障停机工时统计"
          style={{ marginTop: 24, marginBottom: 24}}
        >
          <div className={styles.salesCard}>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="冲杯-拉伸区" key="cb-ls">
                <Table
                  size="middle"
                  columns={columnsfault}
                  dataSource={cbls}
                  pagination={{
                    style: { marginBottom: 0 },
                    pageSize: 8,
                  }}
                />
              </TabPane>
              <TabPane tab="清洗-打底-彩印区" key="qx-dd-cy">
                <Table
                  size="middle"
                  columns={columnsfault}
                  dataSource={qxddcy}
                  pagination={{
                    style: { marginBottom: 0 },
                    pageSize: 8,
                  }}
                />
              </TabPane>
              <TabPane tab="烘干-内涂区" key="hg-nt">
                <Table
                  size="middle"
                  columns={columnsfault}
                  dataSource={hgnt}
                  pagination={{
                    style: { marginBottom: 0 },
                    pageSize: 8,
                  }}
                />
              </TabPane>
              <TabPane tab="缩翻-成品区" key="sf-cp">
                <Table
                  size="middle"
                  columns={columnsfault}
                  dataSource={sfcp}
                  pagination={{
                    style: { marginBottom: 0 },
                    pageSize: 8,
                  }}
                />
              </TabPane>
              <TabPane tab="辅房设备" key="ffsb">
                <Table
                  size="middle"
                  columns={columnsfault}
                  dataSource={ffsb}
                  pagination={{
                    style: { marginBottom: 0 },
                    pageSize: 8,
                  }}
                />
              </TabPane>
            </Tabs>
          </div>
        </Card>
        <Row gutter={24} Style={{ marginBottom: 24 }}>
          <Col xl={14} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="各工序区域故障占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginBottom: 24 }}              
            >
              <Pie
                hasLegend
                subTitle="各工序区域故障占比"
                total="278h"
                data={stopFaultPie}
                //valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
                height={343}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col xl={10} lg={24} md={24} sm={24} xs={24}>          
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="各工序区域故障雷达图"
              loading={loading}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={stopRadar} />
              </div>
            </Card> 
          </Col>
        </Row>       
        <Card 
          bordered={false} 
          Style={{ marginTop: 24 }} 
          title = "电气故障和机械故障停机占比" >
          <div className={styles.salesCard}>
            <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="电气故障" key="sales">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} data={stopElectrical} />
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="机械故障" key="views">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={292} data={stopMachinery} />
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </Fragment>
    );
  }
}
