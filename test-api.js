// Simple test script to debug API endpoints
const testAPI = async () => {
  const baseURL = 'https://your-app.vercel.app'; // Replace with your actual Vercel URL
  
  console.log('🧪 Testing Hotel API Endpoints...\n');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseURL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    console.log('');
    
    // Test hotels endpoint
    console.log('2. Testing hotels endpoint...');
    const hotelsResponse = await fetch(`${baseURL}/api/hotels`);
    const hotelsData = await hotelsResponse.json();
    console.log('✅ Hotels response:', {
      success: hotelsData.success,
      count: hotelsData.count,
      hasData: !!hotelsData.data
    });
    console.log('');
    
    // Test stats endpoint
    console.log('3. Testing stats endpoint...');
    const statsResponse = await fetch(`${baseURL}/api/hotels/stats`);
    const statsData = await statsResponse.json();
    console.log('✅ Stats response:', statsData);
    console.log('');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

// Run the test
testAPI();
