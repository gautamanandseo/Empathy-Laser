// Simple IndexedDB wrapper for image storage
const DB_NAME = 'EmpathyCMS_DB';
const DB_VERSION = 1;
const STORE_NAME = 'images';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => reject(`Database error: ${event.target.error}`);
    
    request.onsuccess = (event) => resolve(event.target.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

export const imageDB = {
  saveImage: async (file) => {
    try {
      const db = await openDB();
      const id = crypto.randomUUID();
      const timestamp = Date.now();
      
      const imageRecord = {
        id,
        name: file.name,
        type: file.type,
        size: file.size,
        date: timestamp,
        data: file // Storing File/Blob directly
      };

      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(imageRecord);

        request.onsuccess = () => resolve(id);
        request.onerror = (e) => reject(e.target.error);
      });
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    }
  },

  getImage: async (id) => {
    if (!id) return null;
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => {
          const result = request.result;
          resolve(result ? result.data : null);
        };
        request.onerror = (e) => reject(e.target.error);
      });
    } catch (error) {
      console.error('Error getting image:', error);
      return null;
    }
  },

  getAllImages: async () => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => reject(e.target.error);
      });
    } catch (error) {
      console.error('Error getting all images:', error);
      return [];
    }
  },

  deleteImage: async (id) => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = (e) => reject(e.target.error);
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }
};