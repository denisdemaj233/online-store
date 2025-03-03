package com.onlinestore.demo.service;

import com.onlinestore.demo.entity.Product;
import com.onlinestore.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setPrice(productDetails.getPrice());
                    product.setDescription(productDetails.getDescription());
                    product.setImagePath(productDetails.getImagePath());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Produkti nuk u gjet!"));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product saveProduct(Product product) {

        return productRepository.save(product);
    }
}
