import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@shared/constants/global.constants';

export const encrypt = (plain: string) => {
    return jwt.sign(plain, JWT_SECRET);
};

export const decrypt = (cipher: string) => {
    return jwt.verify(cipher, JWT_SECRET) as string;
};
