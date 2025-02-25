import PocketBase from 'pocketbase';

// Initialize PocketBase client
export const pb = new PocketBase('http://127.0.0.1:8090');

// Optional: Add auth state change listener
pb.authStore.onChange((auth) => {
    console.log('Auth state changed:', auth);
});

export default pb; 

