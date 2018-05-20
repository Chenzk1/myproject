import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Upload,
  message,
  Collapse,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';

const FormItem = Form.Item;
const Panel = Collapse.panel;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class TableList extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

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
    //自己添加的文件上传

    const Dragger = Upload.Dragger;

    const props = {
      name: 'file',
      multiple: true,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <PageHeaderLayout>
        <Card title="上传文件">
        <h3>点击或拖动文件到下方区域即可上传文件：</h3>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or
            other band files
          </p>
        </Dragger>
        </Card>
        <Card bordered={false} title = '我的文件' style={{marginTop: 24}}>
          <Collapse>
            <Collapse.Panel header="文档" key="1">
              <Collapse>
                <Collapse.Panel header="excel" key="1">
                  <p>这里可以存放excel文件</p>
                </Collapse.Panel>
                <Collapse.Panel header="word" key="2">
                  <p>这里可以存放word文件</p>
                </Collapse.Panel>
                <Collapse.Panel header="PowerPoint" key="1">
                  <p>这里可以存放PowerPoint文件</p>
                </Collapse.Panel>
              </Collapse>
            </Collapse.Panel>
            <Collapse.Panel header="图片" key="2">
              <p>这里可以存放图片文件</p>
            </Collapse.Panel>
            <Collapse.Panel header="视频" key="3">
              <p>这里可以存放视频文件</p>
            </Collapse.Panel>
            <Collapse.Panel header="其他" key="4">
              <p>这里可以存放其他类型的文件</p>
            </Collapse.Panel>
          </Collapse>
        </Card>
      </PageHeaderLayout>
    );
  }
}