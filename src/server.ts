import faker from '@faker-js/faker';
import { Server, Model, Factory } from 'miragejs';

import products from './mocks/products.json';

export function makeServer(environment = 'development') {
  return new Server({
    environment,

    models: {
      todo: Model,
      user: Model,
      product: Model,
    },

    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i}`;
        },
        email(i) {
          return 'user' + i + '@example.com';
        },
        active(i) {
          return i % 2 === 0;
        },
      }),
    },

    fixtures: {
      products,
    },

    seeds(server) {
      server.loadFixtures();

      server.createList('user', 10);
    },

    routes() {
      this.namespace = '';

      // @ts-ignore
      this.resource('users');
      // @ts-ignore
      this.resource('products');

      this.get('todos', (req, res) => {
        return [
          {
            id: 1,
            userId: 1,
            title: faker.lorem.sentence(),
            completed: faker.random.boolean(),
          },
          {
            id: 2,
            userId: 1,
            title: faker.lorem.sentence(),
            completed: faker.random.boolean(),
          },
          {
            id: 2,
            userId: 1,
            title: faker.lorem.sentence(),
            completed: faker.random.boolean(),
          },
        ];
      });
    },
  });
}
