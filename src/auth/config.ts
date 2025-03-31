import.meta.env.VITE_REDIRECT_URI

// Authorization configuration (AWS Cognito)
export const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_9LU9Rb96p",
    client_id: "1enpj0n61qc430hj752e67ap93",
    redirect_uri: import.meta.env.VITE_REDIRECT_URI || window.location.origin,
    // redirect_uri: "http://localhost:5173",
    response_type: "code",
    scope: "openid email profile",
  };

  // https://p3q86838i1.execute-api.us-east-2.amazonaws.com
  // https://dus3jpdmoa9ff.cloudfront.net/api