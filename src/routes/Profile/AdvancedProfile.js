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
import styles from './AdvancedProfile.less';

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
                    <a href='/advanced-form'>删除</a>
                    <Divider type='vertical' />
                    <a href='/advanced-form'>修改</a>
                    <Divider type='vertical' />
                    <a href='/advanced-form'>工资发放</a>   
                </span>                                                     
            ),
        }];
        return (
            <PageHeaderLayout>
                <Card title="两片罐生产-管理人员">
                <Table
                selectedRows 
                    columns={columns} 
                    dataSource={list} 
                    loading={loading} 
                />
                </Card>
                <Card bordered={false} title="两片罐生产-生产班组" style={{marginTop:16}}>
                    <Tabs defaultActiveKey="A" tabBarExtraContent={classGrades} size="large" tabBarStyle={{ marginBottom: 24 }}>
                        <TabPane tab="A组" key="A">
                            <Table
                                selectedRows 
                                columns={columns} 
                                dataSource={list} 
                            />
                        </TabPane>
                        <TabPane tab="B组" key="B">
                            <Table
                                selectedRows 
                                columns={columns} 
                                dataSource={list} 
                            />
                        </TabPane>
                        <TabPane tab="C组" key="C">
                            <Table
                                selectedRows 
                                columns={columns} 
                                dataSource={list} 
                            />
                        </TabPane>
                    </Tabs>
                </Card>
            </PageHeaderLayout>

        )
    }
}