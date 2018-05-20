//@connect：技术上讲你可以直接使用 store.subscribe() 来编写容器组件。但不建议这么做的原因是无法使用 React Redux 带来的性能优化。也因此，不要手写容器组件，而使用 React Redux 的 connect() 方法来生成，后面会详细介绍。
//函数名前加*，是generator函数。
//只有调用next才执行，*函数中的yield标识此处暂停，在下次generator().next之后继续运行
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Dropdown,
  Menu,
  Modal,
  message,
  Badge,
  Diver,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Table,
  Icon,
  Tooltip,
  Divider,
  Tabs
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {Option} = Select;
const { MonthPicker } = DatePicker;
//connect出现在view的react里，submitting是reactUI组件，：后面是与之关联的redux组件
//react的state:loading与redux的UI组件组合
//加@这种写法是ES6的装饰器写法，原本是connect()()，这样的话React组件不用写了
@connect(({list,loading})=>({
    list,
    submitting: loading.effects['form/submitRegularForm'],
    loading: loading.models.list,
}))
@Form.create()//经 Form.create() 包装过的组件会自带 this.props.form 属性，直接传给 Form 即可。
export default class BasicForm extends PureComponent{
    componentDidMount(){
        this.props.dispatch({
            type:'list/fetch',
            payload: {count: 5,},
        });
    }
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

    render() {
        //容器组件与UI组件实现关联。this.props是UI组件里的，=前面的是容器组件里的。
        const {submitting, loading, list:{list}} = this.props;//这句话能够把属性（props）中的对象testdata解析出来。
        const { getFieldDecorator, getFieldValue } = this.props.form;
        //const {monthPickerValue} = this.state;
        const classGrades = (
            <div>
                <MonthPicker
                style={{ width: 256 }}
                />
            </div>
        );
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

        const columns = [{
            title: '编号',
            dataIndex: 'ID',
            key: 'ID',
            },{
            title: '姓名',//列头显示文字
            dataIndex: 'name',//在数据项中的key，则data中要有个name项
            key: 'name',//React需要的key，有dataIndex则无需
            }, {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
            }, {
            title: '打卡天数',
            dataIndex: 'days',
            key: 'days',
            },  {
            title: '职称',
            dataIndex: 'position',
            key: 'position',
            }, {
            title: '操作',
            key: 'action',
            render: () => (
                <span>
                    <Tooltip title="待开发">
                        <a href='/basic-form'>删除</a>
                    </Tooltip>
                    <Divider type='vertical' />
                    <Tooltip title="待开发">
                        <a href='/basic-form'>修改</a>
                    </Tooltip>
                    <Divider type='vertical' />
                    <Tooltip title="待开发">
                        <a href='/basic-form'>工资发放</a>
                    </Tooltip>
                </span>                                                     
            ),
        }];
         const classColumns = [{
            title: '产量',
            dataIndex: 'cl',
            key: 'cl',
            },{
            title: '废品称重良品率',//列头显示文字
            dataIndex: 'fp',//在数据项中的key，则data中要有个name项
            key: 'fp',//React需要的key，有dataIndex则无需
            }, {
            title: '一次合格率',
            dataIndex: 'yc',
            key: 'yc',
            }, {
            title: '遗留隔离品',
            dataIndex: 'yl',
            key: 'yl',
            },  {
            title: '岗位自检',
            dataIndex: 'gw',
            key: 'gw',
            }, {
            title: '卫生',
            dataIndex: 'ws',
            key: 'ws',                                                   
            }, {
            title: '加分项',
            dataIndex: 'jf',
            key: 'jf',                                                   
        }];
        const classAData = [{
            key: '1',
            cl:23.5,
            fp:13.9,
            yc:15.1,
            yl:-0.2,
            gw:10.0,
            ws:8.2,
            jf:0.0,
        }];
        const classBData = [{
            key: '1',
            cl:22.4,
            fp:14.3,
            yc:14.2,
            yl:-0.4,
            gw:9.9,
            ws:8.4,
            jf:0.5,
        }];
        const classCData = [{
            key: '1',
            cl:22.5,
            fp:15.6,
            yc:16.2,
            yl:-0.2,
            gw:9.8,
            ws:8.2,
            jf:0.9,
        }];
        return (
            <PageHeaderLayout>
                <Card title="管理人员">
                <Table
                selectedRows 
                    columns={columns} 
                    dataSource={list} 
                    loading={loading} 
                />
                </Card>
                <Card bordered={false} title="班组考核" style={{marginTop:16}}>
                    <Tabs defaultActiveKey="A" tabBarExtraContent={classGrades} size="large" tabBarStyle={{ marginBottom: 24 }}>
                        <TabPane tab="A组" key="A">
                            <Table
                                selectedRows 
                                columns={classColumns} 
                                dataSource={classAData} 
                            />
                            <h3>质量投诉：无</h3>                               
                            <h3>一点课一点改善：《生产线风机跳停措施》—— 侯彦通</h3>
                            <br/>
                            <h2>月度总分：90.5</h2>
                        </TabPane>
                        <TabPane tab="B组" key="B">
                            <Table
                                selectedRows 
                                columns={classColumns} 
                                dataSource={classBData} 
                            />
                            <h3>质量投诉：无</h3>                               
                            <h3>一点课一点改善：《成品罐500ML临时二次喷涂作业》——孔良中</h3>
                            <br/>
                            <h2>月度总分：89.3</h2>
                        </TabPane>
                        <TabPane tab="C组" key="C">
                            <Table
                                selectedRows 
                                columns={classColumns} 
                                dataSource={classCData} 
                            />
                            <h3>质量投诉：无</h3>                               
                            <h3>一点课一点改善：《成品更换隔层纸》——邹颜青</h3>
                            <br/>
                            <h2>月度总分：92.9</h2>
                        </TabPane>
                    </Tabs>
                </Card>
                <Card bordered={false} title="新增人员" style={{marginTop:16}}>
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
                <Card boardered={false}>
                    
                </Card>
            </PageHeaderLayout>

        )
    }
}