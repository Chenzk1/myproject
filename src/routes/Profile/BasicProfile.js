import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Carousel, Timeline } from 'antd';
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

export default class BasicProfile extends Component {
  render() {
    return (
      <PageHeaderLayout title="两片罐生产工艺流程图" >
        <Card title="总体流程图">
        <img src={zt} alt="总体流程" height="100%" width="100%" />
        </Card>
        <Card title="分步示意图" style={{marginTop:16}}>
          <Timeline>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>开卷->润滑->冲杯</b><img src={cb} alt="开卷 润滑 冲杯"/>
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>拉伸</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={ls} alt="拉伸" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>修边</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={xb} alt="修边" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>洗罐</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={xg} alt="洗罐" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>打底</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={dd} alt="打底" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>彩印</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={cy} alt="彩印" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>内喷涂</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={npt} alt="内喷涂" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>缩颈</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={sj} alt="缩颈" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>翻边</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={fb} alt="翻边" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>变形</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={reform} alt="变形" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>光检</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={gj} alt="光检" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>外检</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={wj} alt="外检" />
              </a>
            </Timeline.Item>
            <Timeline.Item color="green">
              <a href="http://www.cofcopack.com/s/products.php?p=10" target="blank">
              <b>打包码垛</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={last} alt="打包码垛" />
              </a>
            </Timeline.Item>
          </Timeline>
        </Card>
      </PageHeaderLayout>
    );
  }
}
