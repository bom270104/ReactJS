import React, { useEffect, useState } from 'react';
import NavbarAdmin from '~/components/Layout/DefaultLayout/navbar-admin';
import SidebarAdmin from '~/components/Layout/DefaultLayout/Sidebar-admin';
import './ProductManagement.scss';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        id: null,
        name: '',
        image: '',
        price: '',
        description: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost/myapi/api.php?action=getProducts');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost/myapi/api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: newProduct.id ? 'updateProduct' : 'addProduct',
                    product: newProduct,
                }),
            });

            if (response.ok) {
                const addedProduct = await response.json();
                if (newProduct.id) {
                    setProducts(
                        products.map((product) => (product.id === newProduct.id ? addedProduct.product : product)),
                    );
                } else {
                    setProducts([...products, addedProduct.product]);
                }
                // Reset lại các trường trong newProduct mà không làm mất dữ liệu
                setNewProduct({
                    id: null,
                    name: '',
                    image: '',
                    price: '',
                    description: '',
                });
            } else {
                console.error('Failed to add/update product');
            }
        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setNewProduct(product);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                const response = await fetch('http://localhost/myapi/api.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'deleteProduct',
                        id: id,
                    }),
                });

                if (response.ok) {
                    setProducts(products.filter((product) => product.id !== id));
                } else {
                    console.error('Failed to delete product');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="product-management">
            <NavbarAdmin />
            <div className="product-form">
                <SidebarAdmin />

                <div className="product-content">
                    <form onSubmit={handleAddProduct}>
                        <h2>Thêm Sản Phẩm Mới</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên sản phẩm"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
                        {newProduct.image && <img src={newProduct.image} alt="Preview" width="100" />}
                        <input
                            type="text"
                            name="price"
                            placeholder="Giá sản phẩm"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Mô tả sản phẩm"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                        />
                        <button className="btn-save" type="submit">
                            Lưu sản phẩm
                        </button>
                    </form>
                    <div className="product-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Hình Ảnh</th>
                                    <th>Giá</th>
                                    <th>Mô Tả</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>
                                            <img src={product.image} alt={product.name} width="50" />
                                        </td>
                                        <td>{product.price} VNĐ</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => handleEditProduct(product)}>
                                                Sửa
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductManagement;
