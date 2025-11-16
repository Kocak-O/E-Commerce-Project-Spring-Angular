package kocak.springbootecommercce.dao;

import kocak.springbootecommercce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
