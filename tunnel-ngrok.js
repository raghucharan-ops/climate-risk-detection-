// tunnel-ngrok.js
import ngrok from '@ngrok/ngrok';

const token = process.env.NGROK_AUTHTOKEN || process.argv[2];

async function start() {
  if (!token) {
    console.log('\n======================================================');
    console.log('NGROK AUTHTOKEN REQUIRED:');
    console.log('ngrok requires a free account authtoken to start a session.');
    console.log('1. Copy your token from: https://dashboard.ngrok.com/get-started/your-authtoken');
    console.log('2. Run: npm run tunnel:ngrok -- <YOUR_TOKEN>');
    console.log('   Or: $env:NGROK_AUTHTOKEN="<YOUR_TOKEN>"; npm run tunnel:ngrok');
    console.log('======================================================\n');
    process.exit(1);
  }

  try {
    const listener = await ngrok.forward({
      addr: 5173,
      authtoken: token,
    });
    console.log('\n======================================================');
    console.log('🚀 Ngrok Public HTTPS Tunnel is Active!');
    console.log('Public URL:', listener.url());
    console.log('Forwarding to: http://localhost:5173');
    console.log('======================================================\n');
  } catch (err) {
    console.error('Ngrok connection failed:', err.message);
    process.exit(1);
  }
}

start();
