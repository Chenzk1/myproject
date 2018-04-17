import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Carousel } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';
import zt from '../../assets/zongti.jpg';
import cb from '../../assets/chongbei.png';
import ls from '../../assets/lashen.png';
import xb from '../../assets/xiubian.png';
import xg from '../../assets/xiguan.png';
import dd from '../../assets/dadi.png';
import cy from '../../assets/caiyin.png';
import npt from '../../assets/neipentu.png';
import sj from '../../assets/suojing.png';
import fb from '../../assets/fanbian.png';
import reform from '../../assets/reform.png';
import gj from '../../assets/guangjian.png';
import wj from '../../assets/waijian.png';
import last from '../../assets/last.png';

const { Description } = DescriptionList;
/*
const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="processing" text="进行中" />
      ),
  },
  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
*/

export default class BasicProfile extends Component {
  /*componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }*/

  render() {
    /*
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '商品编号',
        dataIndex: 'id',
        key: 'id',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return <a href="">{text}</a>;
          }
          return {
            children: <span style={{ fontWeight: 600 }}>总计</span>,
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '商品条码',
        dataIndex: 'barcode',
        key: 'barcode',
        render: renderContent,
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'right',
        render: renderContent,
      },
      {
        title: '数量（件）',
        dataIndex: 'num',
        key: 'num',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    */
    return (
      <PageHeaderLayout title="两片罐生产工艺流程图">
        <h2>总体流程图</h2>
        <img src={zt} alt="总体流程" height="100%" width="100%" />
        <br />
        <h2>分布示意图</h2>
        <Carousel>
          <div>
            <img src={cb} alt="开卷 润滑 冲杯" height="86%" width="100%" />
          </div>
          <div>
            <img src={ls} alt="拉伸" />
          </div>
          <div>
            <img src={xb} alt="修边" />
          </div>
          <div>
            <img src={xg} alt="洗罐" />
          </div>
          <div>
            <img src={dd} alt="打底" />
          </div>
          <div>
            <img src={cy} alt="彩印" />
          </div>
          <div>
            <img src={npt} alt="内喷涂" />
          </div>
          <div>
            <img src={sj} alt="缩颈" />
          </div>
          <div>
            <img src={fb} alt="翻边" />
          </div>
          <div>
            <img src={reform} alt="变形" />
          </div>
          <div>
            <img src={gj} alt="光检" />
          </div>
          <div>
            <img src={wj} alt="外检" />
          </div>
          <div>
            <img src={last} alt="打包码垛" />
          </div>
        </Carousel>
        {/*
        <Card bordered={false}>
          <DescriptionList size="large" title="退款申请" style={{ marginBottom: 32 }}>
            <Description term="取货单号">1000000000</Description>
            <Description term="状态">已取货</Description>
            <Description term="销售单号">1234123421</Description>
            <Description term="子订单">3214321432</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
            <Description term="用户姓名">付小小</Description>
            <Description term="联系电话">18100000000</Description>
            <Description term="常用快递">菜鸟仓储</Description>
            <Description term="取货地址">浙江省杭州市西湖区万塘路18号</Description>
            <Description term="备注">无</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>退货商品</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>退货进度</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
        */}
      </PageHeaderLayout>
    );
  }
}
