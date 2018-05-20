import React, {
  Component,
  Fragment
} from 'react';
import {
  connect
} from 'dva';
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
  Button,
  Alert
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
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
//根据时间类型day/week/year返回[此时，此时前一秒/前一周/前一月]，由此而确定timePicker上的日期区间
import {
  getTimeDistance
} from '../../utils/utils';

import styles from './Analysis.less';

const {
  TabPane
} = Tabs;
const {
  RangePicker,
  MonthPicker
} = DatePicker;

//ES6装饰器，省去了原来的connect()()
@connect(({
  product,
  loading
}) => ({
  product,
  loading: loading.effects['product/fetch'],
}))
export default class Product extends Component {
  state = {
    currentTabKey: '',
    rangePickerValue: getTimeDistance('week'),
  };
  //UI组件中用state，redux的容器组件中用props
  componentDidMount() {
    this.props.dispatch({
      type: 'product/fetch',
    });
  }

  componentWillUnmount() {
    const {
      dispatch
    } = this.props;
    dispatch({
      type: 'product/clear',
    });
  }

  // handleRangePickerChange = rangePickerValue =>{
  //   this.setState({
  //     rangePickerValue,
  //   });
  //   this.props.dispatch({
  //     type: 'product/fetchProductData',//待改进
  //   });
  // };

  render() {
    const {
      rangePickerValue,
      currentTabKey
    } = this.state;
    const {
      product,
      loading
    } = this.props;
    const {
      monthData,
      yearData,
      dayData
    } = product;

    const columns = [{
        title: '月份',
        dataIndex: 'month',
        key: 'month',
      },
      {
        title: '订单号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '描述',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '产量',
        dataIndex: 'num',
        key: 'num',
      }
    ];
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: {
        marginBottom: 24
      },
    };
    const gridStyle = {
      width: '14%',
      textAlign: 'center',
    };
    return (
      //<Fragment>
      <
      PageHeaderLayout >
      <
      Card loading = {
        loading
      }
      title = "2017年月产量曲线"
      style = {
        {
          marginBottom: 24
        }
      }
      className = {
        styles.salesCard
      } >
      <
      div className = {
        styles.salesBar
      } >
      <
      Bar height = {
        295
      }
      data = {
        yearData
      }
      width = {
        900
      }
      /> <
      /div> <
      /Card> <
      Card loading = {
        loading
      }
      bordered = {
        false
      }
      title = "2017年生产详细信息"
      extra = { < MonthPicker placeholder = "请选择月份" / >
      }
      style = {
        {
          marginBottom: 24
        }
      } >
      <
      Table size = "middle"
      columns = {
        columns
      }
      dataSource = {
        monthData
      }
      pagination = {
        {
          style: {
            marginBottom: 0
          },
          pageSize: 10,
        }
      }
      /> <
      Button type = "primary" > 打印 < /Button> <
      Button type = "primary"
      style = {
        {
          marginLeft: 16
        }
      } > 导出 < /Button>   <
      /Card> <
      /PageHeaderLayout>      
      //</Fragment>
    );
  }
}
