import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../service/user.service";
import { Unauthorized } from "../utils";

export const configurePassport = (userService: UserService) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
  };

  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await userService.getUserById(payload.id);

        if (user) {
          return done(null, user);
        } else {
          return done(new Unauthorized("User not found"), false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export default passport;
