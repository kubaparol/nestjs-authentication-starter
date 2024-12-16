import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiOperationOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

interface SwaggerDecoratorOptions {
  operation: ApiOperationOptions;
  responses: ApiResponseOptions[];
}

export const Swagger = (options: SwaggerDecoratorOptions) => {
  return applyDecorators(
    ApiOperation(options.operation),
    ...options.responses.map((response) => ApiResponse(response)),
  );
};
