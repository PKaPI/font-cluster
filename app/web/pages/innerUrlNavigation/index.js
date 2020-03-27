import React,{useState,useEffect} from 'react';
import {Tabs,message as Message,Row,Col, Icon,Tooltip} from 'antd';
import Loading from '@/components/loading';
import {API} from '@/api';
import {colorList} from '@/constant';
import './style.scss';

const TabPane = Tabs.TabPane;
const InnerUrlNavigation = ()=>{
  const [navigationData,setNavigationData] = useState([]);
  const [activePaneKey,setActivePaneKey] = useState('0');
  const [loading,setLoading] = useState(true);
  const loadMainData = ()=>{
    setLoading(true);
    API.getConfigJsonInGithub({
      name:'internal-url-navigation.json'
    }).then((response)=>{
      const {success,data,message}  = response;
      if(success){
        setNavigationData(data)
      }else{
        Message.error(message);
      }
      setLoading(false);
    });
  }
  const handleTabChange = (key)=>{
    setActivePaneKey(key);
  }
  useEffect(()=>{
    loadMainData();
  },[]);
  return (<Loading loading={loading}>
    <div className="page-internal-url-navigation">
      <Tabs activeKey={activePaneKey} onChange={handleTabChange}>
        {
          navigationData.map((group,index)=>{
            const {groupName,children} = group;
            return <TabPane className="tab-pane" tab={groupName} key={index}>
              <Row gutter={10}>
                {
                  children.map((child,index)=>{
                    const {name,url,desc,remark} = child;
                    return (<Col className="navigation-item-wrapper" key={name} span={6}>
                      <a href={url} target="_blank" className="navigation-item" style={{background:colorList[index%colorList.length]}}>
                        {remark&&<Tooltip title={remark}>
                          <Icon className="icon" type="question-circle"/>
                        </Tooltip>}
                        <div className="title">{name}</div>
                        <div className="desc">{desc}</div>
                      </a>
                    </Col>)
                  })
                }
              </Row>
            </TabPane>
          })
        }
      </Tabs>
    </div>
  </Loading>)
}

export default InnerUrlNavigation;