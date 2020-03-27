import React,{useState,useEffect,useRef} from 'react';
import {isEmpty,isFunction,isNull} from 'lodash';
import {Modal,Form,Input,Spin,message as Message} from 'antd';
import {API} from '@/api';
const FormItem = Form.Item;
const {TextArea} = Input;


const HostForm = Form.create()(
  (props)=>{
    const {form,value} = props;
    const {getFieldDecorator} = form;
    const {hostIp,hostName,username,password,remark} = value;
    const isAdd = isEmpty(value);
    return <Form labelCol={{span:5}} wrapperCol={{span:17}} >
      <FormItem label="主机IP" hasFeedback>
        {getFieldDecorator('hostIp',{
          initialValue:hostIp,
          rules:[{
            required:true,message:'请输入主机IP'
          }]
        })(
          <Input placeholder="请输入主机IP"/>
        )}
      </FormItem>
      <FormItem label="主机名" hasFeedback>
        {getFieldDecorator('hostName',{
          initialValue:hostName,
          rules:[{
            required:true,message:'请输入主机名'
          }]
        })(
          <Input placeholder="请输入主机名"/>
        )}
      </FormItem>
      {isAdd&&<FormItem label="用户名" hasFeedback>
        {getFieldDecorator('username',{
          initialValue:username,
          rules:[{
            required:true,message:'请输入用户名'
          }]
        })(
          <Input placeholder="请输入用户名"/>
        )}
      </FormItem>}
      {isAdd&&<FormItem label="密码" hasFeedback>
        {getFieldDecorator('password',{
          initialValue:password,
          rules:[{
            required:true,message:'请输入密码'
          }]
        })(
          <Input type="password" placeholder="请输入密码"/>
        )}
      </FormItem>}
      <FormItem label="备注" hasFeedback>
        {getFieldDecorator('remark',{
          initialValue:remark
        })(
          <TextArea placeholder="请输入备注" rows={4}/>
        )}
      </FormItem>
    </Form>
  }
)
const HostModal = (props)=>{
  const {value,visible,onOk,onCancel} = props;
  const [confirmLoading,setConfirmLoading] = useState(false);
  const hostFormRef = useRef(null);
  const isAdd = isEmpty(value);
  const {id,hostName,} = value;
  const handleModalOk = ()=>{
    if(!isNull(hostFormRef.current)){
      hostFormRef.current.validateFields((err,values)=>{
        if(!err){
          setConfirmLoading(true);
          API[isAdd?'addHost':'editHost']({
            id:isAdd?undefined:id,
            ...values
          }).then((response)=>{
            setConfirmLoading(false);
            const {success,message} = response;
            if(success){
              Message.success(isAdd?'主机新增成功':`主机「${hostName}」编辑成功`);
              isFunction(onOk)&&onOk(values);
            }else{
              Message.error(message);
            }
          })
        }
      })
    }
  }
  const handleModalCancel = ()=>{
    isFunction(onCancel)&&onCancel();
  }
  useEffect(() => {
    if(!visible){
      setConfirmLoading(false);
    }
  }, [props.visible])
  return <Modal
    title={isAdd?'新增主机':'编辑主机'}
    visible={visible}
    confirmLoading={confirmLoading}
    onOk={handleModalOk}
    onCancel={handleModalCancel}>
    <Spin spinning={confirmLoading}>
      {visible&&<HostForm value={value} ref={hostFormRef}/>}
    </Spin>
  </Modal>
}
export default HostModal;