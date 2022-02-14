function ProductRow(props) {
    const prod = props.prod;
    return(
      <tr>
        <td>{prod.pName}</td>
        <td>{prod.price}</td>
        <td>{prod.category}</td>
        <td><a href={prod.image} target="_blank">View</a></td>
      </tr>
    );
  }
  class ProductAdd extends React.Component {
    constructor() {
      super();
      this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
      e.preventDefault();
      const form = document.forms.productAdd;
      var price = form.price.value;
      var newPrice = price.substr(1, price.length);
      
      const product = {
        category:form.category.value, price: newPrice, 
        pName: form.pName.value, image:document.getElementById("image").value
      };
      this.props.createProduct(product);
      form.category.value="Shirts";
      form.price.value="$";
      form.pName.value="";
      form.image.value="";
    }
    render() {
      return(
        <form name= "productAdd" onSubmit={this.handleSubmit}>
          <span>
            <label>Category </label>
            <select name="category">
              <option>Shirts</option>
              <option>Jeans</option>
              <option>Jackets</option>
              <option>Sweaters</option>
              <option>Accessories</option>
            </select>
            <label>Product Name </label>
            <input type="text" name="pName"/> 
          </span>
          <span>
            <label>Price Per Unit</label>
            <input type="text" name="price"/>
            <label>Image URL </label>
            <input type="url" name="image" id="image"/>
          </span>
          <button>Add Product</button>
        </form>
      );
    }
  }
  
  function ProductTable(props) {
    const productrows = props.prod.map(
      prod => <ProductRow key={prod.id} prod={product}/>);
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {productrows}
        </tbody>
      </table>
    );
  }
  

  class ProductList extends React.Component {
    constructor() {
      super();
      this.state = {prods:[]};
      this.createProduct = this.createProduct.bind(this);
    }
    componentDidMount() {
      document.forms.productAdd.price.value = "$";
    }
    createProduct(product) {
      product.id=this.state.products.length + 1;
      const newProductList = this.state.products.slice();
      newProductList.push(product);
      this.setState({products:newProductList});
    }
    render() {
      return(
        <React.Fragment>
          <h1>My Company Inventory</h1>
          <div>Showing all available products</div>
          <hr/>
          <ProductTable products={this.state.products}/>
          <div>Add a new product to inventory</div>
          <hr/>
          <ProductAdd createProduct={this.createProduct}/>
        </React.Fragment>
      );
    }
  }
  const element = <ProductList/>
  ReactDOM.render(element, document.getElementById('content'));