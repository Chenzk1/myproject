import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Button } from 'antd';

import { Radar } from 'components/Charts';
import EditableLinkGroup from 'components/EditableLinkGroup';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import avatar from '../../assets/avatar.jpg';

import styles from './BasicList.less';
const { Meta } = Card;

@connect(({ project, activities, chart, loading }) => ({
  project,
  activities,
  chart,
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
export default class BasicList extends PureComponent {
  state = {
      text1: "未完成",
      text2: "未完成",
      text3: "未完成",
      text4: "未完成",
      text5: "未完成",
      text6: "未完成",      
  }
  handleClick1 = (e) => {
    if(this.state.text1 == "未完成")
    this.setState({text1:"已完成"})
    else
    this.setState({text1:"未完成"})    
  }
  handleClick2 = (e) => {
    if(this.state.text2 == "未完成")
    this.setState({text2:"已完成"})
    else
    this.setState({text2:"未完成"})    
  }
  handleClick3 = (e) => {
    if(this.state.text3 == "未完成")
    this.setState({text3:"已完成"})
    else
    this.setState({text3:"未完成"})    
  }
  handleClick4 = (e) => {
    if(this.state.text4 == "未完成")
    this.setState({text4:"已完成"})
    else
    this.setState({text4:"未完成"})    
  }
  handleClick5 = (e) => {
    if(this.state.text5 == "未完成")
    this.setState({text5:"已完成"})
    else
    this.setState({text5:"未完成"})    
  }
  handleClick6 = (e) => {
    if(this.state.text6 == "未完成")
    this.setState({text6:"已完成"})
    else
    this.setState({text1:"未完成"})    
  }
  
  render() {
    const text1 = this.state.text1;
    const text2 = this.state.text2;
    const text3 = this.state.text3;
    const text4 = this.state.text4;
    const text5 = this.state.text5;
    const text6 = this.state.text6;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>任务数</p>
          <p>9</p>
        </div>
        <div className={styles.statItem}>
          <p>待完成</p>
          <p>
            6<span> / 9</span>
          </p>
        </div>
      </div>
    );
    const gridStyle = {
      width: '33%',
      textAlign: 'center',
    };
    
    return (
      <PageHeaderLayout>
        <Row gutter={24}>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              hoverable
              cover={<img alt="头像" src={avatar} height='455' />}
              height
            >
              <Meta
                title="陈仲锴"
              />
              <br/>
              实习生|杭州中粮 
              浙江大学电气工程学院
              chenzk666@gmail.com
          </Card>
          </Col>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={extraContent}
              bodyStyle={{ padding: 0 }}
            >
              <Card.Grid style={gridStyle}>
                <Meta title="方案拟定" description="进行毕业设计的方案拟定"/>
                <br/>
                <Button type="danger">已完成</Button>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta title="撰写中期报告" description="进行中期报告的撰写"/>
                <br/>
                <Button type="danger">已完成</Button>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta title="前端程序编写" description="进行数据分析系统的前端程序设计"/>
                <br/>
                <Button type="danger">已完成</Button>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta title="后端程序编写" description="进行数据分析系统的后端程序设计"/>
                <br/>
                <Button type="primary" onClick={this.handleClick1}>{text1}</Button>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta title="API编写" description="进行数据分析系统的API编写"/>
                <br/>
                <Button type="primary" onClick={this.handleClick2}>{text2}</Button>
              </Card.Grid><Card.Grid style={gridStyle}>
                <Meta title="PLC程序设计" description="进行数据采集系统的PLC程序设计"/>
                <br/>
                <Button type="primary" onClick={this.handleClick3}>{text3}</Button>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta title="监控界面设计" description="进行数据采集系统的监控界面设计"/>
                <br/>
                <Button type="primary" onClick={this.handleClick4}>{text4}</Button>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta title="撰写毕业论文" description="撰写毕业论文"/>
                <br/>
                <Button type="primary" onClick={this.handleClick5}>{text5}</Button>
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <Meta title="毕业设计答辩" description="毕业设计答辩"/>
                <br/>
                <Button type="primary" onClick={this.handleClick6}>{text6}</Button>
              </Card.Grid>
            </Card>
           </Col>
          </Row>
      </PageHeaderLayout>
    );
  }
}
