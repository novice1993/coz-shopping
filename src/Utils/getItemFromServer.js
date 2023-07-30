const getItemFromServer = async (count) => {

    try {
      const res = await fetch(`http://cozshopping.codestates-seb.link/api/v1/products?count=${count}`)
      const itemListData = await res.json();
      
      return itemListData;
      
    } catch (error) {
      console.error('response error', error);
    }
}

export default getItemFromServer;