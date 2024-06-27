const config = {
    development: {
      backendUrl: 'https://localhost:7105',
    },
    production: {
      backendUrl: 'https://real-backend-url.com',
    },
  };
  
  const environment = process.env.NODE_ENV || 'development';
  
  export const { backendUrl } = config[environment];