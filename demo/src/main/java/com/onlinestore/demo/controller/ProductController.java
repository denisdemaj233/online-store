package com.onlinestore.demo.controller;


import com.onlinestore.demo.entity.Product;
import com.onlinestore.demo.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
    public class ProductController {

        private final ProductService productService;

        public ProductController(ProductService productService) {
            this.productService = productService;
        }

        @GetMapping
        public List<Product> getAllProducts() {
            return productService.getAllProducts();
        }

        @GetMapping("/{id}")
        public Product getProductById(@PathVariable Long id) {
            return productService.getProductById(id);
        }

        @PostMapping
        public Product saveProduct(@RequestBody Product product) {
            return productService.saveProduct(product);
        }

        @PutMapping("/{id}")
        public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
            return productService.updateProduct(id, product);
        }

        @DeleteMapping("/{id}")
        public void deleteProduct(@PathVariable Long id) {
            productService.deleteProduct(id);
        }
    }

