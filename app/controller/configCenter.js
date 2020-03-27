const Controller = require('egg').Controller;
const _ = require('lodash');


class ConfigCenter extends Controller{
  async getConfigList(){
    const {ctx,app} = this;
    const {current,size} = ctx.request.body;
    const data =  await ctx.service.configCenter.queryConfigs({
      current,
      size
    });
    ctx.body = app.utils.response(true,{
      data:data.rows,
      count:data.count
    });
  }
  async addConfig(){
    const {ctx,app} = this;
    const {filename,filePath,hostId,remark} = ctx.request.body;
    if(_.isNil(filename)) throw new Error('缺少必要参数filename');
    if(_.isNil(filePath)) throw new Error('缺少必要参数filePath');
    if(_.isNil(hostId)) throw new Error('缺少必要参数hostId');
    const result = await ctx.service.configCenter.addConfig({
      filename,filePath,hostId,remark
    });
    ctx.body = app.utils.response(true,result.get({
      plain: true
    }));
  }
  async editConfig(){
    const {ctx,app} = this;
    const {id,filename,filePath,hostId,remark} = ctx.request.body;
    if(_.isNil(id)) throw new Error('缺少必要参数id');
    await ctx.service.configCenter.editConfig({
      id,
      filename,
      filePath,
      remark,
      hostId
    });
    ctx.body = app.utils.response(true);
  }
  async deleteConfig(){
    const {ctx,app} = this;
    const {id} = ctx.request.query;
    if(_.isNil(id)) throw new Error('缺少必要参数id');
    await ctx.service.configCenter.deleteConfig(id);
    ctx.body = app.utils.response(true)
  }
}

module.exports = ConfigCenter;