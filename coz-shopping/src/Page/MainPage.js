import Header from "../Component/MainComponent/Header";
import Footer from "../Component/MainComponent/Footer";
import ItemList from "../Component/MainComponent/ItemList";
import BookmarkList from "../Component/MainComponent/BookmarkList";

function MainPage () {
    return (
      <>
      <header>
        <Header />
      </header>
      <main>
        <ItemList />
        <BookmarkList />
      </main>
      <footer>
        <Footer />
      </footer>
      </>
    );
  }
  
  export default MainPage;