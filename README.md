# Модуль Node.js для работы с API Usedesk

[![Build Status](https://travis-ci.org/sipuni/node-usedesk.svg?branch=main)](https://travis-ci.org/sipuni/node-usedesk)

### Описание


### Установка
```
npm i @sipuni/usedesk
```

### Реализованные методы

Методы сгруппированы и доступны через соответствующие свойства у объекта класса `SipuniUsedeskApi`,
например, `api.clients.create()` или `api.tickets.list()`.
Все методы возвращают Promise.

Методы, принимающие `properties`, ожидают объект. В объекте укажите такие же поля как в [документации](https://usedeskkb.atlassian.net/wiki/spaces/API/overview), 
кроме поля `api_token`, оно подается автоматически при каждом вызове метода.

Для списка методов ниже, предположим, что `api` это объект класса `SipuniUsedeskApi`
```ecmascript 6
const SipuniUsedeskApi = require('@sipuni/usedesk');
const token = 'aed2e810..........f05e2e21a';
const api = new SipuniUsedeskApi({ token });
```

Тикеты
```ecmascript 6
api.tickets.create(ticketProperties)
api.tickets.get(ticketId)
api.tickets.update(ticketProperties)
api.tickets.list(properties)
api.tickets.createComment(commentProperties)
api.tickets.tags()
api.tickets.fields()
```

Клиенты
```ecmascript 6
api.clients.create(clientProperties)
api.clients.get(clientId)
api.clients.update(clientProperties)
api.clients.list(properties)
```

Агенты
```ecmascript 6
api.users.groups()
api.users.create(userProperties);
api.users.get(userId);
api.users.update(userProperties);
api.users.list(properties);
api.users.delete(userId);
```

### Примеры

Для коробочной версии
```ecmascript 6
const SipuniUsedeskApi = require('@sipuni/usedesk');
const token = 'aed2e810..........f05e2e21a';
const host = 'api.yourdomain.com';
const api = new SipuniUsedeskApi({ token, host });
```

Для облачной версии
```ecmascript 6
const SipuniUsedeskApi = require('@sipuni/usedesk');
const token = 'aed2e810..........f05e2e21a';
const api = new SipuniUsedeskApi({ token });
```

Создание тикета
```ecmascript 6
const created = await api.tickets.create({
  subject: 'Не работает сеть',
  message: 'Подробности...'
});
```

Получение тикета по id
```ecmascript 6
const ticket = await api.tickets.get(ticket_id);
```

Создание клиента
```ecmascript 6
const client = await api.clients.create({ 
  name: 'Иван',
  emails: ['test@gmail.com'],
});
```

Получение клиента по id
```ecmascript 6
const found = await api.clients.get(client_id);
```

Создание агента
```ecmascript 6
const groups = await api.users.groups();
const user = await api.users.create({
    name: 'Николй',
    email: 'abc@cde.com',
    password: '123',
    group: `${groups[0].id}`,
});
```

### Лицензия

[MIT](https://ru.wikipedia.org/wiki/%D0%9B%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_MIT) © [Sipuni](http://sipuni.com)