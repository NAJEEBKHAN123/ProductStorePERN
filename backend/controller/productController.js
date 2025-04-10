import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
       SELECT * FROM products
       ORDER BY created_at DESC
    `;

    console.log("fetched products", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error getProducts", error);
    res.status(500).json({success: false, message: "Internal server error"})
  }
};

export const createProducts = async (req, res) => {
    const {name, price, image} = req.body;
    try {
        if(!name || !price || !image){
            return res.status(400).json({success: false, message: "All fields are required"})
        }
        const newProduct =  await sql`
        INSERT INTO products (name,price,image)
        VALUES (${name},${price},${image})
        RETURNING *
        `
        console.log('new product added', newProduct)
        res.status(201).json({success: true, data: newProduct[0]})

    } catch (error) {
        console.log("Error create Products", error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
};

export const getProduct = async (req, res) => {
    const {id} = req.params;
    try {
       const product = await sql`
        SELECT * FROM products WHERE id=${id}
        `

        res.status(200).json({success: true, data: product[0]})
    } catch (error) {
        console.log("Error getProduct", error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, image, price} = req.body;
     
    try {
       const product = await sql`
        UPDATE products
        SET name=${name}, image=${image}, price=${price} 
        WHERE id=${id}
        RETURNING *
        `
        if(product.length === 0){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({success: true, data: product[0]})
    } catch (error) {
        console.log("Error update Products", error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const deleteProduct = await sql`
        DELETE FROM products WHERE id=${id}
        RETURNING *
        `

        if(deleteProduct.length === 0){
            return res.status(404).json({success: false, message: "Product not found"})
        }
        res.status(200).json({success: true, message: "Product delete successfully"})
    } catch (error) {
        console.log("Error delete Products", error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
};
