export const addToWishlist = (product) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  if (!wishlist.some((item) => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    // Emetti l'evento di aggiornamento
    window.dispatchEvent(new Event("wishlistUpdate"));
  }
};

export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Controlla se l'elemento è già presente nel carrello
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    // se l'elemento esiste incrementa la quantità di uno
    if (existingItem.quantity < existingItem.availableQuantity) {
      existingItem.quantity += 1;
      // se ci sono più di un prodotto dello stesso tipo applica lo sconto di 5%
      if (existingItem.quantity > 1) {
        existingItem.bulkDiscount = 5;
      }
    }
  } else {
    // se è un nuovo item setta la quantità a 1
    cart.push({
      ...product,
      quantity: 1,
      availableQuantity: product.quantity, // recupera la quantità del prodotto da backend
      bulkDiscount: 0,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  // Emetti l'evento di aggiornamento
  window.dispatchEvent(new Event("cartUpdate"));
};

export const moveToCart = (productId) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const product = wishlist.find((item) => item.id === productId);
  if (product) {
    addToCart(product);
    removeFromWishlist(productId);
    // Emetti l'evento di aggiornamento
    window.dispatchEvent(new Event("cartUpdate"));
    window.dispatchEvent(new Event("wishlistUpdate"));
  }
};

export const isInWishlist = (productId) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  return wishlist.some((item) => item.id === productId);
};

export const isInCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.some((item) => item.id === productId);
};

export function removeFromWishlist(id) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const newWishlist = wishlist.filter((item) => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(newWishlist));
  // Emetti l'evento di aggiornamento
  window.dispatchEvent(new Event("wishlistUpdate"));
}

export const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  // Emetti l'evento di aggiornamento
  window.dispatchEvent(new Event("cartUpdate"));
};

export const updateCartItemQuantity = (productId, quantity) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.map((item) => {
    if (item.id === productId) {
      const newQuantity = Math.min(
        Math.max(1, quantity),
        item.availableQuantity
      );
      return {
        ...item,
        quantity: newQuantity,
        bulkDiscount: newQuantity > 1 ? 5 : 0,
      };
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  // Emetti l'evento di aggiornamento
  window.dispatchEvent(new Event("cartUpdate"));
};

//informazioni per il checkout utilizzate da SALES
export const saveCheckoutData = (data) => {
  const checkoutData = {
    discountedTotal: data.discountedTotal,
    total: data.total,
    items: data.items,
  };
  sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
};

export const getCheckoutData = () => {
  const data = sessionStorage.getItem("checkoutData");
  return data ? JSON.parse(data) : null;
};

export const clearCheckoutData = () => {
  sessionStorage.removeItem("checkoutData");
};

//local storage per la gestione dei dati dello scontrino

export const infoSales = (data) => {
  const infoSales = {
    id: data.id,
    user_id: data.user_id,
    user_email: data.user_email,
    user_address: data.user_address,
    data: data.data,
    state: data.state,
    discounted: Number(data.discountedTotal),
    total: Number(data.total),
  };
  sessionStorage.setItem("infoSales", JSON.stringify(infoSales));
};

export const getInfoSales = () => {
  const data = sessionStorage.getItem("infoSales");
  return data ? JSON.parse(data) : null;
};

export const clearInfoSales = () => {
  sessionStorage.removeItem("infoSales");
};
