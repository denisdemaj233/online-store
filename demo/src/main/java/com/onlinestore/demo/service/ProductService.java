package com.onlinestore.demo.service;

import aj.org.objectweb.asm.commons.Remapper;
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

    public void updateProductImage(Long id, String imagePath) {
        productRepository.findById(id).ifPresent(product -> {
            product.setImagePath(imagePath);
            productRepository.save(product);
        });
    }

    public Product saveProduct(Product product) {

        return productRepository.save(product);
    }


}
