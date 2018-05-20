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
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker,MonthPicker } = DatePicker;
const rankingListData = [
  {
    title:"冲杯拉伸",
    total:494540
  },{
    title:"清洗",
    total:474039
  },{
    title:"清洗",
    total:4457797
  },{
    title:"内涂",
    total:487506
  },{
    title:"缩翻",
    total:3360763
  },{
    title:"成品",
    total:296255
  },{
    title:"质检",
    total:1076672
  },{
    title:"重工",
    total:529056
  },
];

@connect(({ reject, loading }) => ({
  reject,
  loading: loading.effects['reject/fetch'],
}))
export default class Reject extends Component {
  state = {
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'reject/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'reject/clear',
    });
  }

  render() {
    const { rangePickerValue, currentTabKey } = this.state;
    const { reject, loading } = this.props;
    const { 
        rejectYear,
        rejectMonth,
        rejectPercent,
        rejectFenbu,
    } = reject;

    const columns = [
      {
        title: '月份',
        dataIndex: 'month',
        key: 'month',
      },
      {
        title: '入库产量',
        dataIndex: 'totalProduct',
        key: 'totalProduct',
      },
      {
        title: '合格产量',
        dataIndex: 'qualifyProduct',
        key: 'qualifyProduct',
      },
      {
        title: '废品量',
        dataIndex: 'totalWaste',
        key: 'totalWaste',
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

    return (
      <Fragment>
        <Card
          loading={loading}
          bordered={false}
          title="2017年废品产量统计"
          extra={<MonthPicker placeholder="请选择月份" />}
          style={{ marginBottom: 24 }}
        >
          <Table
            size="middle"
            columns={columns}
            dataSource={rejectYear}
            pagination={{
              style: { marginBottom: 0 },
              pageSize: 6,
            }}
          />
        </Card>
        <Row gutter = {24} >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="月度废品量"
              footer={<Field label="年度废品量" value="15103070" />}
              contentHeight={140}
            >
              <MiniArea color="#6432E4" data={rejectMonth} />
            </ChartCard>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="月度废品率"
              footer={<Field label="年度废品率" value="3.6%" />}
              contentHeight={140}
            >
              <MiniArea color="#375FE4" data={rejectPercent} />
            </ChartCard>
          </Col>
        </Row>
        <Card
          loading={loading}
          bordered={false}
          title="废品分布统计"
          extra={<MonthPicker placeholder="请选择月份" />}
          style={{ marginTop: 24, marginBottom: 24}}
        >
          <Row>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesBar} width={700}>
                <Bar style={{ height: 295, width: 700}} data={rejectFenbu} />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.salesRank}>
                <ul className={styles.rankingList}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                      <span>{item.title}</span>
                      <span>{numeral(item.total).format('0,0')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}
