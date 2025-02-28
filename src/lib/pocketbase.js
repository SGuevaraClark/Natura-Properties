import PocketBase from 'pocketbase';

// Initialize PocketBase client
export const pb = new PocketBase(import.meta.env.VITE_API_URL);

// Optional: Add auth state change listener
pb.authStore.onChange((auth) => {
    console.log('Auth state changed:', auth);
});

export default pb; 

