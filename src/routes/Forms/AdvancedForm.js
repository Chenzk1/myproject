import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
  Tabs,
  Radio,
  Table,
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from './TableForm';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

@connect(({loading})=>({
    submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()//经 Form.create() 包装过的组件会自带 this.props.form 属性，直接传给 Form 即可。
class AdvancedForm extends PureComponent {
  //此函数在submit后处理提交的form，先进行校验，如果校验通过则dispatch action
    handleSubmit = e =>{
        //e是合成事件，preventDefault是阻止默认操作
        e.preventDefault();
        //校验并获取一组输入域的值与 Error，校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){//这是react，发出action->model.form.effect中有此函数，然后调用了一个fake->service,到mock
                this.props.dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    };

  state = {
    width: '100%',
  };
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  };
  render() {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;

    const formItemLayout = {
            labelCol: {
            xs: { span: 24 },
            sm: { span: 7 },
            },
            wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 10 },
            },
        };
    const submitFormLayout = {
        wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
        },
    };

    const classColumns = [{
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
            },  {
            title: '交付时间',
            key: 'time',
            render:()=>(
              <span>
                <DatePicker placeholder={['交付日期']} style={{ width: '100%' }} />
              </span>
            )                                                
        }];
    const productColumns = [{
        title: '物料编号',
        dataIndex: 'ID',
        key: 'ID',
        },{
        title: '物料描述',//列头显示文字
        dataIndex: 'name',//在数据项中的key，则data中要有个name项
        key: 'name',//React需要的key，有dataIndex则无需
        }, {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        }, {
        title: '单位',
        dataIndex: 'standard',
        key: 'standard',
        }, {
        title: '现有库存',
        dataIndex: 'remain',
        key: 'remain', 
        }, {
        title: '交付时间',
        key: 'time',
        render:()=>(
          <span>
            <DatePicker placeholder={['交付日期']} style={{ width: '100%' }} />
          </span>
        )                                              
    }];
    const productData = [
      {
        ID:25100340,
        name:"印刷辊φ90.5x196.7",
        num:20,
        standard:'PC',
        remain:2,
      }, {
        ID:25100341,
        name:"印刷辊φ92.08x196.7",
        num:15,
        standard:'PC',
        remain:5,
      }, {
        ID:25100342,
        name:"印刷辊φ75.0x196.7",
        num:10,
        standard:'PC',
        remain:5,
      }, {
        ID:250401340,
        name:"油管接头",
        num:4,
        standard:'EA',
        remain:2,
      }, {
        ID:250401668,
        name:"英制针规0.021″",
        num:2,
        standard:'PC',
        remain:0,
      }
    ];
    const classAData = [{
        key: '1',
        ID: 1602,
        name: '台州石梁百威哈冰爽',
        num: 40,
        standard: 500,
      },{
        key: '2',
        ID: 1701,
        name: '杭州青啤崂山金指环',
        num: 25,
        standard: 500,
      },{
        key: '3',
        ID: 1702,
        name: '杭州青啤崂山金指环',
        num: 30,
        standard: 500,
      },{
        key: '4',
        ID: 1503,
        name: '余杭华润8度勇闯天涯',
        num: 100,
        standard: 330,
      },{
        key: '5',
        ID: 1705,
        name: '浙江太古可乐',
        num: 150,
        standard: 330,
    }];
    const classBData = [{
        key: '1',
        ID: 1602,
        name: '台州石梁百威哈冰爽',
        num: 40,
        standard: 500,
      },{
        key: '2',
        ID: 1703,
        name: '杭州青啤崂山金指环',
        num: 25,
        standard: 500,
      },{
        key: '3',
        ID: 1702,
        name: '杭州青啤崂山金指环',
        num: 30,
        standard: 500,
      },{
        key: '4',
        ID: 1601,
        name: '锐澳微醺',
        num: 100,
        standard: 330,
      },{
        key: '5',
        ID: 1605,
        name: '浙江太古可乐',
        num: 150,
        standard: 330,
    }];
    const classCData = [{
        key: '1',
        ID: 1602,
        name: '台州石梁百威哈冰爽',
        num: 40,
        standard: 500,
      },{
        key: '2',
        ID: 1701,
        name: '杭州青啤崂山金指环',
        num: 25,
        standard: 500,
      },{
        key: '3',
        ID: 1702,
        name: '杭州青啤崂山金指环',
        num: 30,
        standard: 500,
      },{
        key: '4',
        ID: 1601,
        name: '锐澳微醺',
        num: 100,
        standard: 330,
      },{
        key: '5',
        ID: 1701,
        name: '浙江太古可乐',
        num: 150,
        standard: 330,
    }];
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    return (
      <PageHeaderLayout wrapperClassName={styles.advancedForm}>
        <Card title="订单管理" className={styles.card} bordered={false}>
          <Tabs defaultActiveKey="A" size="large" tabBarStyle={{ marginBottom: 24 }}>
            <TabPane tab="A组" key="A">
                <Table
                    selectedRows 
                    columns={classColumns} 
                    dataSource={classAData} 
                />
            </TabPane>
            <TabPane tab="B组" key="B">
                <Table
                    selectedRows 
                    columns={classColumns} 
                    dataSource={classBData} 
                />
            </TabPane>
            <TabPane tab="C组" key="C">
                <Table
                    selectedRows 
                    columns={classColumns} 
                    dataSource={classCData} 
                />
            </TabPane>
          </Tabs>
          <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
              添加
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 450, marginTop: 8, marginBottom: 8 }} loading={submitting}>
                提交
          </Button>
          <Button style={{marginLeft:16}}>保存</Button>
        </Card>
        <Card title="采购申请" className={styles.card} bordered={false}>
          <Table
              selectedRows 
              columns={productColumns} 
              dataSource={productData} 
          />
          <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
              添加
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 450, marginTop: 8, marginBottom: 8 }} loading={submitting}>
                提交
          </Button>
          <Button style={{marginLeft:16}}>保存</Button>
        </Card>
        <Card bordered={false} title="成员管理|新增人员" style={{marginTop:16}}>
            <Form onSubmit={this.handleSubmit} style={{marginTop:8}}>
                <FormItem {...formItemLayout} label="姓名">
                    {//这个函数是包装控件。经过 getFieldDecorator 包装的控件，表单控件会自动添加value和onChange
                    }
                    {getFieldDecorator('title',{
                    rules:[
                        {
                            required: true,
                            message: '请输入姓名',
                        },
                    ],
                    })(<Input placeholder="请输入姓名" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="性别">
                    {//这个函数是包装控件。经过 getFieldDecorator 包装的控件，表单控件会自动添加value和onChange
                    }
                    {getFieldDecorator('gender',{
                        rules:[
                            {
                                required: true,
                                message: '请输入性别',
                            },
                        ],
                    })(
                        <div>
                        {getFieldDecorator('gender',{
                            initialValue: "1",
                        })(
                            <Radio.Group>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </Radio.Group>                                        
                        )}
                        </div>
                    )} 
                </FormItem>
                <FormItem {...formItemLayout} label="出生日期">
                    {getFieldDecorator('date-picker', {
                        rules: [
                        {
                            required: false,
                            message: '请输入日期',
                        },
                        ],
                    })(<DatePicker />)}
                </FormItem>
                <FormItem {...formItemLayout} label="部门">
                    {getFieldDecorator('department', {
                        rules: [
                        {
                            required: true,
                            message: '所属部门',
                        },
                        ],
                    })(<Input placeholder="请输入所属部门"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="联系方式">
                    {getFieldDecorator('tel', {
                        rules: [
                        {
                            required: true,
                            message: '联系方式',
                        },
                        ],
                    })(<Input placeholder="请输入电话号码"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="职位">
                    {//这个函数是包装控件。经过 getFieldDecorator 包装的控件，表单控件会自动添加value和onChange
                    }
                    {getFieldDecorator('place',{
                        rules:[
                            {
                                required: false,
                                message: '请输入职称',
                            },
                        ],
                    })(
                        <div>
                        {getFieldDecorator('place',{
                            initialValue: "1",
                        })(
                            <Radio.Group>
                                <Radio value="1">总经理</Radio>
                                <Radio value="2">副总经理</Radio>                                        
                                <Radio value="3">高级工程师</Radio>
                                <Radio value="4">工程师</Radio>
                                <Radio value="5">总监</Radio>
                                <Radio value="6">厂长</Radio>
                                <Radio value="7">主任</Radio>
                                <Radio value="8">经理</Radio>
                                <Radio value="8">工人</Radio>                                                                                                                                                                                                                                                                            
                            </Radio.Group>                                        
                        )}
                        </div>
                    )} 
                </FormItem>
                <FormItem {...formItemLayout} label="描述">
                    {getFieldDecorator('description', {
                        rules: [
                        {
                            required: false,
                            message: '请输入描述',
                        },
                        ],
                    })(
                        <Input
                        style={{ minHeight: 32 }}
                        placeholder="请输入个人描述"
                        rows={4}
                        />
                    )}
                </FormItem>
                <FormItem>
                    <p style={{marginLeft:400}}>
                        注：标注*的选项为必填项
                    </p>
                </FormItem>
                <FormItem {...submitFormLayout} style={{marginTop:22}}>
                    <Button type="primary" htmlType="submit" loading={submitting}>
                        提交
                    </Button>
                    <Button style={{marginLeft:16}}>保存</Button>
                </FormItem>
            </Form>
        </Card>
        <FooterToolbar style={{ width: this.state.width }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(AdvancedForm));
