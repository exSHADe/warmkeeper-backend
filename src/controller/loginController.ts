import { Controller, Get, Post, Request, Response } from "@decorators/express";
import { LoginUserDto } from "../dto";
import { HttpException } from "../exceptions";
import { UserService } from "../services";
import {AuthService} from "../services";

@Controller("/login")
class LoginController {
  private userService: UserService;
  private authService: AuthService;
  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  @Post("/")
  async login(@Response() res, @Request() req) {
    const loginDto = req.body as LoginUserDto;
    console.log(loginDto);
    if (
      Object.keys(loginDto).length == 0 ||
      loginDto.password == "" ||
      loginDto.username == ""
    )
      throw new HttpException(422, "Unprocessable entity");
    const foundUser = await this.userService.get(loginDto);
    if (!foundUser) throw new HttpException(404, "Not found");
    const token = this.authService.createToken(foundUser);
    if (!token)
      throw new HttpException(500, "Internal error, unable to create token");
    res.send(token).status(200);
  }
}
export default LoginController;
