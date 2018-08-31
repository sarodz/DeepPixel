import * as Hapi from 'hapi';

import validate from './validate';
import IRoute from '../../helper/route';
import Logger from '../../helper/logger';
import UserController from './controller';

export default class UserRoutes implements IRoute {
    public async register(server: Hapi.Server): Promise<any> {
        return new Promise(resolve => {
            Logger.info('UserRoutes - Start adding user routes.');
            const controller = new UserController();

            server.route([
                {
                    method: 'POST',
                    path: '/write',
                    config: {
                        handler: controller.create,
                        validate: validate.create,
                        description: 'Method to insert phrases.',
                        tags: ['api', 'phrases'],
                        auth: false,
                    },
                },
                {
                    method: 'GET',
                    path: '/read',
                    config: {
                        handler: controller.getById,
                        description: 'Method that gets all of the phrases.',
                        tags: ['api', 'phrases'],
                        auth: false,
                    },
                },
                {
                    method: 'DELETE',
                    path: '/delete/{line_number}',
                    config: {
                        handler: controller.deleteById,
                        validate: validate.deleteById,
                        description: 'Method that deletes a phrase by its line_number.',
                        tags: ['api', 'users'],
                        auth: false,
                    },
                },
            ]);

            Logger.info('UserRoutes - Finish adding user routes.');

            resolve();
        });
    }
}
