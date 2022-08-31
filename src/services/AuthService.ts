import * as jwt from "jsonwebtoken";
import { LoginUserDto } from "../dto";
class AuthService {
  private secret: string;
  constructor() {
    switch (process.env.NODE_ENV) {
      case "production":
        this.secret = process.env.jwtKeyProd;
        break;
      case "development":
        this.secret = process.env.jwtKeyDev;
        break;
      default:
        this.check("Check Authservice immediately");
    }
  }
  private check(info: string): never {
    console.warn(info);
  }
  createToken(user: LoginUserDto): string | null {
    if (!user.username) return null;
    const token = jwt.sign({ username: user.username }, this.secret, {
      expiresIn: "48000s",
    });
    return token;
  }
  verify(token: string): boolean {
    let status: boolean = false;
    jwt.verify(token, this.secret, (err, user) => {
      console.log(err, user);
      if (err) {
        status = false;
      } else {
        status = true;
      }
    });
    return status;
  }
  getSecret = () => this.secret;
}
export default AuthService;
