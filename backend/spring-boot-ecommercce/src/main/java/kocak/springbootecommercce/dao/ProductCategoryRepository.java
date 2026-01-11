package kocak.springbootecommercce.dao;

import kocak.springbootecommercce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(path = "productcategory", excerptProjection = ProductCategoryProjection.class)
@CrossOrigin("http://localhost:4200/")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
