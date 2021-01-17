const axios = require('axios');

const DEFAULT_API_HOST = 'api.usedesk.ru';

const valueOrNull = (val) => val ? val : null;

class TicketsMethods {
  constructor (api) {
    this.api = api;
  }

  async get(ticket_id, accessible_for_agent_id=null) {
    const properties = {
      ticket_id,
    };
    if (accessible_for_agent_id) {
      properties.accessible_for_agent_id = accessible_for_agent_id;
    }
    return this.api.request('POST', `/ticket`, properties);
  }

  async create(properties) {
    return this.api.request('POST', '/create/ticket', properties);
  }

  async createAsync(properties) {
    return this.api.request('POST', '/create/ticket/async', properties);
  }

  async update(properties) {
    return this.api.request('POST', '/update/ticket', properties);
  }

  async list(properties) {
    return this.api.request('POST', '/tickets', properties);
  }

  async createComment(properties) {
    return this.api.request('POST', '/create/comment', properties);
  }

  async tags(query='', offset= 0) {
    const properties = {
      offset,
    };
    if (query) {
      properties.query = query;
    }
    return this.api.request('POST', '/tags', properties);
  }

  async fields() {
    return this.api.request('POST', '/ticket/fields');
  }
}


class ClientsMethods {
  constructor (api) {
    this.api = api;
  }

  async get(client_id) {
    return this.api.request('GET', `/client`, { client_id });
  }

  async create(properties) {
    return this.api.request('POST', `/create/client`, properties);
  }

  async update(properties) {
    return this.api.request('POST', `/update/client`, properties);
  }

  async list(properties) {
    return this.api.request('POST', `/clients`, properties);
  }
}


class ChatMethods {
  constructor (api) {
    this.api = api;
  }

  async addMessage(properties) {
    return this.api.request('POST', '/chat/addMessage', properties);
  }

  async sendMessage(properties) {
    return this.api.request('POST', '/chat/sendMessage'. properties);
  }

  async changeAssignee(properties) {
    return this.api.request('POST', '/chat/changeAssignee'. properties);
  }
}


class UsersMethods {
  constructor (api) {
    this.api = api;
  }

  async get(user_id) {
    return this.api.request('GET', '/user', { user_id });
  }

  async create(properties) {
    return this.api.request('POST', '/create/user', properties);
  }

  async delete(user_id) {
    return this.api.request('POST', '/delete/user', { user_id });
  }

  async update(properties) {
    return this.api.request('POST', '/update/user', properties);
  }

  async list(properties) {
    return this.api.request('POST', '/users', properties);
  }

  async groups() {
    return this.api.request('POST', '/groups');
  }
}


class ChannelsMethods {
  constructor (api) {
    this.api = api;
  }

  async list(properties) {
    return this.api.request('GET', '/channels', properties);
  }
}


class SipuniUsedeskApi {
  options = {};
  cachedMethodsObjects = {};

  constructor(options) {
    this.options = options;
    // validation
    if (!options.token) {
      throw new Error('A required "token" parameter is not set.');
    }
    if (!options.host) {
      this.options.host = DEFAULT_API_HOST;
    }
  }

  // API methods grouped by entity

  get clients() {
    return this._getMethodsObject(ClientsMethods);
  }

  get tickets() {
    return this._getMethodsObject(TicketsMethods);
  }

  get chat() {
    return this._getMethodsObject(ChatMethods);
  }

  get users() {
    return this._getMethodsObject(UsersMethods);
  }

  get channels() {
    return this._getMethodsObject(ChannelsMethods);
  }

  //Universal request

  async request(method, path, paramsOrData = {}) {
    const isGet = method === 'GET';

    const paramsOrDataWithToken = {
      ...paramsOrData,
      api_token: this.options.token,
    };

    const params = isGet ? paramsOrDataWithToken : {};
    const data = !isGet ? paramsOrDataWithToken : {};
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.request({
        url: `https://${this.options.host}${path}`,
        method,
        data,
        params,
        headers,
      });
      return valueOrNull(response.data);
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  }

  // Utility methods

  _getMethodsObject(className, options = {}) {
    if (!this.cachedMethodsObjects[className]) {
      this.cachedMethodsObjects[className] = new className(this, options);
    }
    return this.cachedMethodsObjects[className];
  }
}


module.exports = SipuniUsedeskApi;
