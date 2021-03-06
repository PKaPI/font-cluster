import _ from 'lodash';
import API_URL from './url';
import http from '@/utils/http';

function mapUrlObjToFuncObj(urlObj){
  const API = {};
  _.keys(urlObj).forEach((key)=>{
    const item = urlObj[key]
    API[key]=function(params){
      return http[item.method](item.url,params)
    }
  });
  return API;
}
function mapUrlObjToStrObj(urlObj){
  const Url = {};
  _.keys(urlObj).forEach((key)=>{
    const item = urlObj[key]
    Url[key]=item.url
  });
  return Url;
}

export const API = mapUrlObjToFuncObj(API_URL);
export const URL = mapUrlObjToStrObj(API_URL);
   