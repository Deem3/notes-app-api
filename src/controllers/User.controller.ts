import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Body, Controller, Get, Post, Query, Request, Route, Security, Tags } from 'tsoa';
import { ResponseCreateUser, ResponseGetUser } from '../interfaces/user/response.interface';
import { RestCreateUser, RestGetUser } from '../interfaces/user/rest.interface';
import { UserService } from '../services/UserService';

@Route('/user')
export class UserController extends Controller {
  @Post('/create')
  @Tags('GetUser')
  public async createUser(
    @Body() req: RestCreateUser,
    @Request() request: express.Request,
  ): Promise<ResponseCreateUser> {
    const res = request.res;
    const userId = new UserService().CreateUser(req);
    if ((await userId).error) {
      this.setStatus(404);
      return userId;
    }
    const userData = (await userId).data;
    const { id } = userData || {};
    const token = await jwt.sign({ id }, 'secret', { expiresIn: '1h' });
    res?.cookie('token', token, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      maxAge: 3600000,
    });
    this.setStatus(201);
    return userId;
  }

  @Post('/getUser')
  @Tags('GetUser')
  public async getUser(
    @Body() req: RestGetUser,
    @Request() request: express.Request,
  ): Promise<ResponseGetUser> {
    const res = request.res;
    const user = new UserService().GetUser(req);
    if ((await user).error) {
      this.setStatus(404);
      return user;
    }
    const userData = (await user).data;
    const { id } = userData || {};
    const token = await jwt.sign({ id }, 'secret', { expiresIn: '1h' });
    res?.cookie('token', token, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      maxAge: 3600000,
    });
    this.setStatus(200);
    return user;
  }

  @Security('jwt')
  @Get('/getUserById')
  @Tags('GetUserById')
  public async getUserById(@Query() id: string): Promise<ResponseGetUser> {
    const user = new UserService().GetUserById(id);
    if ((await user).error) {
      this.setStatus(404);
      return user;
    }
    this.setStatus(200);
    return user;
  }
}
