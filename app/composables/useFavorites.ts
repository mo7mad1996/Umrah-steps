export const useFavorites = () => {
  const favorites = useState<string[]>('favorites', () => []);

  const loadFavorites = () => {
    if (process.client) {
      const saved = localStorage.getItem('hotel_favorites');
      if (saved) {
        try {
          favorites.value = JSON.parse(saved);
        } catch (error) {
          console.error('Error loading favorites:', error);
          favorites.value = [];
        }
      }
    }
  };

  const saveFavorites = () => {
    if (process.client) {
      localStorage.setItem('hotel_favorites', JSON.stringify(favorites.value));
    }
  };

  const addToFavorites = (hotelId: string) => {
    if (!favorites.value.includes(hotelId)) {
      favorites.value.push(hotelId);
      saveFavorites();
      return true;
    }
    return false;
  };

  const removeFromFavorites = (hotelId: string) => {
    const index = favorites.value.indexOf(hotelId);
    if (index > -1) {
      favorites.value.splice(index, 1);
      saveFavorites();
      return true;
    }
    return false;
  };

  const toggleFavorite = (hotelId: string) => {
    if (isFavorite(hotelId)) {
      removeFromFavorites(hotelId);
      return false;
    } else {
      addToFavorites(hotelId);
      return true;
    }
  };

  const isFavorite = (hotelId: string) => {
    return favorites.value.includes(hotelId);
  };

  const clearFavorites = () => {
    favorites.value = [];
    saveFavorites();
  };

  if (process.client && favorites.value.length === 0) {
    loadFavorites();
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    loadFavorites,
  };
};
