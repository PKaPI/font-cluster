
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/page/*', app.controller.home.index);
  app.get('/c', app.controller.home.client);
   /**
   * 代理服务增删改查以及状态修改
   */
  app.post('/api/proxy-server/server-list', app.controller.proxy.list);
  app.post('/api/proxy-server/add-server', app.controller.proxy.add);
  app.post('/api/proxy-server/update-server', app.controller.proxy.update);
  app.delete('/api/proxy-server/delete-server',app.controller.proxy.delete);
  app.get('/api/proxy-server/change-server-status', app.controller.proxy.changeStatus);
  /**
   * 代理服务规则增删改查
   */
  app.get('/api/proxy-server/rule-list', app.controller.proxy.ruleList);
  app.post('/api/proxy-server/add-rule', app.controller.proxy.addRule);
  app.post('/api/proxy-server/update-rule', app.controller.proxy.updateRule);
  app.delete('/api/proxy-server/delete-rule', app.controller.proxy.deleteRule);
  /**
   * 主机管理
   */
  app.get('/api/host-management/host-list', app.controller.hostManagement.queryHosts);
  app.post('/api/host-management/add-host', app.controller.hostManagement.addHost);
  app.post('/api/host-management/edit-host', app.controller.hostManagement.editHost);
  app.delete('/api/host-management/delete-host', app.controller.hostManagement.deleteHost);
  /**
   * 配置中心
   */
  app.post('/api/config-center/config-list',app.controller.configCenter.getConfigList);
  app.post('/api/config-center/add-config',app.controller.configCenter.addConfig);
  app.post('/api/config-center/edit-config',app.controller.configCenter.editConfig);
  app.delete('/api/config-center/delete-config',app.controller.configCenter.deleteConfig);
  /**
   * 配置详情
   */
  app.get('/api/config-detail/get-basic-info',app.controller.configDetail.getBasicInfo);
  app.get('/api/config-detail/get-remote-config',app.controller.configDetail.getRemoteConfig);
  app.post('/api/config-detail/save',app.controller.configDetail.saveConfig)
  /**
   * 服务代理
   */
  app.all('/proxy/:id/*', app.middleware.proxy);
  /**
   * 通用接口
   */
  app.get('/api/github/get-config-json',app.controller.common.getConfigJson);
  app.get('/api/github/get-local-ip',app.controller.common.getLocalIp);

};
