import React,{useState,useEffect,useRef} from 'react';
import {isEmpty,isFunction,isNull} from 'lodash';
import {Modal,Form,Input,Spin,message as Message} from 'antd';
import {API} from '@/api';
const FormItem = Form.Item;


const PasswordForm = Form.create()(
  (props)=>{
    const {form} = props;
    const {getFieldDecorator} = form;
    const confirmPasswordValidator=(rule, value, callback)=>{
      if(!value){
        callback([new Error('请再次确认密码')]);
      }else if(form.getFieldValue('password')!==value){
        callback([new Error('两次密码不一致')]);
      }else{
        callback();
      }
    }
    return <Form labelCol={{span:5}} wrapperCol={{span:17}} >
      <FormItem label="新密码" hasFeedback>
        {getFieldDecorator('password',{
          rules:[{
            required:true,message:'请输入密码'
          }]
        })(
          <Input type="password" placeholder="请输入密码"/>
        )}
      </FormItem>
      <FormItem label="确认密码" hasFeedback>
        {getFieldDecorator('confirmPassword',{
          rules:[{
            validator:confirmPasswordValidator
          }]
        })(
          <Input type="password" placeholder="请再次确认密码"/>
        )}
      </FormItem>
    </Form>
  }
)
const PasswordModal = (props)=>{
  const {value,visible,onOk,onCancel} = props;
  const [confirmLoading,setConfirmLoading] = useState(false);
  const passwordFormRef = useRef(null);
  const {id,hostName} = value;
  const handleModalOk = ()=>{
    if(!isNull(passwordFormRef.current)){
      passwordFormRef.current.validateFields((err,values)=>{
        if(!err){
          setConfirmLoading(true);
          API.editHost({
            id,
            ...values
          }).then((response)=>{
            setConfirmLoading(false);
            const {success,message} = response;
            if(success){
              Message.success(`主机「${hostName}」密码修改成功`);
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
    title="修改密码"
    visible={visible}
    confirmLoading={confirmLoading}
    onOk={handleModalOk}
    onCancel={handleModalCancel}>
    <Spin spinning={confirmLoading}>
      {visible&&<PasswordForm ref={passwordFormRef}/>}
    </Spin>
  </Modal>
}
export default PasswordModal;