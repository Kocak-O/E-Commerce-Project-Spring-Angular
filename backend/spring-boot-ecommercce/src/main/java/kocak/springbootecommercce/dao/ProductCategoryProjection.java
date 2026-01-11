package kocak.springbootecommercce.dao;

import kocak.springbootecommercce.entity.ProductCategory;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "cat", types = ProductCategory.class)
public interface ProductCategoryProjection {
    Long getId();
    String getCategoryName();
}
