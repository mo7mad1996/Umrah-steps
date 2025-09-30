export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive("observe-visibility", {
		mounted(el: HTMLElement & { _observer: any }, binding: any) {
			if (!el) return;

			const callback = ([entry]: IntersectionObserverEntry[]) => {
				if (!entry) return;
				binding.value(entry.isIntersecting); // Trigger the callback function
			};

			const observer = new IntersectionObserver(callback);
			observer.observe(el);

			el._observer = observer;
		},
		unmounted(el: any) {
			if (el._observer) {
				el._observer.disconnect();
			}
		},
	});
});
