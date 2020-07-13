/*
 * Copyright 2016 FUJITSU LIMITED
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

export default (server, indexName, userObj) => {
  const client = server.plugins.elasticsearch.client;
  const options = {
    index: indexName,
    type : 'index-pattern',
    id : server.config().get('monasca-kibana-plugin.logsIndexPrefix')
         .replace('<project_id>', `${userObj.project.id}`) + '*',
  };
  server.log(['status', 'debug', 'keystone'],
    `Checking if default logs-index pattern for ${indexName} exists...`);
  return client
  .exists(options)
  .then((resp) => {
    return resp;
  })
  .catch((err)=> {
    throw new Error(`Getting logs-index pattern for ${indexName} failed, error is ${err}`);
  });
};
