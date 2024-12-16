import { ApiProperty } from '@nestjs/swagger';

export class MeResponse {
  @ApiProperty({
    example: '5f4a4d9c-5e3c-4f3c-9f6b-6c0e3e0e1e7d',
    description: 'User ID',
  })
  id: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  lastName: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'Date and time when the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'Date and time when the user was last updated',
  })
  updatedAt: Date;
}
