// __mocks__/postmark.js

class MockServerClient {
    async sendEmail() {
      // Implement your mock behavior here, for example:
      console.log('Mocked sendEmail called');
      return { Message: 'Email sent successfully!' };
    }
  }
  
  const postmark = {
    ServerClient: MockServerClient,
  };
  
  module.exports = postmark;
  