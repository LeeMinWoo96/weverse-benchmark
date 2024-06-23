import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './routes/landing/Header.js';
import Footer from './components/footer/Footer';
import {
  About,
  Blog,
  Cart,
  Checkout,
  Contact,
  RootSection,
  Menu,
  Payment,
  Register,
  SingleItem,
} from './routes/index';
import { allProductsData } from './data/AllProductsData.js';
import { AllCategories } from './data/AllCategories';
import CheckoutSummary from './routes/checkout/CheckoutSummary.js';
import CartTotals from './routes/cart/CartTotals.js';
import LoginModal from './components/login/LoginModal.js';
import CartItem from './routes/cart/CartItem.js';
import NotFound from './routes/not-found/NotFound.js';
import Refunds from './routes/refunds/Refunds.js';
import Terms from './routes/terms/Terms.js';
import Privacy from './routes/privacy/Privacy.js';
import Careers from './routes/careers/Careers.js';
import BlogPost from './routes/blog-post/BlogPost.js';
import Profile from './routes/profile/Profile.js';
import ResetLocation from './helpers/ResetLocation.js';
// import NewComponent from "./routes/weverse/t.js";
import Weverse from "./routes/weverse/Weverse.js";
// import artist from "./data/artist.js";
import Artist from "./routes/artist/Artist.js";
import ArtistFeed from "./routes/weverse/ArtistFeed.js";

function App() {
  const [allCategories, setAllCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Menu');
  const [cartItems, setCartItems] = useState([]);
  const [clearedCart, setClearedCart] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [validLogin, setValidLogin] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [loginModalWindow, setLoginModalWindow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);


  const getUser = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_USERS_URL}/${id}`);
      const body = await response.json();
      setCurrentUser(body.data[0]);
      const jsonUser = JSON.stringify(body.data[0]);
      sessionStorage.setItem('currentUser', jsonUser);
      if (response.status === 200) {
        return true;
      }
    }
    catch (err) {
      console.log(err.message)
      return false;
    }
  }

  const updateUser = async (id, user) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_USERS_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
      });

      if (response.status === 200) {
        // Assuming getUser is a function that retrieves user data
        // Make sure to handle this appropriately
        const update = await getUser(id);
        if (update) {
          return true;
        }
        return true;
      } else {
        console.log("Update failed with status:", response.status);
        return false;
      }
    } catch (err) {
      console.log("Fetch error:", err.message);
      return false;
    }
  }



  useEffect(() => {
    if (sessionStorage.getItem('currentUser') !== null) {
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (validLogin && sessionStorage.getItem('validLogin') === null) {
      sessionStorage.setItem('validLogin', true);
    }
    if (sessionStorage.getItem('validLogin') !== null) {
      setLoading(false);
      setValidLogin(sessionStorage.getItem('validLogin'))
    }
    setLoading(false);
  }, [validLogin])



  const activateLoginModal = () => {
    hideMenu();
    setLoginModalWindow(!loginModalWindow);
  }

  const handleLogout = () => {
    setValidLogin(false);
    hideMenu();
    setCurrentUser({});
    ResetLocation();
    setCartItems([]);
    setProductsQuantity(0);
    sessionStorage.clear();
  };

  const findMenuItem = (e) => {
    e.preventDefault();
    const inputValue = e.target.value.toLowerCase();
    const collectData = allProductsData.filter(product =>
      product.ItemName.toLowerCase().includes(inputValue)
    );

    if (collectData.length > 0) {
      setAllProducts(collectData);
    } else {
      setAllProducts([]);
    }
  };

  const showModal = () => {
    setIsModalActive(!isModalActive);
  };
  const hideMenu = () => {
    setIsModalActive(false);
  };

  const getAllCategories = async () => {
    setAllCategories(AllCategories);
  };

  const getAllProducts = () => {
    setAllProducts(allProductsData);
  };
  // CART LOGIC
  /*******************************************************/

  const CheckRepeatableProducts = (cartItems, targetProduct, userSelectedAttributes) => {

    let item;
    let productsById = cartItems.filter((item) => item.id === targetProduct.id);
    productsById.forEach((targetItem) => {
      if (MatchingAttributes(userSelectedAttributes, targetItem)) {
        item = targetItem;
      }
      if (userSelectedAttributes.length === 0) {
        item = targetItem;
      }
    });

    return item;
  };


  const MatchingAttributes = (userSelectedAttributes, targetProduct) => {

    const attributesMatch = (groupOne, groupTwo) => {
      return Object.values(groupOne)[1] === Object.values(groupTwo)[1];
    };

    let truthyValuesCounter = 0;
    let i = 0;
    while (i < userSelectedAttributes.length) {
      if (
        attributesMatch(
          userSelectedAttributes[i],
          targetProduct?.userSelectedAttributes[i]
        )
      ) {
        truthyValuesCounter += 1;
      }
      i += 1;
    }

    return truthyValuesCounter === userSelectedAttributes?.length;
  };

  const updateCartQuantity = (actionToPerfrom, productAlreadyInCart, userSelectedAttributes) => {
    const repeatableProduct = CheckRepeatableProducts(cartItems, productAlreadyInCart, userSelectedAttributes);
    const indexOfRepeatableProduct = cartItems.indexOf(repeatableProduct);

    const currentProductList = [...cartItems];
    if (actionToPerfrom === 'addProduct') {
      currentProductList[indexOfRepeatableProduct].quantity += 1;
    } else {
      currentProductList[indexOfRepeatableProduct].quantity -= 1;
    }

    return currentProductList;
  };
  const handleAddProduct = (targetProduct, userSelectedAttributes) => {

    const productAlreadyInCart = CheckRepeatableProducts(
      cartItems,
      targetProduct,
      userSelectedAttributes
    );

    let currentCartItems = [...cartItems];
    let newQuantity;
    //if product doesn't exists yet 
    if (productAlreadyInCart === undefined) {
      const itemToAdd = targetProduct;

      newQuantity = 1;

      currentCartItems.push({
        ...itemToAdd,
        userSelectedAttributes,
        quantity: newQuantity,
      });


    }
    //if product already exists
    else {
      let index;
      //if there are no attributes find index by id
      if (userSelectedAttributes.length === 0) {
        index = cartItems.findIndex(item => item.id === targetProduct.id);
      }

      //if there are attributes find index by attributes and id at the same time
      else {
        index = cartItems.findIndex(item => item.userSelectedAttributes[0]?.attributeValue === userSelectedAttributes[0].attributeValue && item.id === targetProduct.id);
      }
      // console.log(userSelectedAttributes);
      if (index !== -1) {
        newQuantity = cartItems[index].quantity;

        currentCartItems[index] = {
          ...cartItems[index],
          quantity: newQuantity + 1,
        };

      }
    }

    const totalCartQuantity = currentCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const jsonUser = JSON.stringify(currentCartItems);
    sessionStorage.setItem('cartItems', jsonUser);
    setCartItems(currentCartItems);
    sessionStorage.setItem('cartQuantity', totalCartQuantity);
    setProductsQuantity(totalCartQuantity);
    successMsg();
  };

  useEffect(() => {
    if (sessionStorage.getItem('cartItems') !== null) {
      const jsonCartItems = sessionStorage.getItem('cartItems')
      const cartItems = JSON.parse(jsonCartItems);
      setCartItems(cartItems);
    };
    if (sessionStorage.getItem('cartQuantity') !== null) {
      setProductsQuantity(sessionStorage.getItem('cartQuantity'));
    };
  }, []);

  const handleRemoveProduct = (targetProduct, userSelectedAttributes) => {
    let updatedProductList;
    let repeatableProduct = CheckRepeatableProducts(
      cartItems,
      targetProduct,
      userSelectedAttributes
    );

    if (repeatableProduct.quantity > 1) {
      updatedProductList = updateCartQuantity(
        'removeProduct',
        repeatableProduct,
        userSelectedAttributes
      );
    } else {
      const products = [...cartItems];
      const indexOfProduct = products.indexOf(repeatableProduct);
      products.splice(indexOfProduct, 1);
      updatedProductList = products;
    }

    setCartItems(updatedProductList);
    const jsonUser = JSON.stringify(updatedProductList);
    sessionStorage.setItem('cartItems', jsonUser);

    if (updatedProductList.length <= 1) {
      setProductsQuantity(updatedProductList[0]?.quantity || 0);
    } else {
      const productListArray = updatedProductList.map(item => item.quantity);
      const sum = productListArray.reduce((a, b) => a + b, 0);
      sessionStorage.setItem('cartQuantity', sum);
      setProductsQuantity(sum);
    }

    if (updatedProductList.length === 0) {
      sessionStorage.setItem('cartQuantity', 0);
      setProductsQuantity(0);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setProductsQuantity(0)
    setClearedCart(true);
    sessionStorage.removeItem('cartItems');
    sessionStorage.removeItem('cartQuantity');
    ResetLocation();
  };

  const getTotalPrice = (cartItems) => {
    let total = cartItems.reduce((prevState, currentItem) => {
      const singleItemQuantity = currentItem.ItemPrice * currentItem.quantity;
      return prevState + singleItemQuantity;
    }, 0);
    setTotalPayment(total.toFixed(2));
    setTaxes(((total * 10) / 100).toFixed(2));
  };

  const successMsg = () => {
    const alertMessage = document.querySelector('.success-msg')
    alertMessage.classList.add('visible')
    setTimeout(() => {
      alertMessage.classList.remove('visible')
    }, 1000)
  };


  // Other
  /*******************************************************/
  const getProductsByCategory = (category) => {
    let separateCategoriesByname = []
    //Separate arrays by category names
    const separateCategories = allProductsData.reduce(function (
      singleCategory,
      singleItem,
    ) {
      separateCategoriesByname = Object.keys(singleCategory)

      if (!singleCategory[singleItem.Category])
        singleCategory[singleItem.Category] = singleItem
      else
        singleCategory[singleItem.Category] = Array.isArray(
          singleCategory[singleItem.Category],
        )
          ? singleCategory[singleItem.Category].concat(singleItem)
          : [singleCategory[singleItem.Category]].concat(singleItem)
      return singleCategory
    },
      {})

    const result = Object.keys(separateCategories).map(
      (e) => separateCategories[e],
    )

    let singleCategoryArray = []
    result.map((categories) => {
      return singleCategoryArray.push(categories)
    })
    //Change products by category
    separateCategoriesByname.forEach((cate) => {
      if (cate === category) {
        return setAllProducts(separateCategories[category])
      }
      if (category === 'Menu') {
        return setAllProducts(allProductsData)
      }
    })
  }

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    getProductsByCategory(activeCategory);
    getTotalPrice(cartItems);
  }, [activeCategory, cartItems]);

  const changeCategory = (newCategory) => {
    setActiveCategory(newCategory);
    getProductsByCategory(newCategory);
  };

  if (loading) {
    // 로딩 중이면 로딩 스피너 또는 다른 로딩 상태를 표시할 수 있음
    //  요게 있으면 not found 삼한연산자 없어도
    // validlogin 이 갱신되기 전까지 기다렸다가
    // 랜더링 할 뚜 있음
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      <Header
        loginModal={
          <LoginModal
            validLogin={validLogin}
            setValidLogin={setValidLogin}
            setLoginModalWindow={setLoginModalWindow}
            loginModalWindow={loginModalWindow}
            hideMenu={hideMenu}
            getUser={getUser}
            setCurrentUser={setCurrentUser}
          />
        }
        activateLoginModal={activateLoginModal}
        showModal={showModal}
        isModalActive={isModalActive}
        hideMenu={hideMenu}
        handleLogout={handleLogout}
        validLogin={validLogin}
        productsQuantity={productsQuantity}
        currentUser={currentUser}
      />
      <Routes>
        <Route path="/" element={<RootSection />} />

        <Route
          path="/cart"
          element={
            <Cart
              CartItem={
                <CartItem
                  clearCart={clearCart}
                  cartItems={cartItems}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  cartTotals={
                    <CartTotals
                      className="cart-carttotals"
                      totalPayment={totalPayment}
                      productsQuantity={productsQuantity}
                      taxes={taxes}
                      validLogin={validLogin}
                      showModal={showModal}
                      isModalActive={isModalActive}
                      activateLoginModal={activateLoginModal}
                    />
                  }
                />
              }

              cartItems={cartItems}
              clearedCart={clearedCart}
            />
          }
        />

        <Route
          exact path="/menu"
          element={
            <Menu
              findMenuItem={findMenuItem}
              allProducts={allProducts}
              allCategories={allCategories}
              changeCategory={changeCategory}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              activeCategory={activeCategory}
            />
          }
        />
        <Route
          path="/menu/:name"
          element={
            <SingleItem
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
            />
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route path="/blog/:name" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={validLogin ? <NotFound /> : <Register activateLoginModal={activateLoginModal} />} />
        <Route path="/profile" element={!validLogin ? <NotFound /> : <Profile currentUser={currentUser} getUser={getUser} handleLogout={handleLogout} updateUser={updateUser} />} />
        <Route path="/artist" element={!validLogin ? <NotFound /> : <Artist currentUser={currentUser} getUser={getUser} handleLogout={handleLogout} updateUser={updateUser} />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              checkoutSummary={
                <CheckoutSummary
                  cartItems={cartItems}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                />
              }
              totalPayment={totalPayment}
              cartItems={cartItems}
              productsQuantity={productsQuantity}
              taxes={taxes}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/payment"
          element={
            <Payment
              cartItems={cartItems}
              totalPayment={totalPayment}
              currentUser={currentUser}
            />
          }
        />
        <Route path="/careers" element={<Careers />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />


        <Route path="/:name/feed" element={<ArtistFeed currentUser={currentUser} artist_id = {1}/>} />
        {/*<Route path="/t" element={<NewComponent />} />*/}
        <Route
            path="/weverse"
            // element={ !validLogin ? <NotFound /> :
            element={
              <Weverse
                  currentUser={currentUser} validLogin={validLogin}
              />
            //     하나는 위버스로 바로 들어가고, 하나는 NotFound 에서 리다이렉트 됨 --> 리다이렉트라기보단 상태값을 체크해서 랜더링하는 리엑트
        //         매번 상태값을 체크하고 초기엔 false 였응께 NotFound 들갔다가 변경된 후 그 걸 감지해서 재 런더링한거임

        //       리액트 라우터에서 <Route> 컴포넌트의 element prop에 함수나 컴포넌트를 전달할 때, 이 함수나 컴포넌트는 매번 랜더링됩니다. 따라서 !validLogin ? <NotFound /> : <Weverse currentUser={currentUser} validLogin={validLogin} /> 표현식에서 !validLogin이 true일 때 <NotFound />가 렌더링되고, 그 후에 false로 업데이트되면서 <Weverse />가 렌더링되는 것이 일어날 수 있습니다.
        //
        // 여기서 중요한 점은, 라우터의 상태나 URL의 변화가 있을 때마다 해당 라우트에 대한 컴포넌트가 다시 렌더링된다는 것입니다. 만약 페이지를 새로고침하면 라우터는 초기 상태로 돌아가게 되며, 이로 인해 validLogin이 처음에는 false로 평가되어 <NotFound />가 렌더링되고 나중에 getUser 등의 비동기 작업을 통해 validLogin이 true로 변경되어도, 이미 렌더링된 <NotFound /> 컴포넌트는 변경되지 않습니다.
        //
        // 이를 방지하기 위해서는 컴포넌트가 마운트될 때 한 번만 실행되는 로직이나, 비동기 작업이 완료된 후에 라우트를 변경하는 등의 방법을 사용해야 합니다. 아래는 라우트를 변경하는 비동기 작업이 완료된 후에 라우트를 변경하는 예시입니다:
            }
        />
        {/*<Route path="/weverse" element={!validLogin ? <NotFound /> : <Weverse currentUser={currentUser} getUser={getUser} handleLogout={handleLogout} updateUser={updateUser} />} />*/}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
