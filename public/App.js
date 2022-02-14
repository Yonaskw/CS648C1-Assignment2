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
            category: form.category.value,
            price: newPrice,
            productName: form.productName.value,
            image: document.getElementById("image").value
        };
        this.props.createProduct(product);
        form.category.value = "Shirts";
        form.price.value = "$";
        form.productName.value = "";
        form.image.value = "";
    }

    render() {
        return React.createElement("form", {
            name: "productAdd",
            onSubmit: this.onSubmit
        }, React.createElement("span", null, 
        React.createElement("label", 
        null, 
        "Category "),
         React.createElement("select", {
            name: "category"
        }, React.createElement("option", 
        null, "Shirts"), 
        React.createElement("option", 
        null, "Jeans"), 
        React.createElement("option", 
        null, "Jackets"), 
        React.createElement("option", 
        null, "Sweaters"),
        React.createElement("option", 
        null, "Accessories")), 
        React.createElement("label", 
        null, "Product Name "), React.createElement("input", {
            type: "text",
            name: "productName"
        })), React.createElement("span", null, React.createElement("label", null, "Price Per Unit"), React.createElement("input", {
            type: "text",
            name: "price"
        }), React.createElement("label", null, "Image URL "), React.createElement("input", {
            type: "url",
            name: "image",
            id: "image"
        })), React.createElement("button", null, "Add Product"));
    }

}
function ProductRow(props) {
    const prod = props.product;
    return React.createElement(
        "tr", 
        null, 
        React.createElement(
            "td", null, prod.productName), 
            React.createElement(
                "td",null, prod.price), 
                React.createElement(
                    "td",null, prod.category),
                    React.createElement(
                        "td",null,React.createElement("a", {
        href: prod.image, target: "_blank"},
        "View")));
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = {
            products: []
        };
        this.createProduct = this.createProduct.bind(this);
    }

    componentDidMount() {
        document.forms.productAdd.price.value = "$";
    }

    createProduct(product) {
        product.id = this.state.products.length + 1;
        const newProductList = this.state.products.slice();
        newProductList.push(product);
        this.setState({
            products: newProductList
        });
    }

    render() {
        return React.createElement(React.Fragment, null, 
            React.createElement("h1", 
            null, "My Company Inventory"), 
            React.createElement("div", 
            null, "Showing all available products"), 
            React.createElement("hr", null), 
            React.createElement(ProductTable, {
            products: this.state.products
        }), React.createElement("div", null, "Add a new product to inventory"), React.createElement("hr", null), React.createElement(ProductAdd, {
            createProduct: this.createProduct
        }));
    }

}


function ProductTable(props) {
    const productrows = props.products.map(product => React.createElement(ProductRow, {
        key: product.id,
        product: product
    }));
    return React.createElement("table", {
        className: "bordered-table"
    }, React.createElement("thead", null, React.createElement("tr", null, 
    React.createElement("th", 
             null, 
             "Product Name"),
             
             React.createElement("th", 
                                    null, 
                                    "Price"), 
            React.createElement("th", 
                                    null, 
                                    "Category"), 
            React.createElement("th",
                                     null, 
                                     "Image"))), 
        React.createElement("tbody", 
                                        null, 
                                        productrows));
}




const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('content'));