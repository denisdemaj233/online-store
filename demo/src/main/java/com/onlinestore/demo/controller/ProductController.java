package com.onlinestore.demo.controller;

import com.onlinestore.demo.entity.Product;
import com.onlinestore.demo.repository.ProductRepository;
import com.onlinestore.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/products")
public class ProductController {


    private final ProductService productService;
    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductService productService,ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {

            String uploadDir = "C:/Users/denis/OneDrive/Desktop/online-store/online-store-1/online-store-frontend/images/";


            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

  
            return ResponseEntity.ok(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Gabim gjatë ngarkimit!");
        }
    }




    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.saveProduct(product));
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product updatedProduct) {

        Product updated = productService.updateProduct(id, updatedProduct);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }


    @PatchMapping("/{id}/update-image")
    public ResponseEntity<String> updateProductImage(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String imagePath = request.get("imagePath"); // Merr emrin e skedarit të ri

        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produkti nuk u gjet!");
        }

        product.setImagePath(imagePath);
        productRepository.save(product); // Ruaj ndryshimin në databazë

        return ResponseEntity.ok("Imazhi u përditësua me sukses!");
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Produkti u fshi me sukses");
    }

}
