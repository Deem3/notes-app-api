import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    let token : string | undefined;
    if(request.headers.authorization){
      token = request.headers.authorization
    }
    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }
      if(token)
      jwt.verify(token, "secret", function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          if(scopes)
          for (let scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error("JWT does not contain required scope."));
            }
          }
          resolve(decoded);
        }
      });
    });
  }

  return Promise.reject(new Error("Unknown security type"));
}