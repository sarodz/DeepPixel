import User from '../../model/phrase';
import UserResolver from './resolver';
import CrudController from '../../common/crud-controller';

export default class UserController extends CrudController<User> {
    constructor() {
        super(new UserResolver());
    }
}
