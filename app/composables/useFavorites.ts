// @ts-nocheck
import { getData, setData } from "nuxt-storage/session-storage";

export const useFavorites = () => {
	const favorites = useState<string[]>("favorites", () => []);

	const loadFavorites = () => {
		if (import.meta.client) {
			try {
				favorites.value = getData("hotel_favorites");
			} catch (error) {
				console.error("Error loading favorites:", error);
				favorites.value = [];
			}
		}
	};

	const saveFavorites = () => {
		setData("hotel_favorites", favorites.value);
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

	console.log("here");
	if (import.meta.client && favorites.value.length === 0) {
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
