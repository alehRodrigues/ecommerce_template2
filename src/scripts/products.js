export function getProducts() {
    let numberOfProductsInFront = 15;

    if (window.outerWidth < 601) {
        numberOfProductsInFront = 5;
    }

    return new Promise((resolve) => {
        resolve(
            getData.then((prods) => {
                const frontProducts = new Set();

                do {
                    let p = prods[Math.floor(Math.random() * 61)];
                    if (p) {
                        frontProducts.add(p);
                    }
                } while (frontProducts.size < numberOfProductsInFront);

                return [...frontProducts];
            })
        );
    });
}

export const getData = new Promise((resolve, reject) => {
    if (window.localStorage.getItem('data')) {
        resolve(JSON.parse(window.localStorage.getItem('data')));
    } else {
        resolve(
            fetch(
                'https://makeup-api.herokuapp.com/api/v1/products.json?product_type=nail_polish'
            )
                .then((Resp) => Resp.json())
                .then(products => window.localStorage.setItem('data', JSON.stringify(products)))
                .then(() => {
                    return JSON.parse(window.localStorage.getItem('data'));
                })
        );
    }
});

export const p = new Promise((resolve) => {
    resolve(
        fetch('https://makeup-api.herokuapp.com/api/v1/products/156.json')
            .then((R) => R.json())
            .then((product) => {
                const prod = new Product(product.id);

                prod.brand = product.brand;
                prod.name = product.name;
                prod.description = product.description;
                prod.imgLink = product.image_link;
                prod.price = product.price;
                prod.colors = [...product.product_colors];
                prod.tagList = [...product.tag_list];

                return prod;
            })
    );
});

class Product {
    constructor(productId) {
        this.id = productId;
    }
    brand = '';
    name = '';
    description = '';
    imgLink = '';
    price = 0.0;
    colors = [];
    tagList = [];
}
