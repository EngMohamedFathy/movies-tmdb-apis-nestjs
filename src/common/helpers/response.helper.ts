import { HttpStatus } from '@nestjs/common';
import { translate } from './i18n.helper'

export const responseSuccess = (message: string, data: any = null, status = HttpStatus.OK) => {
  console.log(message);
  return {
    message: translate(message),
    data,
    status,
  };
};

export const responseError = (message: string, errors: any = null, status: number = HttpStatus.BAD_REQUEST) => {
  return {
    message: translate(message),
    errors,
    status,
  };
};
