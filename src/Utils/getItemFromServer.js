const getItemFromServer = async () => {

    try {
      const res = await fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=8')
      const itemListData = await res.json();
      
      return itemListData;
      
    } catch (error) {
      console.log('response error', error);
    }
}

export default getItemFromServer;